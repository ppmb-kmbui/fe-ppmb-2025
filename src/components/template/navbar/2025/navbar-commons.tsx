import { UserProps } from "@/utils/interface";
import {
  HiOutlineChatAlt2,
  HiOutlineHome,
  HiOutlinePencilAlt,
  HiOutlineShieldCheck,
  HiOutlineUser,
  HiSearch,
} from "react-icons/hi";
import { RiMegaphoneLine } from "react-icons/ri";

export const MAIN_MENU = [
  { icon: <HiOutlineHome />, text: "Beranda", route: "/", role: "optional" },
  {
    icon: <HiSearch />,
    text: "Cari teman",
    route: "/cari",
    role: "authenticated",
  },
  {
    icon: <HiOutlineChatAlt2 />,
    text: "Networking",
    route: "/networking",
    role: "freshman",
  },
  {
    icon: <HiOutlinePencilAlt />,
    text: "Tugas",
    route: "/tugas",
    role: "freshman",
  },
  {
    icon: <RiMegaphoneLine />,
    text: "Pengumuman",
    route: "/pengumuman",
    role: "freshman",
  },
  {
    icon: <HiOutlineUser />,
    text: "Profil",
    route: "/profil",
    role: "authenticated",
  },
  {
    icon: <HiOutlineShieldCheck />,
    text: "Admin",
    route: "/admin",
    role: "admin",
  },
];


export const renderMenu = (menu: (typeof MAIN_MENU)[number], isAuthenticated: boolean, user: UserProps) => {
  if (menu.role === "optional") return true;
  if (menu.role === "authenticated" && isAuthenticated) return true;
  if (menu.role === "freshman" && user?.batch === 2025) return true;
  if (menu.role === "admin" && user?.isAdmin) return true;
  return false;
};
