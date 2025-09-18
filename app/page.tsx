"use client";

import { Button } from "@/components/ui/button";
import UserButton from "@/features/auth/components/user-button";
import { User } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
<div>
  <h1 className="text-4xl-font-bold text-rose-500">Welcome</h1>
    <UserButton />
</div>
  );
}
