"use client"

import { Dispatch, SetStateAction, useCallback, useRef } from "react";
import { FaFolderOpen } from "react-icons/fa6";
import { Button } from "./Button";

export interface FileInputProps {
    file: File | null
    onChange: (file: File | null) => void;
    label: string
    description: string
    fileType: 'image' | 'pdf'
    error?: string
}

export const FileInput: React.FC<FileInputProps> = ({
    file, onChange, label, description, fileType, error
}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const onChooseFile = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    }

    const openPhoto = () => {
        if (file) {
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL, '_blank');
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }

    const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        const file = event.dataTransfer.files?.[0]
        onChange(file || null)
    }, []);

    return (
        <div className="w-full flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-[2px]">
                <text className="font-medium text-xl md:text-2xl text-center">{label}</text>
                <text className="text-sm text-ppmb-600">{description}</text>
            </div>
            
            <div className="mt-5 border-dashed border-ppmb-600 border-[2px] px-7 justify-between rounded-lg w-[290px] md:w-[450px] max-h-[250px] md:max-h-[300px] p-6 md:pt-14 md:pb-10 flex flex-col items-center gap-2 md:gap-6" onDrop={handleDrop} onDragOver={handleDragOver}>
                <FaFolderOpen className="text-ppmb-blue-600 text-[70px] md:text-[95px]"/>

                <div className={`${file ? 'gap-3' : 'gap-2'} flex flex-col w-full`}>
                    {file?.name ? (
                        <span
                            className="text-sm text-center underline text-ppmb-blue-500 font-medium cursor-pointer"
                            onClick={openPhoto}
                        >
                            {file.name}
                        </span>
                    ) : (
                        <span className="text-center text-sm">Drag dan drop <br /> atau</span>
                    )}
                    
                    <Button onClick={onChooseFile} label={`Cari ${label.split(" ")[1]}`}/>
                    <input ref={inputRef} accept={fileType === 'image' ? '.jpg, .jpeg, .png' : '.pdf'} type="file" className="hidden" onChange={(e) => onChange(e.target.files?.[0] || null)} />
                </div>
            </div>

            { error && <text className="mt-2 text-sm text-ppmb-red-500 font-medium">{error}</text>}
        </div>
    )
}