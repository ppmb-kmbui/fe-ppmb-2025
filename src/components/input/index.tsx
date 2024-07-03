import { useState } from "react"
import { HiEye, HiEyeOff, HiUser } from "react-icons/hi"

interface InputProps {
    label: string
    placeholder: string
    setValue: (value: string) => void
    icon: React.ReactNode
}

export const Input: React.FC<InputProps> = ({
    label, placeholder, setValue, icon
}) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    return (
        <div className="flex flex-col text-lg w-full text-ppmb-800">
            <div className="flex flex-row items-center gap-1 ">
                <div className="text-[18px]">{icon}</div>
                <text className="font-semibold">{label}</text>
            </div>

            <div className="border-ppmb-blue-600 border-[2px] rounded-md px-3 py-[5px] flex flex-row font-medium">
                <input className="w-full bg-transparent focus:outline-none" type={label.split(" ").includes("Password") && !isVisible ? "password" : "text"} onChange={(e) => setValue(e.target.value)}/>
                {label.split(" ").includes("Password") && <button className="pl-3" onClick={() => setIsVisible(!isVisible)}>{isVisible ? <HiEye /> : <HiEyeOff />}</button>}
            </div>
        </div>
    )
}