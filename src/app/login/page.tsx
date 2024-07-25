"use client"

import Image from "next/image";
import { useState } from "react";
import { Button, Header, Input } from "@/components";
import { HiLockOpen, HiMail } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const loginFormSchema = z.object({
    email: z.string().email({ message: "Masukkan email yang valid!" }),
    password: z.string().min(8, { message: "Password minimal terdiri dari 8 karakter!" })
})



const LoginPage: React.FC = () => {
    const { login } = useAuth();
    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
    })

    const handleLogin = async (data: z.infer<typeof loginFormSchema>) => {
        try{
            console.log("Form Data:", data);
            // await login(data.email, data.password);
        } catch (error: any) {
            console.log("Error while logging in", error);
        }
    }

    return (
        <div className="min-h-screen flex flex-col h-full">
            <Header label="Masuk dengan Akun" subLabel="PPMB KMBUI 2024"/>

            <div className="flex flex-col-reverse items-center justify-center md:flex-row md:justify-evenly px-5 md:px-[60px] gap-8 lg:gap-5 h-full">
                <form onSubmit={handleSubmit(handleLogin)} className="w-full flex flex-col font-medium gap-5 items-center justify-center px-2 lg:px-0">
                    <Input {...register("email")} placeholder="Masukkan email kamu" icon={<HiMail />} label="Email" error={errors.email?.message} />
                    <Input {...register("password")} placeholder="Masukkan password kamu" icon={<HiLockOpen />} label="Password" error={errors.password?.message} />

                    <div className="flex items-center flex-col gap-2 lg:mt-2">
                        <Button label="Masuk" type="submit" />
                        <span className="font-medium">Belum memiliki akun? <span className="text-ppmb-blue-500 font-semibold hover:text-ppmb-blue-700 cursor-pointer hover:underline decoration-2" onClick={() => router.push("/signup")}>Buat Akun</span></span>
                    </div>   
                </form>

                <div className="flex flex-col justify-center items-center w-full">
                    <div className="w-[350px] lg:w-[480px] lg:h-full">
                        <Image 
                            src={"/image/mascot.png"}
                            alt="mascot"
                            width={500}
                            height={500}
                        />
                    </div>
                    <text className="font-crimson text-xl md:text-3xl lg:text-4xl font-semibold text-ppmb-800">#DiscoveringSelfAndPurpose</text>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;