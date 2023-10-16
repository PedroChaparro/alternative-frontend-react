"use client";

import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

import { DesktopMenu } from "./Desktop/DesktopMenu";
import { MobileMenu } from "./Mobile/MobileMenu";
import { NavigationOptions } from "./Options";

export const Navbar = () => {
  const { session } = useContext(AuthContext);
  let navigationOptions = NavigationOptions["default"];
  if (session) {
    navigationOptions = NavigationOptions["user"];
  }

  return (
    <nav className="relative border-b">
      {/* Container */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4">
        {/* Left part */}
        <div className="flex gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-4">
            <img
              className="my-2 rounded-lg"
              src="/images/capyfile_52_x_52.webp"
              alt="CapyFile logo"
              width={52}
              height={52}
            />
            <span className="font-bold">Capyfile</span>
          </Link>
          {/* Menu options */}
          <MobileMenu NavigationOptions={navigationOptions} />
          <DesktopMenu NavigationOptions={navigationOptions} />
        </div>
      </div>
    </nav>
  );
};
