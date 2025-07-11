import { HiOutlineChatAlt2, HiOutlineHome, HiOutlinePencilAlt, HiOutlineShieldCheck, HiOutlineUser, HiSearch } from "react-icons/hi";
import { RiMegaphoneLine } from "react-icons/ri";

export const MAIN_MENU = [
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


