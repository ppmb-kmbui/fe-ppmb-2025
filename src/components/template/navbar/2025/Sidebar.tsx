"use client";

import Image from "next/image";
import {
  HiOutlineChatAlt2,
  HiOutlineHome,
  HiLogin,
  HiLogout,
  HiOutlinePencilAlt,
  HiOutlineShieldCheck,
  HiOutlineUser,
  HiSearch,
} from "react-icons/hi";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { RiMegaphoneLine } from "react-icons/ri";

export const Sidebar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { logout, isAuthenticated, user } = useAuth();

  const MAIN_MENU = [
    { icon: <HiOutlineHome />, text: "Beranda", route: "/", role: "optional" },
    {
      icon: <HiSearch />,
      text: "Cari teman",
      route: "/cari",
      role: "authenticated",
      test: true
    },
    {
      icon: <HiOutlineChatAlt2 />,
      text: "Networking",
      route: "/networking",
      role: "freshman",
      test: true
    },
    {
      icon: <HiOutlinePencilAlt />,
      text: "Tugas",
      route: "/tugas",
      role: "freshman",
      test: true
    },
    {
      icon: <RiMegaphoneLine />,
      text: "Pengumuman",
      route: "/pengumuman",
      role: "freshman",
      test: true
    },
    {
      icon: <HiOutlineUser />,
      text: "Profil",
      route: "/profil",
      role: "authenticated",
      test: true
    },
    {
      icon: <HiOutlineShieldCheck />,
      text: "Admin",
      route: "/admin",
      role: "admin",
      test: true
    },
  ];

  const renderMenu = (menu: (typeof MAIN_MENU)[number]) => {
    if (menu.test === true) return true;
    if (menu.role === "optional") return true;
    if (menu.role === "authenticated" && isAuthenticated) return true;
    if (menu.role === "freshman" && user?.batch === 2025) return true;
    if (menu.role === "admin" && user?.isAdmin) return true;
    return false;
  };

  return (
    <div
      className={`${pathname == "/signup" || pathname == "/login" ? "hidden" : "md:flex"} hover:w-[200px] overflow-hidden w-[65px] px-[10px] pt-4 gap-3 h-screen hidden bg-white flex-col duration-300 ease-in-out`}
    >
      {/* This gap-[8px] is to add a gap between the main button group and login/logout*/}
      <div className="flex flex-col gap-[8px] w-full h-full justify-start">
        {/* This gap is for gaps between the buttons in the main button group */}
        <div className="flex flex-col gap-[8px] w-fit">
          {MAIN_MENU.map(
            (menu, i) =>
              renderMenu(menu) && (
                <div
                  key={i}
                  className={`${pathname == menu.route ? "bg-ppmb-blue-100 text-ppmb-blue-500" : "hover:bg-ppmb-100 text-ppmb-800"} flex items-center justify-start px-3 py-2 rounded-lg cursor-pointer overflow-hidden`}
                  onClick={() => router.push(menu.route)}
                >
                  <p className="text-[26px]">{menu.icon}</p>
                  <div className="ml-2 bg-ppmb-blue-900 text-ppmb-100 px-3 py-1 rounded-sm text-[14px] whitespace-nowrap">
                    {menu.text}
                  </div>
                </div>
              ),
          )}
        </div>

        <div
          className="bg-ppmb-red-500 text-ppmb-000 mb-4 flex items-center px-3 py-2 rounded-lg cursor-pointer"
          onClick={isAuthenticated ? logout : () => router.push("/login")}
        >
          <p className="text-[26px]">
            {isAuthenticated ? <HiLogout className="text-red" /> : <HiLogin className="text-blue-300" />}
          </p>
          <div className="ml-2 bg-ppmb-blue-900 text-ppmb-100 px-3 py-1 rounded-sm text-[14px] whitespace-nowrap">
            {isAuthenticated ? "Keluar" : "Masuk"}
          </div>
        </div>
      </div>
    </div>
  );
};
