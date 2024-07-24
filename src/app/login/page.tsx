"use client"

import Image from "next/image";
import { useState } from "react";

import { Button, Header, Input } from "@/components";
import { HiLockOpen, HiMail } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const router = useRouter();
    const { login, isLoading, isAuthenticated } = useAuth();

    console.log(isAuthenticated)

    const handleLogin = async () => {
        try{
            await login(email, password);
        } catch {
            console.log("rusak bro");
        }
    }

    return (
        <div className="min-h-screen flex flex-col h-full">
            <Header label="Masuk dengan Akun" subLabel="PPMB KMBUI 2024"/>

            <div className="flex flex-col-reverse items-center justify-center md:flex-row md:justify-evenly px-5 md:px-[60px] gap-5 h-full">
                <div className="w-full flex flex-col font-medium gap-5 items-center justify-center">
                    <Input label="Email" placeholder="Kocite" setValue={setEmail} icon={<HiMail />}/>
                    <Input label="Password" placeholder="password" setValue={setPassword} icon={<HiLockOpen />}/>

                    <div className="flex items-center flex-col gap-2">
                        <Button label="Masuk" handleClick={handleLogin} variant="lg"/>
                        <span className="font-medium">Belum memiliki akun? <span className="text-ppmb-blue-500 font-semibold hover:text-ppmb-blue-700 cursor-pointer hover:underline decoration-2" onClick={() => router.push("/signup")}>Buat Akun</span></span>
                    </div>   
                </div>

                <div className="flex flex-col justify-center items-center w-full">
                    <Image 
                        src={"/image/mascot.png"}
                        alt="mascot"
                        width={400}
                        height={400}
                    />
                    <text className="font-crimson text-xl md:text-3xl lg:text-4xl font-semibold text-ppmb-800">#DiscoveringSelfAndPurpose</text>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;