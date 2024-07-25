"use client"

import { forwardRef, useState } from "react"
import { HiEye, HiEyeOff, HiUser } from "react-icons/hi"
import { tv } from "tailwind-variants"

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">{
    label?: string
    placeholder: string
    icon?: React.ReactNode
    leftIcon?: React.ReactNode
    variant?: "standard"
    error?: string
    size?: "md" | "lg";
}

const inputVariants = tv({
    base: "flex flex-row border-[2px] border-ppmb-blue-600 text-ppmb-800 bg-ppmb-000 items-center",
    variants: {
        variant: {
            standard: "rounded-md w-full",
            // rounded: "rounded-3xl px-5" 
        },
        size: {
            md: "text-lg py-[5px] px-3",
            lg: "text-xl px-4 h-[45px]"
        }
    },
    defaultVariants: {
        variant: "standard",
        size: "md"
    }
})

export const Input = forwardRef<HTMLInputElement, InputProps>((
    { label, placeholder, icon, variant="standard", size="md", error, leftIcon, onChange, ...props }, ref
) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    return (
    
        <div className="flex flex-col w-full">
            <div className="flex flex-row items-center gap-1">
                <div className="text-[18px]">{icon}</div>
                <text className="font-medium lg:text-lg">{label}</text>
            </div>
            
            <div className={inputVariants({ variant, size })}>
                <input ref={ref} className="bg-ppmb-000 focus:outline-none placeholder:font-normal placeholder:text-ppmb-300 w-full font-medium" type={label?.split(" ").includes("Password") && !isVisible ? "password" : "text"} placeholder={placeholder} {...props}/>
                {label?.split(" ").includes("Password") && <button className="pl-3" onClick={() => setIsVisible(!isVisible)} type="button">{isVisible ? <HiEye /> : <HiEyeOff />}</button>}
            </div>

            { error && <text className="text-sm text-ppmb-red-500">{error}</text>}
        </div>
    )
})