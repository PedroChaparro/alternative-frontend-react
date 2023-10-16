"use client";

import { Link } from "react-router-dom";

import { NavigationOptions } from "../Options";

// import { useContext } from "react";
// import { AuthContext } from "@/context/AuthContext";

interface DesktopMenuProps {
  NavigationOptions: typeof NavigationOptions.default;
}

export const DesktopMenu = ({ NavigationOptions }: DesktopMenuProps) => {
  // const { session } = useContext(AuthContext);

  return (
    <div className="hidden gap-4 md:flex">
      <ul className="flex items-center gap-4">
        {NavigationOptions.map((option) => (
          <li
            className="flex h-full items-center border-b-2 border-b-transparent font-medium text-foreground/60 transition-colors hover:border-b-primary hover:text-foreground/100"
            key={option.name}
          >
            <Link to={option.to}>{option.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
