"use client";
import Information from "@/components/account/information";
import UserRentals from "@/components/account/user-rentals";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const Account = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") return router.replace("/login");

  if (status === "loading") return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-6 py-12 lg:py-20 2xl:py-24 space-y-8">
      <div className="space-y-4" id="history">
        <h1 className="text-xl font-bold text-white">Bookings</h1>
        <UserRentals email={session?.user?.email!} />
      </div>
    </div>
  );
};

export default Account;
