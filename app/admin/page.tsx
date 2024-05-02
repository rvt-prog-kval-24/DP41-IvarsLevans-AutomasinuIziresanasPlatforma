"use client";
import React, { useEffect, useState } from 'react';
import Information from "@/components/account/information";
import UserRentals from "@/components/account/user-rentals";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

const Admin = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]); // Typing the state with the User interface

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }

    const fetchData = async () => {
      const response = await fetch('/api/admin');
      const data = await response.json();
      if (response.ok) {
        setUsers(data.users);
      } else {
        console.error('Failed to fetch users:', data.message);
      }
    };

    if (status === "authenticated") {
      fetchData();
    }
  }, [status, router]);

  if (status === "loading") return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-6 py-12 lg:py-20 2xl:py-24 space-y-8">
      <div className="space-y-4" id="settings">
        <h1 className="text-xl font-bold text-white">Profile Information</h1>
        <Information user={session?.user!} />
      </div>
      <div className="space-y-4" id="history">
        <h1 className="text-xl font-bold text-white">Bookings</h1>
        <UserRentals email={session?.user?.email!} />
      </div>
      <div className="space-y-4" id="users">
        <h1 className="text-xl font-bold text-white">All Users</h1>
        <ul>
          {users.map(user => (
            <li key={user.id} className="text-white">
              {user.name} ({user.email}) - Joined: {new Date(user.createdAt).toLocaleDateString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Admin;
