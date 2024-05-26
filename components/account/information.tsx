import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { signOut, getSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface InformationProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    admin?: boolean | null;
  };
  updateUser: (user: Partial<InformationProps['user']>, password?: string) => void;
}

const Information = ({ user, updateUser }: InformationProps) => {
  const [name, setName] = useState<string | undefined>(user.name || "");
  const [email, setEmail] = useState<string | undefined>(user.email || "");
  const [password, setPassword] = useState<string | undefined>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setName(user.name || "");
    setEmail(user.email || "");
  }, [user]);

  const fetchUpdatedUser = async (email: string) => {
    try {
      const response = await fetch(`/api/user?email=${email}`);
      if (!response.ok) {
        throw new Error("Failed to fetch updated user data");
      }
      const data = await response.json();
      return data.user;
    } catch (error) {
      console.error("Error fetching updated user data:", error);
      return null;
    }
  };

  const handleSaveChanges = async () => {
    const updatedData: { name?: string; newEmail?: string; password?: string } = {};
    const originalEmail = user.email;

    if (name && name !== user.name) updatedData.name = name;
    if (email && email !== user.email) updatedData.newEmail = email;
    if (password) updatedData.password = password;

    if (Object.keys(updatedData).length > 0) {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/user", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: user.email, ...updatedData }),
        });

        if (!response.ok) {
          throw new Error("Failed to update account");
        }

        if (updatedData.newEmail && updatedData.newEmail !== originalEmail) {
          // If the email was changed, log out the user and redirect to login
          await signOut({ callbackUrl: '/login' });
          return;
        }

        const updatedUser = await fetchUpdatedUser(email || user.email as string);
        if (updatedUser) {
          setName(updatedUser.name);
          setEmail(updatedUser.email);
          setPassword("");
          updateUser(updatedUser, password); // Pass the new password if it was changed
          window.location.reload(); // Refresh the page
        }

        // Optionally show a success message or update the UI in another way
      } catch (error) {
        setError("Error updating account: " + error);
        console.error("Error updating account:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch("/api/user", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user.email }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete account");
      }

      // User deletion successful, sign out
      signOut();
    } catch (error) {
      console.error("Error deleting account:", error);
      // Display error message to the user
    }
  };

  return (
    <div className="flex w-full xl:w-1/1 flex-col border p-8 gap-2 rounded-lg">
      <div className="flex gap-4 items-center py-6">
        <Avatar className="size-16">
          <AvatarImage src={user.image!} />
          <AvatarFallback className="text-xl font-bold">
            {user.name?.split(" ")[0][0]}
            {user.name?.split(" ").slice(-1)[0][0]}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-2">
          <h1 className="text-white text-xl font-bold">{user.name}</h1>
          <h3 className="text-white text-sm sm:text-base font-medium text-foreground/50">
            {user.email}
          </h3>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-white font-medium" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          placeholder="your full name"
          value={name}
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
          value={email}
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
          value={password}
          type="password"
          className="w-96 p-4 rounded-xl border outline-none"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="flex gap-4 mt-4">
        <Button
          onClick={handleSaveChanges}
          variant="destructive"
          className="w-32"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </Button>
        <Button
          onClick={handleDeleteAccount}
          variant="destructive"
          className="w-32"
        >
          Delete Account
        </Button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default Information;