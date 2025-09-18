"use client";  // 👈 quan trọng: đây là client component

import React from "react";
import { Button } from "@/components/ui/button";
import { Chrome, Github } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signIn } from "next-auth/react"; // 👈 import đúng

const SignInFormClient = () => {
  return (
    <Card className="w-[500px] bg-zinc-900 rounded-xl">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center text-white">
          Đăng Nhập
        </CardTitle>
        <CardDescription className="text-center">
          Chọn phương thức đăng nhập
        </CardDescription>
      </CardHeader>

      <CardContent className="grid gap-4">
        {/* Google Sign In */}
        <Button
          type="button"
          variant="outline"
          className="w-full hover:bg-gray-400"
          onClick={() => signIn("google", { callbackUrl: "/" })} // ✅ gọi hàm trực tiếp
        >
          <Chrome className="mr-2 h-4 w-4" />
          <span>Đăng nhập với Google</span>
        </Button>

        {/* GitHub Sign In */}
        <Button
          type="button"
          variant="outline"
          className="w-full hover:bg-gray-400"
          onClick={() => signIn("github", { callbackUrl: "/" })} // ✅ gọi hàm trực tiếp
        >
          <Github className="mr-2 h-4 w-4" />
          <span>Đăng nhập với GitHub</span>
        </Button>
      </CardContent>

      <CardFooter>
        <p className="text-sm text-center text-gray-500 dark:text-gray-400 w-full">
          Việc đăng nhập của bạn đồng nghĩa với việc bạn đồng ý với{" "}
          <a href="#" className="underline hover:text-white">
            Điều khoản dịch vụ
          </a>{" "}
          và{" "}
          <a href="#" className="underline hover:text-white">
            Chính sách bảo mật
          </a>
          .
        </p>
      </CardFooter>
    </Card>
  );
};

export default SignInFormClient;
