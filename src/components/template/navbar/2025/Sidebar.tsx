"use client";

import { HiLogin, HiLogout } from "react-icons/hi";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { MAIN_MENU, renderMenu } from "./navbar-commons";

export const Sidebar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { logout, isAuthenticated, user } = useAuth();

  return (
    <nav
      className="pointer-events-auto hidden h-screen w-[65px] flex-col gap-3 overflow-hidden bg-white px-[10px] pt-4 duration-300 ease-in-out hover:w-[200px] md:flex"
      aria-label="Side bar navigation"
    >
      {/* This gap-[8px] is to add a gap between the main button group and login/logout*/}
      <div className="flex h-full w-full flex-col justify-start gap-[8px]">
        {/* This gap is for gaps between the buttons in the main button group */}
        <div className="flex w-fit flex-col gap-[8px]">
          {MAIN_MENU.map(
            (menu, i) =>
              renderMenu(menu, isAuthenticated, user) && (
                <button
                  key={i}
                  className={`${pathname == menu.route ? "bg-yellow-100 text-yellow-600" : "text-neutral-dark hover:bg-yellow-200"} flex cursor-pointer items-center justify-start overflow-hidden rounded-lg px-3 py-2`}
                  onClick={() => router.push(menu.route)}
                >
                  <p className="text-[26px]">{menu.icon}</p>
                  <div className="text-ppmb-100 ml-2 rounded-sm px-3 py-1 text-[14px] font-bold whitespace-nowrap">
                    {menu.text}
                  </div>
                </button>
              ),
          )}
        </div>

        <button
          className="mb-4 flex cursor-pointer items-center rounded-lg px-3 py-2 text-green-700 hover:bg-green-100 active:bg-green-100"
          onClick={isAuthenticated ? logout : () => router.push("/login")}
        >
          <p className="text-[26px]">
            {isAuthenticated ? <HiLogout /> : <HiLogin />}
          </p>
          <div className="ml-2 rounded-sm px-3 py-1 text-[14px] font-bold whitespace-nowrap">
            {isAuthenticated ? "Keluar" : "Masuk"}
          </div>
        </button>
      </div>
    </nav>
  );
};
