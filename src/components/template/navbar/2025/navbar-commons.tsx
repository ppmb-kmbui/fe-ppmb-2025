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
    //    role: "authenticated",
    role: "optional",
  },
  {
    icon: <HiOutlineChatAlt2 />,
    text: "Networking",
    route: "/networking",
    //    role: "freshman",
    role: "optional",
  },
  {
    icon: <HiOutlinePencilAlt />,
    text: "Tugas",
    route: "/tugas",
    //    role: "freshman",
    role: "optional",
  },
  {
    icon: <RiMegaphoneLine />,
    text: "Pengumuman",
    route: "/pengumuman",
    //    role: "freshman",
    role: "optional",
  },
  {
    icon: <HiOutlineUser />,
    text: "Profil",
    route: "/profil",
    //    role: "authenticated",
    role: "optional",
  },
  {
    icon: <HiOutlineShieldCheck />,
    text: "Admin",
    route: "/admin",
    //    role: "admin",
    role: "optional",
  },
];

export const renderMenu = (
  menu: (typeof MAIN_MENU)[number],
  isAuthenticated: boolean,
  user: UserProps,
) => {
  if (menu.role === "optional") return true;
  if (menu.role === "authenticated" && isAuthenticated) return true;
  if (menu.role === "freshman" && user?.batch === 2025) return true;
  if (menu.role === "admin" && user?.isAdmin) return true;
  return false;
};
