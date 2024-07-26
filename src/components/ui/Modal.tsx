"use client"

import { HiOutlineX } from "react-icons/hi";
import { FileInput, FileInputProps } from "./FileInput";
import { useState } from "react";
import { Input, InputProps } from "./Input";
import { Button } from "./Button";

// sorry for unhinged interface :)
interface ModalProps {
    type: "input" | "file" | "image"
    isOpen: boolean
    onClose: () => void
    label: string
    sublabel?: string
    handleSubmit: () => void
    handleFileChange?: (file: File | null) => void
    file?: File | null
  }

export const Modal:React.FC<ModalProps> = ({
    isOpen, onClose, type="file", label, sublabel="", handleSubmit, 
    handleFileChange=() => {}, file=null // default value for file
}) => {
    const [input, setInput] = useState<string>("");

    return (
        <div className={`fixed z-[999] top-0 left-0 w-full h-full bg-black bg-opacity-60 flex justify-center items-center ${isOpen ? 'block no-doc-scroll' : 'hidden'}`}>
            <div className="flex flex-col w-2/5 max-h-[90%] min-w-[360px] bg-ppmb-000 rounded-xl p-7">
                <div className="flex justify-end">
                    <button className="hover:bg-ppmb-100 hover:text-ppmb-600 p-2 rounded-[6px] text-[22px]" onClick={onClose}>
                        <HiOutlineX />
                    </button>
                </div>

                <div className="flex flex-col gap-2">
                    {type == "input" && <div className="flex flex-col">
                        <text className="text-xl font-medium">{label}</text>
                        <text className="italic text-sm">{sublabel}</text>
                    </div>}

                    nunggu back end kelar, baru benerin page ini
                   
                    {/* {type == "file" || type == "image" ? 
                        <FileInput
                            file={file}
                            label={label}
                            onChange={(file) => onChange(file)}
                            description={sublabel}
                        />
                        :
                        <Input 
                            placeholder="Isi di sini"
                            setValue={setInput}
                            type="normal"
                        />
                    } */}

                    {/* <div className="flex justify-center mt-4">
                        <Button 
                            handleClick={() => {handleSubmit(), onClose()}}
                            label="Kumpulkan"
                            size="md"
                        />
                    </div> */}
                </div>
            </div>
        </div>
    )
}