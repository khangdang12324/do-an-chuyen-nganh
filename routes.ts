/**
 * Mảng các route (đường dẫn) được truy cập công khai
 * Những route này KHÔNG yêu cầu đăng nhập
 * @type {string[]}
 */
export const publicRoutes: string[] = [
   // Ví dụ: "/about", "/contact"
]

/**
 * Mảng các route cần bảo vệ
 * Những route này BẮT BUỘC phải đăng nhập mới truy cập được
 * @type {string[]}
 */
export const protectedRoutes: string[] = [
    "/",   // Trang chủ
]

/**
 * Mảng các route dành riêng cho xác thực (auth)
 * Những route này KHÔNG yêu cầu đăng nhập
 * @type {string[]}
 */
export const authRoutes: string[] = [
    "/auth/sign-in",   // Đường dẫn đăng nhập
]

/**
 * Prefix (tiền tố) cho các route API dùng xác thực
 * Những route bắt đầu bằng "/api/auth" KHÔNG yêu cầu đăng nhập
 * @type {string}
 */
export const apiAuthPrefix: string = "/api/auth"

/**
 * Đường dẫn mặc định để chuyển hướng (redirect) sau khi đăng nhập thành công
 */
export const DEFAULT_LOGIN_REDIRECT = "/"; // Chuyển về trang chủ
