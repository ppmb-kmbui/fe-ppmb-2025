"use client";

import {
  HiLogin,
  HiLogout,
} from "react-icons/hi";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { MAIN_MENU, renderMenu } from "./navbar-commons";

export const Sidebar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { logout, isAuthenticated, user } = useAuth();

  return (
    <nav
      className={`${pathname == "/signup" || pathname == "/login" ? "hidden" : "md:flex"} hover:w-[200px] overflow-hidden w-[65px] px-[10px] pt-4 gap-3 h-screen hidden bg-white flex-col duration-300 ease-in-out pointer-events-auto`}
      aria-label="Side bar navigation"
    >
      {/* This gap-[8px] is to add a gap between the main button group and login/logout*/}
      <div className="flex flex-col gap-[8px] w-full h-full justify-start">
        {/* This gap is for gaps between the buttons in the main button group */}
        <div className="flex flex-col gap-[8px] w-full">
          {MAIN_MENU.map(
            (menu, i) =>
              renderMenu(menu, isAuthenticated, user) && (
                <button
                  key={i}
                  className={`${pathname == menu.route ? "bg-yellow-100 text-yellow-600" : "hover:bg-yellow-200 text-neutral-dark"} flex items-center w-full justify-start px-3 py-2 rounded-lg cursor-pointer overflow-hidden`}
                  onClick={() => router.push(menu.route)}
                >
                  <p className="text-[26px]">{menu.icon}</p>
                  <div className="ml-2 font-bold text-ppmb-100 px-3 py-1 rounded-sm text-[14px] whitespace-nowrap">
                    {menu.text}
                  </div>
                </button>
              ),
          )}
        </div>

        <button
          className="text-green-700 hover:bg-green-100 active:bg-green-100 mb-4 flex items-center px-3 py-2 rounded-lg cursor-pointer"
          onClick={isAuthenticated ? logout : () => router.push("/login")}
        >
          <p className="text-[26px]">
            {isAuthenticated ? <HiLogout /> : <HiLogin />}
          </p>
          <div className="ml-2 font-bold px-3 py-1 rounded-sm text-[14px] whitespace-nowrap">
            {isAuthenticated ? "Keluar" : "Masuk"}
          </div>
        </button>
      </div>
    </nav>
  );
};
