import React from "react";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface InformationProps {
  user: {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  };
}

const Information = ({ user }: InformationProps) => {
  const handleDeleteAccount = async () => {
    try {
      const response = await fetch("/api/user", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user.email }),
      });
      if (response.ok) {
        // Sign out the user after successful account deletion
        await signOut({ redirect: false });
        window.location.replace("/"); // Redirect to homepage or login page
      } else {
        console.error("Failed to delete account");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  return (
    <div className="flex w-full xl:w-1/2 flex-col border p-8 gap-2 rounded-lg">
      <div className="flex gap-4 items-center">
        <Avatar className="size-16">
          {user.image ? (
            <AvatarImage src={user.image} />
          ) : (
            <AvatarFallback className="text-xl font-bold">
              {user.name ? user.name.split(" ").map(name => name[0]).join('') : ''}
            </AvatarFallback>
          )}
        </Avatar>
        <div className="space-y-2">
          <h1 className="text-xl text-white font-bold">{user.name}</h1>
          <h3 className="text-sm text-white sm:text-base font-medium text-foreground/50">
            {user.email}
          </h3>
        </div>
      </div>
      <Button
        onClick={handleDeleteAccount}
        variant="destructive"
        className="mt-4 sm:max-w-auto"
      >
        Delete Account
      </Button>
    </div>
  );
};

export default Information;