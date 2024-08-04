// components/SmallBar.tsx

"use client"

import { useState } from "react";
import { HiChevronRight, HiOutlineChevronRight, HiOutlineLogin, HiOutlineLogout } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export const SmallBar: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const router = useRouter();
    const { logout, isAuthenticated } = useAuth();

    const handleSidebarToggle = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const navigateTo = (route: string) => {
        router.push(route);
        handleSidebarToggle();
    };

    const { user } = useAuth();

    return (
        <div className="flex items-center md:hidden">
            <div
                className={`md:hidden fixed top-1/2 flex left-[-25px] justify-end items-center transform -translate-y-1/2 z-50 p-1 bg-white rounded-full shadow-lg cursor-pointer ${isSidebarOpen ? "hidden" : "block"}`}
                onClick={handleSidebarToggle}
                style={{ width: '50px', height: '50px' }}
            >
                {/* <div className="relative flex items-center justify-end"> */}
                    <HiChevronRight size={20}/>
                {/* </div> */}
            </div>

            {isSidebarOpen && (
                <div className="md:hidden fixed inset-0 z-40 bg-white flex flex-col items-center p-4 justify-center">
                    <div className="flex justify-end w-full">
                        <button
                            className="text-4xl p-2"
                            onClick={handleSidebarToggle}
                        >
                            &times;
                        </button>
                    </div>
                    <div className="flex flex-col gap-4 w-full">
                        <button className="p-2 text-lg" onClick={() => navigateTo('/')}>Beranda</button>
                        <button className="p-2 text-lg" onClick={() => navigateTo('/cari')}>Cari</button> 
                        { user.batch != 2024 && <button className="p-2 text-lg" onClick={() => navigateTo('/networking')}>Networking</button> }
                        { user.batch != 2024 && <button className="p-2 text-lg" onClick={() => navigateTo('/tugas')}>Tugas</button> }
                        { user.batch != 2024 && <button className="p-2 text-lg" onClick={() => navigateTo('/pengumuman')}>Pengumuman</button> }
                        <button className="p-2 text-lg" onClick={() => navigateTo('/profil')}>Profil</button>
                        { user.isAdmin && <button className="p-2 text-lg" onClick={() => navigateTo('/admin')}>Admin</button> }

                        <div 
                            className="group bg-ppmb-red-500 text-ppmb-000 mb-4 flex text-center justify-center items-center px-3 py-2 rounded-lg cursor-pointer"
                            onClick={isAuthenticated ? logout : () => navigateTo('/login')}
                        >
                            {isAuthenticated ? "Keluar" : "Masuk"}
                        </div>
                    </div>
                </div>
            )}

            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black opacity-50"
                    onClick={handleSidebarToggle}
                />
            )}
        </div>
    );
}
