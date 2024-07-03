"use client"

import { useOutsideClick } from "@/hooks/useOutsideClick";
import Image from "next/image";
import { useState } from "react";
import { HiOutlineChatAlt2, HiOutlineHome, HiOutlineLogout, HiOutlinePencilAlt, HiOutlineUser } from "react-icons/hi";
import "./style.css"
import { usePathname, useRouter } from "next/navigation";

export const Sidebar: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const ref = useOutsideClick(() => setIsExpanded(false));

    const router = useRouter();
    const pathname = usePathname();

    const MAIN_MENU = [
        { icon: <HiOutlineHome />, text: "Home", route: "/" },
        { icon: <HiOutlineChatAlt2 />, text: "Connect", route: "/connect" },
        { icon: <HiOutlinePencilAlt />, text: "Todo", route: "/todo" },
        { icon: <HiOutlineUser />, text: "Profile", route: "/profile" },
    ];

    return (
        <div className={`${pathname == "/signup" || pathname == "/login" ? "hidden" : "md:flex"} ${isExpanded ? "block w-[250px] px-4" : "w-[65px] px-[10px]"} pt-4 gap-3 h-screen hidden bg-white flex-col duration-300 ease-in-out items-center`} id="bar-fixed" ref={ref}>
            <div className="h-[60px] flex items-center cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
                <Image
                    src={isExpanded ? "/image/logo-full.png" : "/image/logo.png"}
                    alt="logo"
                    width={isExpanded ? 140 : 45}
                    height={40}
                />
            </div>

            <div className="bg-ppmb-100 w-full h-[2px]" />

            <div className="flex flex-col gap-[8px] w-full h-full justify-between">
                <div className="flex flex-col gap-[8px] w-full h-full">
                    {MAIN_MENU.map((menu, i) => (
                        <div key={i} className={`${pathname == menu.route ? "bg-ppmb-blue-500 text-ppmb-000" : "hover:bg-ppmb-100 text-ppmb-800"} ${!isExpanded && "justify-center"} group flex items-center px-3 py-2 rounded-lg cursor-pointer`} onClick={() => {router.push(menu.route), setIsExpanded(false)}}>
                            <div className="flex flex-row gap-3">
                                <text className="text-[26px]">{menu.icon}</text>
                                <text className={`${isExpanded ? "text-[18px]" : "absolute transition-transform delay-500 opacity-0 translate-x-28 overflow-hidden pointer-events-none"} whitespace-pre duration-500 font-medium`} style={{transitionDelay: `${i + 3}00ms`}}>{menu.text}</text>
                            </div>

                            <div className={`${isExpanded ? "hidden" : "absolute transition-transform delay-500 bg-ppmb-blue-900 text-ppmb-100 px-2 py-1 rounded-sm text-[14px] left-[55px] invisible group-hover:visible"} whitespace-nowrap duration-500`}>{menu.text}</div>
                        </div>
                    ))}
                </div>

                <div  className={`${!isExpanded && "justify-center"} group bg-ppmb-red-500 text-ppmb-000 mb-4 flex items-center px-3 py-2 rounded-lg cursor-pointer`} onClick={() => {}}>
                    <div className="flex flex-row gap-3">
                        <text className="text-[26px]"><HiOutlineLogout /></text>
                        <text className={`${isExpanded ? "text-[18px]" : "absolute transition-transform delay-500 opacity-0 translate-x-28 overflow-hidden pointer-events-none"} whitespace-pre duration-500 font-medium`}>Keluar</text>
                    </div>
                    <div className={`${isExpanded ? "hidden" : "absolute transition-transform delay-500 bg-ppmb-blue-900 text-ppmb-100 px-2 py-1 rounded-sm text-[14px] left-[55px] invisible group-hover:visible"} whitespace-nowrap duration-500`}>Keluar</div>
                </div>
            </div>
        </div>
    )
}