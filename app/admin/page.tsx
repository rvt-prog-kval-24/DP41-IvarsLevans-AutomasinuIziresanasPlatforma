"use client";
import React, { useEffect, useState } from 'react';
import UserRentals from "@/components/account/user-rentals";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { Button } from "../../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserEmail, setSelectedUserEmail] = useState<string | null>(session?.user?.email ?? null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }

    const fetchUserData = async () => {
      if (session?.user?.email) {
        try {
          const response = await fetch(`/api/admin/users`);
          if (!response.ok) {
            throw new Error('Failed to fetch users');
          }
          const data = await response.json();
          const currentUser = data.users.find((user: User) => user.email === session.user?.email);
          if (currentUser?.admin) {
            setIsAdmin(true);
            setUsers(data.users);
          } else {
            setIsAdmin(false);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setIsAdmin(false);
        }
      }
    };

    if (status === "authenticated") {
      fetchUserData();
    }
  }, [status, router, session]);

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
        toast.success('User deleted successfully!');
        // Refresh user list after deletion
        const updatedUsers = users.filter(user => user.email !== email);
        setUsers(updatedUsers);

        // Sign out if the deleted account is the current user's account
        if (isCurrentUser) {
          try {
            await signOut({ callbackUrl: '/login' });
          } catch (error) {
            console.error('Error signing out:', error);
          }
        } else {
          router.replace('/admin');
        }
      } else {
        toast.error('Error deleting user account!');
        console.error('Error deleting user account:', response.statusText);
      }
    }
  };

  const handleViewBookings = (email: string) => {
    setSelectedUserEmail(email);
  };

  const handleSetAdmin = async (email: string, isAdmin: boolean) => {
    if (session?.user?.email === email) {
      alert("You cannot change your own admin status.");
      return;
    }

    const confirmChange = confirm(`Are you sure you want to ${isAdmin ? 'grant' : 'revoke'} admin privileges to ${email}?`);
    if (!confirmChange) {
      return;
    }

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
            return { ...user, admin: isAdmin };
          }
          return user;
        });
        setUsers(updatedUsers);
        toast.success(`Admin status updated successfully for user with email: ${email}`);
        router.replace('/admin');
      } else {
        toast.error('Error setting admin status.');
        console.error('Error setting admin status:', response.statusText);
      }
    } catch (error) {
      toast.error('Error setting admin status.');
      console.error('Error setting admin status:', error);
    }
  };

  if (status === "loading") return <div>Loading...</div>;

  if (isAdmin === false) {
    return (
      <div className="container mx-auto px-6 py-12 lg:py-20 2xl:py-64 space-y-8 text-center">
        <h1 className="text-2xl font-bold text-white">Access Denied</h1>
        <p className="text-white">You do not have permission to view this page.</p>
      </div>
    );
  }

  if (isAdmin === null) {
    return <div>Loading...</div>;
  }

  const currentUser = users.find(user => user.email === session?.user?.email);
  const otherUsers = users.filter(user => user.email !== session?.user?.email).sort((a, b) => (b.admin ? 1 : -1));

  return (
    <div className="container mx-auto px-6 py-12 lg:py-20 2xl:py-24 space-y-8">
      <ToastContainer />
      <div className="space-y-4" id="users">
        <h1 className="text-xl font-bold text-white">All Users</h1>
        <div className="flex w-full flex-col border p-8 gap-2 rounded-lg">
          <ul>
            {currentUser && (
              <>
                <li className="text-white flex items-center">
                  <Avatar className="size-14 mr-4">
                    <AvatarImage src={currentUser.image!} />
                    <AvatarFallback className="text-black text-xl font-bold">
                      {currentUser.name?.split(" ")[0][0]}
                      {currentUser.name?.split(" ").slice(-1)[0][0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className={selectedUserEmail === currentUser.email ? "font-bold" : ""}>
                      {currentUser.name} ({currentUser.email}) - Joined: {new Date(currentUser.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleViewBookings(currentUser.email)}
                      className={selectedUserEmail === currentUser.email ? "bg-green-500" : ""}
                    >
                      View Bookings
                    </Button>
                    <Button onClick={() => handleDeleteUser(currentUser.email)}>Delete</Button>
                    <Button
                      onClick={() => handleSetAdmin(currentUser.email, !currentUser.admin)}
                      className={currentUser.admin ? "bg-green-500" : ""}
                    >
                      Admin
                    </Button>
                  </div>
                </li>
                <hr className="my-2 border-t border-white/50" />
              </>
            )}
            {otherUsers.map((user, index) => (
              <React.Fragment key={user.id}>
                <li className="text-white flex items-center">
                  <Avatar className="size-14 mr-4">
                    <AvatarImage src={user.image!} />
                    <AvatarFallback className="text-black text-xl font-bold">
                      {user.name?.split(" ")[0][0]}
                      {user.name?.split(" ").slice(-1)[0][0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className={selectedUserEmail === user.email ? "font-bold" : ""}>
                      {user.name} ({user.email}) - Joined: {new Date(user.createdAt).toLocaleDateString()}
                    </div>
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
                {index !== otherUsers.length - 1 && <hr className="my-2 border-t border-white/50" />}
              </React.Fragment>
            ))}
          </ul>
        </div>
      </div>
      <div className="space-y-4" id="history">
        <h1 className="text-xl font-bold text-white">Bookings</h1>
        <UserRentals email={selectedUserEmail ?? session?.user?.email!} />
      </div>
    </div>
  );
};

export default Admin;
