import React from "react";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface InformationProps {
  user: {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
    admin?: boolean | null | undefined;
  };
}

const Information = ({ user }: InformationProps) => {
  const handleDeleteAccount = async () => {
    const response = await fetch("/api/account", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: user.email }),
    });

    if (response.ok) {
      // User deletion successful, sign out
      signOut();
    } else {
      // Handle error case
      const data = await response.json();
      console.error("Error deleting account:", data.message);
      // Display error message to the user
    }
  };

  return (
    <div className="flex w-full xl:w-1/2 flex-col border p-8 gap-2 rounded-lg">
      <div className="flex gap-4 items-center">
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
      <Button
        onClick={handleDeleteAccount}
        variant="destructive"
        className="mt-4 w-32"
      >
        Delete Account
      </Button>
    </div>
  );
};

export default Information;