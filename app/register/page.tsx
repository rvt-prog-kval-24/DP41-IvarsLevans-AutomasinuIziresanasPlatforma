"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React, { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const router = useRouter();

  const passwordRequirements = "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.";

  const validatePassword = (password: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    if (!validatePassword(password)) {
      toast.error(passwordRequirements);
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
        toast.error(signInData.error);
      } else {
        toast.success("Registration successful!");
        router.push("/");
      }
    } else {
      const errorData = await response.json();
      toast.error(errorData.message || "Registration failed.");
    }
  }

  return (
    <main className="flex flex-col gap-6 items-center justify-center h-[85vh]"> 
      <ToastContainer />
      <div className="space-y-2 text-center flex flex-col gap-2" style={{ marginTop: "150px" }}>
        <h1 className="text-3xl font-bold text-white">Register</h1>
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
          <label className="text-white font-medium" htmlFor="password">
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
        <div className="flex flex-col gap-2">
          <label className="text-white font-medium" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            placeholder="confirm your password"
            required
            type="password"
            className="w-96 p-4 rounded-xl border outline-none"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <Button type="submit" className="mt-4"> {/* Added margin-top to increase gap */}
          Create Account
        </Button>
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
