"use client"
import { Button } from "./ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { ModeToggle } from "./ui/Themetogglebutton";
import { signIn, signOut, useSession } from "next-auth/react";
import { FaRegUserCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { GoSignOut } from "react-icons/go";
import WriteaBlogs from "./WriteaBlogs";

const Header = () => {
  const { data: session } = useSession();
  const currentuser=session?.user
  const router=useRouter()
  return (
    <div className="flex justify-between px-4 py-2 bg-gray-200 dark:bg-gray-800">
      <p className="text-lg font-bold">Bloggerz</p>
      <div className="flex items-center gap-4">
        {session ? (
          <>
            <WriteaBlogs/>
            <GoSignOut onClick={() => signOut()}/>
            <HoverCard>
              <HoverCardTrigger><FaRegUserCircle /></HoverCardTrigger>
              <HoverCardContent>
              <p>{currentuser?.name}</p>
                <p>{currentuser?.email}</p>
                <p className=" cursor-pointer text-center" onClick={() => router.push(`/user/${currentuser?.name}`)}>More Details....</p>
              </HoverCardContent>
            </HoverCard>

          </>
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
