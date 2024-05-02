"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React, { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const Register = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application-json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    if (response.ok) {
      const signInData = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (signInData?.error) {
        console.log(signInData.error);
      } else {
        router.push("/");
      }
    }
  }

  // TODO: change the form and inputs to Form and Inputs components from shadcn/ui

  return (
    <main className="flex flex-col gap-12 items-center justify-center h-[80vh]">
      <div className="space-y-2 text-center flex flex-col gap-4" style={{ marginTop: "150px" }}>
        <h1 className="text-3xl font-bold text-white">Register</h1>
        <p className="text-white">Enter credentials to create your account.</p>
      </div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label className="text-white font-medium" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            placeholder="your full name"
            required
            type="text"
            className="w-96 p-4 rounded-xl border outline-none"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-white font-medium" htmlFor="email">
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
        <div className="flex flex-col gap-2">
          <label className="text-white font-medium" htmlFor="Password">
            Password
          </label>
          <input
            id="password"
            placeholder="your password"
            required
            type="password"
            className="w-96 p-4 rounded-xl border outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="submit">Create Account</Button>
      </form>
      <div className="text-center text-sm text-gray-500 flex gap-2">
        Already have an account?
        <Link
          className="font-medium text-primary hover:underline"
          href="/login"
        >
          Login
        </Link>
      </div>
    </main>
  );
};

export default Register;
