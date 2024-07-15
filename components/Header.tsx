// components/Header.tsx
"use client"
import { Button } from "./ui/button";
import { ModeToggle } from "./ui/Themetogglebutton";
import { signIn, signOut, useSession } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();

  return (
    <div className="flex justify-between px-4 py-2 bg-gray-200 dark:bg-gray-800">
      <p className="text-lg font-bold">Bloggerz</p>
      <div className="flex items-center gap-4">
        {session ? (
          <Button
            onClick={() => signOut()}
          >
            Sign out
          </Button>
        ) : (
          <Button
            onClick={() => signIn()}
          >
            Sign In
          </Button>
        )}
        <ModeToggle />
      </div>
    </div>
  );
};

export default Header;
