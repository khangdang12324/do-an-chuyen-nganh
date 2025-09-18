import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import authConfig from "./auth.config";
import { db } from "./lib/db";
import { getUserById } from "@/features/auth/actions";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },

  callbacks: {
    /**
     * Handle user creation and account linking after a successful sign-in
     */
    async signIn({ user, account }) {
      if (!user || !account) return false;

      // ⚠️ Trước đây bạn dùng user.email! (có thể undefined) → crash
      // ✅ Bắt buộc có email vì schema yêu cầu email @unique
      if (!user.email) return false;

      const existingUser = await db.user.findUnique({
        where: { email: user.email },
      });

      // ⚠️ TS2322: schema User.name là string bắt buộc,
      //    còn user.name có thể null/undefined
      // ✅ Dùng fallback an toàn
      const safeName = user.name ?? user.email.split("@")[0];

      if (!existingUser) {
        await db.user.create({
          data: {
            email: user.email,
            name: safeName,                       // ✅ luôn là string
            image: user.image ?? undefined,

            // ⚠️ Bạn đang dùng "accounts" (sai tên relation)
            // ✅ Schema của bạn là "account Account[]" (số ít)
            account: {
              create: {
                type: account.type,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                refreshToken: account.refresh_token ?? null,
                accessToken: account.access_token ?? null,
                expiresAt: account.expires_at ?? null,
                tokenType: account.token_type ?? null,
                scope: account.scope ?? null,
                idToken: account.id_token ?? null,
                // Một số type của Auth.js không khai báo session_state
                sessionState: (account as any).session_state ?? null,
              },
            },
          },
        });
      } else {
        const existingAccount = await db.account.findUnique({
          where: {
            provider_providerAccountId: {
              provider: account.provider,
              providerAccountId: account.providerAccountId,
            },
          },
        });

        if (!existingAccount) {
          await db.account.create({
            data: {
              userId: existingUser.id,
              type: account.type,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              refreshToken: account.refresh_token ?? null,
              accessToken: account.access_token ?? null,
              expiresAt: account.expires_at ?? null,
              tokenType: account.token_type ?? null,
              scope: account.scope ?? null,
              idToken: account.id_token ?? null,
              sessionState: (account as any).session_state ?? null,
            },
          });
        }
      }

      return true;
    },

    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (existingUser) {
        // ✅ đồng bộ lại từ DB (an toàn kiểu dữ liệu)
        token.name = existingUser.name ?? token.name;
        token.email = existingUser.email ?? token.email;
        (token as any).role = existingUser.role;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user && token.sub) {
        // Nếu chưa khai báo type augmentation, cast any để khỏi lỗi TS
        (session.user as any).id = token.sub;
        (session.user as any).role = (token as any).role;
      }
      return session;
    },
  },

  secret: process.env.AUTH_SECRET,
  ...authConfig,
});
