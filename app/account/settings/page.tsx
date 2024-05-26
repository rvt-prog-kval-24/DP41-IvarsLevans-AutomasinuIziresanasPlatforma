"use client";
import Information from "@/components/account/information";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

interface User {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  admin?: boolean | null;
}

const Account = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async (email: string) => {
      try {
        const response = await fetch(`/api/user?email=${email}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        return data.user;
      } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
      }
    };

    const initializeUser = async () => {
      if (session?.user?.email) {
        const updatedUser = await fetchUser(session.user.email);
        setUser(updatedUser);
      }
    };

    if (status === "loading") return;
    if (status === "unauthenticated") {
      router.replace("/login");
    } else if (session?.user) {
      initializeUser();
    }
  }, [session, status, router]);

  const handleUserUpdate = async (updatedUser: Partial<User>, newPassword?: string) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...updatedUser,
    }));

    // Refresh the session to reflect the latest user data
    await getSession();
  };

  if (status === "loading" || !user) return <div>Loading...</div>;

  return (
    <>
      <div className="container mx-auto px-6 py-12 lg:py-20 2xl:py-24 space-y-8">
        <div className="space-y-4" id="settings">
          <h1 className="text-xl font-bold text-white">Profile Information</h1>
          <Information user={user} updateUser={handleUserUpdate} />
        </div>
      </div>
    </>
  );
};

export default Account;