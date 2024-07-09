"use client"

import { HiOutlineX } from "react-icons/hi";
import { FileInput } from "./FileInput";
import { useState } from "react";
import { Input } from "./Input";
import { Button } from "./Button";

interface ModalProps {
    type: "input" | "file"
    isOpen: boolean;
    onClose: () => void;
  }

export const Modal:React.FC<ModalProps> = ({
    isOpen, onClose, type="file"
}) => {
    const [file, setFile] = useState<File | null>(null);
    const [input, setInput] = useState<string>("");

    return (
        <div className={`fixed z-[999] top-0 left-0 w-full h-full bg-black bg-opacity-60 flex justify-center items-center ${isOpen ? 'block no-doc-scroll' : 'hidden'}`}>
            <div className="flex flex-col w-2/5 max-h-[90%] min-w-[360px] bg-ppmb-000 rounded-xl p-8">
                <div className="flex justify-end">
                    <button className="hover:bg-ppmb-100 hover:text-ppmb-600 p-2 rounded-[6px] text-[22px]" onClick={onClose}>
                        <HiOutlineX />
                    </button>
                </div>

                <div className="flex flex-col gap-2">
                    {type == "input" && <div className="flex flex-col">
                        <text className="text-xl font-medium">Kumpulkan tugasmu</text>
                        <text className="italic text-sm">Ini kalo ada format pengumpulan nama</text>
                    </div>}
                   
                    {type == "file" ? 
                        <FileInput
                            file={file}
                            label="Unggah berkas tugas"
                            setFile={setFile}
                            description="Ini kalo ada deskripsi pengumpulan"
                        />
                        :
                        <Input 
                            placeholder="Isi di sini"
                            setValue={setInput}
                            type="normal"
                        />
                    }

                    <div className="flex justify-center mt-4">
                        <Button 
                            handleClick={onClose}
                            label="Kumpulkan"
                            variant="md"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}