"use client"

import { useState } from "react"
import { HiEye, HiEyeOff, HiUser } from "react-icons/hi"

interface InputProps {
    label?: string
    placeholder: string
    setValue: (value: string) => void
    icon?: React.ReactNode
    type?: "normal" | "rounded"
}

export const Input: React.FC<InputProps> = ({
    label, placeholder, setValue, icon, type="normal"
}) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    return (
        <div className={`${type == "rounded" ? "w-[400px] md:w-[500px] lg:max-w-[850px] lg:w-full" : "w-full"} flex flex-col text-lg text-ppmb-800`}>
            {type == "normal" && <div className="flex flex-row items-center gap-1 ">
                <div className="text-[18px]">{icon}</div>
                <text className="font-medium">{label}</text>
            </div>}

            <div className={`${type == "rounded" ? "rounded-3xl px-5 flex-row gap-3 items-center" : "rounded-md px-3"} items-center border-ppmb-blue-600 bg-ppmb-000 border-[2px] py-[5px] flex flex-row`}>
                {type == "rounded" && <div className="text-xl">{icon}</div>}
                <input className="w-full bg-ppmb-000 focus:outline-none placeholder:font-normal" type={label?.split(" ").includes("Password") && !isVisible ? "password" : "text"} placeholder={placeholder} onChange={(e) => setValue(e.target.value)}/>
                {label?.split(" ").includes("Password") && <button className="pl-3" onClick={() => setIsVisible(!isVisible)}>{isVisible ? <HiEye /> : <HiEyeOff />}</button>}
            </div>
        </div>
    )
}