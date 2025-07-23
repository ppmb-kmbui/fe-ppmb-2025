"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MAIN_MENU, renderMenu } from "./navbar-commons";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";

export function TopBar() {
  const { isAuthenticated, user, logout } = useAuth();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const pathname = usePathname();
  return (
    <nav
      className="bg-neutral-medium pointer-events-auto flex h-fit w-full items-center justify-between p-2"
      aria-label="Top bar navigation"
    >
      {/* Image container to adjust image size */}
      <div id="image-container" className="relative size-12">
        <Image src="/logo.svg" alt="PPMB Logo" fill={true} />
      </div>

      <Image
        src="/stylized-name.svg"
        alt="PPMB Stylized Name"
        height={100}
        width={100}
        className="h-6 w-auto md:h-10"
      />

      {/* Spacer so stylized name stays in the center of the page */}
      <div className="hidden md:flex" />

      <div className="relative z-50 flex md:hidden">
        <button
          onClick={() => setIsExpanded((prev) => !prev)}
          className="h-auto w-full p-3"
        >
          <GiHamburgerMenu className="size-6 hover:cursor-pointer" />
        </button>
      </div>

      <ul
        className={`${isExpanded ? "top-16" : "-top-full"} bg-turquoise-100 absolute right-0 -z-10 h-fit w-full duration-300 md:hidden`}
      >
        {MAIN_MENU.map(
          (menu, idx) =>
            renderMenu(menu, isAuthenticated, user) && (
              <Link key={idx} href={menu.route}>
                <li
                  className={`${pathname === menu.route ? "bg-turquoise-200" : "hover:bg-turquoise-200 active:bg-turquoise-200"} m-2 flex items-center gap-x-3 rounded-lg p-2 duration-75 hover:cursor-pointer`}
                >
                  {menu.icon}
                  <p className="font-bold">{menu.text}</p>
                </li>
              </Link>
            ),
        )}

        {isAuthenticated ? (
          <li className="m-2 rounded-lg p-2 duration-75 hover:cursor-pointer hover:bg-orange-200 active:bg-orange-200">
            <button onClick={logout}>
              <p className="font-bold">Log out</p>
            </button>
          </li>
        ) : (
          <li className="m-2 rounded-lg p-2 duration-75 hover:cursor-pointer hover:bg-pink-200 active:bg-orange-200">
            <Link href="/login">
              <p className="font-bold">Log in</p>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
