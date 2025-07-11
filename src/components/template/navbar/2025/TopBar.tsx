"use client"

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  GiHamburgerMenu
} from "react-icons/gi"
import { MAIN_MENU } from "./navbar-commons";
import { useAuth } from "@/context/AuthContext";

export function TopBar() {
  const { isAuthenticated, logout, login } = useAuth();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  return (
    <nav className="pointer-events-auto w-screen h-fit flex items-center p-2 justify-between bg-yellow-200">
      {/* Image container to adjust image size */}
      <div id="image-container" className="relative size-12">
        <Image src="/logo.svg" alt="PPMB Logo" fill={true} />
      </div>

      <div className="md:hidden flex relative z-50">
        <button onClick={() => setIsExpanded((prev) => !prev)} className="p-3 w-full h-auto">
          <GiHamburgerMenu className="size-6 hover:cursor-pointer" />
        </button>
      </div>

      <ul className={`${isExpanded ? "top-16" : "-top-full"} md:hidden duration-500 absolute -z-10 h-fit w-full right-0 bg-turquoise-100`}>
        {MAIN_MENU.map((menu, idx) =>
          <Link key={idx} href={menu.route}>
            <li className="p-2 flex gap-x-3 duration-75 items-center hover:bg-turquoise-200 hover:cursor-pointer m-2 rounded-lg">
              {menu.icon}
              <p className="font-bold">
                {menu.text}
              </p>
            </li>
          </Link>
        )}

        {isAuthenticated ?
          <li className="p-2 duration-75 hover:bg-orange-200 hover:cursor-pointer m-2 rounded-lg">
            <button onClick={logout}>
              <p className="font-bold">
                Log out
              </p>
            </button>
          </li>
          :
          <li className="p-2 duration-75 hover:bg-pink-200 hover:cursor-pointer m-2 rounded-lg">
            <Link href="/login">
              <p className="font-bold">
                Log in
              </p>
            </Link>
          </li>
        }
      </ul>
    </nav>
  );
}
