"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { SyntheticEvent, useState } from "react";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    const signInData = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (signInData?.error) {
      console.log(signInData.error);
    } else {
      const searchParams = new URLSearchParams(window.location.search);
      const referer = searchParams.get("referer");

      if (referer) return router.push(`/${referer}`);

      return router.push("/");
    }
  }
  // TODO: change the form and inputs to Form and Inputs components from shadcn/ui

  return (
    <main className="flex flex-col gap-12 items-center justify-center h-auto">
      <div className="space-y-2 text-center flex flex-col gap-4" style={{ marginTop: "150px" }}>
        <h1 className="text-3xl font-bold text-white">Login</h1>
        <p className="text-white">Enter your credentials to access your account.</p>
      </div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label className="text-white font-medium" htmlFor="email ">
            Email
          </label>
          <input
            id="email"
            placeholder="mail@example.com"
            required
            type="email"
            className="w-96 p-4 rounded-xl border outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-white font-medium" htmlFor="password">
              Password
            </label>
          </div>
          <input
            id="password"
            placeholder="your password"
            required
            type="password"
            className="w-96 p-4 rounded-xl border outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
          <Link className="text-sm text-primary hover:underline" href="#">
              Forgot password?
          </Link>
        <Button type="submit">Sign in</Button>
      </form>
      <div className="text-center text-sm text-gray-500 flex gap-2">
        Don't have an account?
        <Link
          className="font-medium text-primary hover:underline"
          href="/register"
        >
          Register
        </Link>
      </div>
    </main>
  );
};

export default Login;
