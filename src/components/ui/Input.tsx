"use client"

import { forwardRef, useState } from "react"
import { HiEye, HiEyeOff, HiUser } from "react-icons/hi"
import { tv } from "tailwind-variants"

interface InputProps {
    label?: string
    placeholder: string
    icon?: React.ReactNode
    leftIcon?: React.ReactNode
    variant?: "standard" | "rounded"
    size?: "md" | "xl";
    error?: string
}

const inputVariants = tv({
    base: "flex flex-row border-[2px] border-ppmb-blue-600 text-ppmb-800 py-[5px] bg-ppmb-000 items-center",
    variants: {
        variant: {
            standard: "rounded-md px-3 w-full",
            rounded: "rounded-3xl px-5" 
        },
        size: {
            md: "text-lg",
            xl: ""
        }
    },
    defaultVariants: {
        variant: "standard",
        size: "md"
    }
})

export const Input = forwardRef<HTMLInputElement, InputProps>((
    { label, placeholder, icon, variant, size, error }, ref
) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    return (
    
        <div className="flex flex-col w-full">
            <div className="flex flex-row items-center gap-1">
                <div className="text-[18px]">{icon}</div>
                <text className="font-medium lg:text-lg">{label}</text>
            </div>
            
            <div className={inputVariants({ variant, size })}>
                <input ref={ref} className="bg-ppmb-000 focus:outline-none placeholder:font-normal w-full" placeholder={placeholder}/>
                {label?.split(" ").includes("Password") && <button className="pl-3" onClick={() => setIsVisible(!isVisible)} type="button">{isVisible ? <HiEye /> : <HiEyeOff />}</button>}
            </div>

            { error && <text className="text-sm text-ppmb-red-500">{error}</text>}
        </div>
    )
})