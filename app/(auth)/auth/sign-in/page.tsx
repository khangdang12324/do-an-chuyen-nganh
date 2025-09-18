import SignInFormClient from "@/features/auth/components/signin-form-client";
import Image from "next/image";
import React from "react";

const SignInPage = () => {
    return (
        <div className="space-y-6 flex flex-col justify-center items-center">
            <Image src={"/Logo_CodeSparkX_Khang.png"} alt="Logo Image"
             width={250} height={250}
             className="rounded-3xl"
             />
            <SignInFormClient />
        </div>
    );
};

export default SignInPage;