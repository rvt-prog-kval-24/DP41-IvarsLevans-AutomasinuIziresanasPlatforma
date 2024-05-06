"use client"
import React, { useEffect, useState } from 'react';
import Information from "@/components/account/information";
import UserRentals from "@/components/account/user-rentals";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { Button } from "../../components/ui/button";

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

  const handleDeleteUser = async (email: string) => {
    const confirmDelete = confirm(`Are you sure you want to delete the account of ${email}?`);
    if (confirmDelete) {
      const isCurrentUser = session?.user?.email === email;
  
      const response = await fetch('/api/account', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
  
      if (response.ok) {
        // Refresh user list after deletion
        const updatedUsers = users.filter(user => user.email !== email);
        setUsers(updatedUsers);
  
        // Sign out if the deleted account is the current user's account
        if (isCurrentUser) {
          try {
            await signOut({ callbackUrl: '/login' }); // Sign out the current user with redirect to '/login'
          } catch (error) {
            console.error('Error signing out:', error);
          }
        }
      } else {
        console.error('Error deleting user account:', response.statusText);
        // Handle error case
        // You can implement this part based on your UI requirements
      }
    }
  };

  const handleViewBookings = async (email: string) => {
    // Handle viewing bookings for the user with the given email
    // You can implement this based on your application's logic
    console.log(`View bookings for user with email: ${email}`);
  };

  const handleSetAdmin = async (email: string) => {
    // Handle viewing bookings for the user with the given email
    // You can implement this based on your application's logic
    console.log(`Set admin for user with email: ${email}`);
  };

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
        <div className="flex w-full flex-col border p-8 gap-2 rounded-lg">
          <ul>
            {users.map((user, index) => (
              <React.Fragment key={user.id}>
                <li className="text-white flex justify-between items-center">
                  <div>{user.name} ({user.email}) - Joined: {new Date(user.createdAt).toLocaleDateString()}</div>
                  <div className="flex gap-2">
                    <Button onClick={() => handleViewBookings(user.email)}>View Bookings</Button>
                    <Button onClick={() => handleSetAdmin(user.email)}>Admin</Button>
                    <Button onClick={() => handleDeleteUser(user.email)}>Delete</Button>
                  </div>
                </li>
                {index !== users.length - 1 && <hr className="my-2 border-t border-white/50" />} {/* Add a separator line if not the last user */}
              </React.Fragment>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Admin;