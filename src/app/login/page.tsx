"use client"

import Image from "next/image";
import { useState } from "react";

import { Button, Input } from "@/components";
import { HiLockOpen, HiMail } from "react-icons/hi";
import { useRouter } from "next/navigation";

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const router = useRouter();

    return (
        <div className="h-screen flex flex-col">
            <div className="bg-gradient-to-r from-ppmb-blue-600 to-ppmb-blue-400 w-full min-h-[95px] flex justify-between px-[60px] items-center">
                <text className="font-bold text-2xl font-crimson text-ppmb-000">
                    Masuk dengan Akun PPMB KMBUI 2024
                </text>

                <Image 
                    src={require("../../../public/logo.svg")}
                    alt={"Logo"}
                    width={150}
                    height={70}
                />
            </div>

            <div className="flex flex-row justify-evenly px-[60px] gap-5 h-full">
                <div className="w-full flex flex-col font-montserrat font-medium gap-5 items-center justify-center">
                    <Input label="Email" placeholder="Kocite" setValue={setEmail} icon={<HiMail />}/>
                    <Input label="Password" placeholder="password" setValue={setPassword} icon={<HiLockOpen />}/>

                    <div className="flex items-center flex-col gap-2">
                        <Button label="Masuk" handleClick={() => {}} variant="lg"/>
                        <span className="font-medium">Belum memiliki akun? <span className="text-ppmb-blue-500 font-semibold hover:text-ppmb-blue-700 cursor-pointer" onClick={() => router.push("/signup")}>Buat Akun</span></span>
                    </div>   
                </div>

                <div className="flex flex-col justify-center items-center w-full">
                    <Image 
                        src={"/image/mascot.png"}
                        alt="mascot"
                        width={500}
                        height={500}
                    />
                    <text className="font-crimson text-4xl font-semibold text-ppmb-800">#DiscoveringSelfAndPurpose</text>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;