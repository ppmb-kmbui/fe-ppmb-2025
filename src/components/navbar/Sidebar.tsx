"use client"

import Image from "next/image";
import { HiOutlineChatAlt2, HiOutlineHome, HiOutlineLogin, HiOutlineLogout, HiOutlinePencilAlt, HiOutlineShieldCheck, HiOutlineUser, HiSearch } from "react-icons/hi";
import "./style.css"
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export const Sidebar: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();

    const { logout, isAuthenticated, user } = useAuth();

    const MAIN_MENU = [
        { icon: <HiOutlineHome />, text: "Beranda", route: "/", role: "optional" },
        { icon: <HiSearch />, text: "Cari teman", route: "/cari", role: "authenticated" },
        { icon: <HiOutlineChatAlt2 />, text: "Networking", route: "/networking", role: "freshman" },
        { icon: <HiOutlinePencilAlt />, text: "Tugas", route: "/tugas", role: "freshman" },
        { icon: <HiOutlineUser />, text: "Profil", route: "/profil", role: "authenticated" },
        { icon: <HiOutlineShieldCheck />, text: "Admin", route: "/admin", role: "admin" },
    ];

    const renderMenu = (menu: typeof MAIN_MENU[number]) => {
        if (menu.role === "optional") return true;
        if (menu.role === "authenticated" && isAuthenticated) return true;
        if (menu.role === "freshman" && user?.batch === "2024") return true;
        if (menu.role === "admin" && user?.isAdmin) return true;
        return false;
    };

    return (
        <div className={`${pathname == "/signup" || pathname == "/login" ? "hidden" : "md:flex"} w-[65px] px-[10px] pt-4 gap-3 h-screen hidden bg-white flex-col duration-300 ease-in-out items-center`} id="bar-fixed">
            <div className="h-[60px] flex items-center">
                <Image
                    src={"/image/logo.png"}
                    alt="logo"
                    width={45}
                    height={45}
                />
            </div>

            <div className="bg-ppmb-100 w-full h-[2px]" />

            <div className="flex flex-col gap-[8px] w-full h-full justify-between">
                <div className="flex flex-col gap-[8px] w-full h-full">
                    {MAIN_MENU.map((menu, i) => (
                        renderMenu(menu) && (
                            <div key={i} className={`${pathname == menu.route ? "bg-ppmb-blue-100 text-ppmb-blue-500" : "hover:bg-ppmb-100 text-ppmb-800"} group flex items-center justify-center px-3 py-2 rounded-lg cursor-pointer`} onClick={() => router.push(menu.route)}>
                                <text className="text-[26px]">{menu.icon}</text>
                                <div className="absolute transition-transform delay-500 bg-ppmb-blue-900 text-ppmb-100 px-3 py-1 rounded-sm text-[14px] left-[55px] invisible group-hover:visible whitespace-nowrap duration-500">{menu.text}</div>
                            </div>
                        )
                    ))}

                    {/* <div className={`${pathname == "/admin" ? "bg-ppmb-blue-100 text-ppmb-blue-500" : "hover:bg-ppmb-100 text-ppmb-800"} group flex items-center justify-center px-3 py-2 rounded-lg cursor-pointer`} onClick={() => router.push("/admin")}>
                        <text className="text-[26px]"><HiOutlineShieldCheck /></text>
                        <div className="absolute transition-transform delay-500 bg-ppmb-blue-900 text-ppmb-100 px-3 py-1 rounded-sm text-[14px] left-[55px] invisible group-hover:visible whitespace-nowrap duration-500">Admin</div>
                    </div> */}
                </div>

                <div className="group bg-ppmb-red-500 text-ppmb-000 mb-4 flex items-center px-3 py-2 rounded-lg cursor-pointer" onClick={isAuthenticated ? logout : () => router.push('/login')}>
                    <text className="text-[26px]">{isAuthenticated ? <HiOutlineLogout /> : <HiOutlineLogin />}</text>
                    <div className="absolute transition-transform delay-500 bg-ppmb-blue-900 text-ppmb-100 px-3 py-1 rounded-sm text-[14px] left-[55px] invisible group-hover:visible whitespace-nowrap duration-500">{isAuthenticated ? "Keluar" : "Masuk"}</div>
                </div>
            </div>
        </div>
    )
}