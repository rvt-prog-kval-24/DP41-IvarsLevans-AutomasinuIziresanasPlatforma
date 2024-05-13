"use client"
import React, { useEffect, useState } from 'react';
import UserRentals from "@/components/account/user-rentals";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { Button } from "../../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  admin?: boolean;
  image?: string;
}

const Admin = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]); // Typing the state with the User interface
  const [selectedUserEmail, setSelectedUserEmail] = useState<string | null>(null); // State to store the selected user's email

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }

    const fetchData = async () => {
      const response = await fetch('/api/admin/users');
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
      }
    }
  };

  const handleViewBookings = (email: string) => {
    // Update the state with the selected user's email
    setSelectedUserEmail(email);
  };

  const handleSetAdmin = async (email: string, isAdmin: boolean) => {
    try {
      const response = await fetch('/api/admin/setAdmin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, isAdmin }),
      });
  
      if (response.ok) {
        const updatedUsers = users.map(user => {
          if (user.email === email) {
            return { ...user, admin: isAdmin }; // Update the admin status
          }
          return user;
        });
        setUsers(updatedUsers);
        console.log(`Admin status updated successfully for user with email: ${email}`);
      } else {
        console.error('Error setting admin status:', response.statusText);
        // Handle error case
      }
    } catch (error) {
      console.error('Error setting admin status:', error);
      // Handle error case
    }
  };
  
  if (status === "loading") return <div>Loading...</div>;

  const sortedUsers = [...users].sort((a, b) => (b.admin ? 1 : -1));

  return (
    <div className="container mx-auto px-6 py-12 lg:py-20 2xl:py-24 space-y-8">
      <div className="space-y-4" id="users">
        <h1 className="text-xl font-bold text-white">All Users</h1>
        <div className="flex w-full flex-col border p-8 gap-2 rounded-lg">
        <ul>
            {sortedUsers.map((user, index) => (
              <React.Fragment key={user.id}>
                <li className="text-white flex justify-between items-center">
                  {/* Render user information */}
                  <Avatar className="size-16">
                    <AvatarImage src={user.image!} />
                    <AvatarFallback className="text-black text-xl font-bold">
                      {user.name?.split(" ")[0][0]}
                      {user.name?.split(" ").slice(-1)[0][0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className={session?.user?.email === user.email ? "font-bold" : ""}>
                    {user.name} ({user.email}) - Joined: {new Date(user.createdAt).toLocaleDateString()}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleViewBookings(user.email)}
                      className={selectedUserEmail === user.email ? "bg-green-500" : ""}
                    >
                      View Bookings
                    </Button>
                    <Button onClick={() => handleDeleteUser(user.email)}>Delete</Button>
                    <Button
                      onClick={() => handleSetAdmin(user.email, !user.admin)}
                      className={user.admin ? "bg-green-500" : ""}
                    >
                      Admin
                    </Button>
                  </div>
                  </li>
                {index !== sortedUsers.length - 1 && <hr className="my-2 border-t border-white/50" />}
              </React.Fragment>
            ))}
          </ul>
        </div>
      </div>
      <div className="space-y-4" id="history">
        <h1 className="text-xl font-bold text-white">Bookings</h1>
        {/* Pass the selected user's email to the UserRentals component */}
        <UserRentals email={selectedUserEmail ?? session?.user?.email!} />
      </div>
    </div>
  );
};

export default Admin;