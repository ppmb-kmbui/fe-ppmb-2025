"use client";
import { useState } from "react";
import axios from "axios";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

export const Login: React.FC = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async () => {
        try {
            const res = await axios.post("http://localhost:4000", { email, password });
        } catch (err) {
            console.log(err)
        }

    }

    return (
        <div className="w-screen h-screen flex justify-center items-center overflow-hidden">
            <div className="flex flex-col gap-7 w-3/8">
                <h1 className="text-h1 text-neutral-800 font-bold">
                    Masuk dengan Akun PPMB KMB UI 2025
                </h1>
                <Input label="Email" placeholder="Masukkan Email Kamu" onChange={(e) => setEmail(e.target.value)}/>
                <Input label="Password" placeholder="Masukkan Password Kamu" onChange={(e) => setPassword(e.target.value)}/>
                <div className="flex justify-end">
                    <a href="" className="w-fit">
                        Lupa password?
                    </a>
                </div>
                <Button label="Masuk" className="bg-neutral-dark" onClick={handleLogin}/>
                <div className="flex justify-center">
                    <h1>
                        Belum memiliki akun? <a href="" className="font-bold">Buat Akun</a>
                    </h1>
                </div>
            </div>
            
            <div className="w-1/2 overflow-visible flex justify-center items-center">
                <img src="/image/Logo-Login.png" alt="gambar" className="w-full"/>
            </div>
            
        </div>
    )
}