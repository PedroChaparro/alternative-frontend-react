"use client";

import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { NavigationOptions } from "../Options";

// import { AuthContext } from "@/context/AuthContext";

interface MobileMenuProps {
  NavigationOptions: typeof NavigationOptions.default;
}

export const MobileMenu = ({ NavigationOptions }: MobileMenuProps) => {
  // const { session } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen((prev) => !prev);

  return (
    <div className="flex items-center md:hidden">
      {/* Hamburger menu*/}
      <Button
        variant={"outline"}
        onClick={(e) => {
          e.stopPropagation();
          toggleOpen();
        }}
      >
        <Menu />
      </Button>
      {/* Background filter container */}
      <div
        className={`absolute left-0 top-0 z-10 h-screen w-full backdrop-blur-sm md:hidden ${
          open ? "block" : "hidden"
        }`}
        onClick={(e) => {
          e.stopPropagation();
          toggleOpen();
        }}
      >
        {/* Options container */}
        <div className="flex h-full w-3/4 max-w-xs flex-col justify-between gap-8 border-r bg-background p-4">
          {/* Top part */}
          <div className="flex w-full flex-col items-start gap-8">
            <Button
              variant={"outline"}
              onClick={(e) => {
                e.stopPropagation();
                toggleOpen();
              }}
            >
              <X />
            </Button>
            <ul className="flex w-full flex-col gap-4 ">
              {NavigationOptions.map((option) => (
                <li
                  className="w-full p-2 text-lg text-foreground/80"
                  key={option.name}
                >
                  <Link to={option.to} className="inline-block h-full w-full">
                    {option.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Bottom part */}
          {/*
          {session && (
            <Button
              variant={"destructive"}
              onClick={() => {
                signOut({
                  redirect: true,
                  callbackUrl: "/login"
                });
              }}
            >
              Logout
            </Button>
          )}
        */}
        </div>
      </div>
    </div>
  );
};
