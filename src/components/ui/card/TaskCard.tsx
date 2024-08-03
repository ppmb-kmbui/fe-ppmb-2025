"use client"

import { HiDownload, HiLink, HiOutlineAcademicCap, HiOutlineCalendar, HiOutlineCursorClick, HiOutlineFolderOpen } from "react-icons/hi"
import { useDisclosure } from "react-use-disclosure"
import { Modal } from "@/components";
import { AssingmentProps } from "@/app/tugas/page";
import axios from "axios";
import { api } from "@/utils/axios";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

interface TaskProps extends AssingmentProps {

}

export const TaskCard: React.FC<TaskProps> = ({
    id, name, description, deadline, icon, type, namingFormat, isFinished,
    template, vbg, rsvp
}) => {
    const [url, setUrl] = useState<string>("");
    const { token } = useAuth();
    const { open, isOpen, close } = useDisclosure(false);

    const handleSubmit = async (data: any) => {
        if (data) {
            if (type === "image") {
                try {
                    const form = new FormData();
                    form.append('file', data);
                    form.append('upload_preset', 'ppmb_kmbui');
    
                    const res = await axios.post(
                        `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
                        form
                    );
    
                    console.log('Image uploaded successfully:', res.data.url);
                    setUrl(res.data.url);
    
                } catch (error) {
                    console.error("Error uploading image:", error);
                }
            } else if (type === "pdf") {
                try {
                    const form = new FormData();
                    form.append('file', data.file);
                    form.append('upload_preset', 'ppmb_kmbui');
    
                    const res = await axios.post(
                        `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/upload`,
                        form
                    );
                    console.log('PDF uploaded successfully:', res.data.url);
                    setUrl(res.data.url);
                    
                } catch (error) {
                    console.error("Error uploading PDF:", error);
                }
            }

            switch (id) {

                case ("insight-hunting"):
                    let res = await api({
                        url: "api/tasks/insight-hunting",
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                        data: {
                            file_url: url
                        }
                    })
                    break;
                case ("fossib-1"):
                    res = await api({
                        url: "api/tasks/fossib/first",
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                        data: {
                            file_url: url
                        }
                    })
                    break;
                case ("fossib-2"):
                    res = await api({
                        url: "api/tasks/fossib/second",
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                        data: {
                            file_url: url
                        }
                    })
                    break;
                case ("networking-2023"):
                    res = await api({
                        url: "api/tasks/connect-kating",
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                        data: {
                            batch: 2023,
                            file_url: url
                        }
                    })
                    break;
                case ("networking-2022"):
                    res = await api({
                        url: "api/tasks/connect-kating",
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                        data: {
                            batch: 2022,
                            file_url: url
                        }
                    })
                    break;
                case ("networking-2021"):
                    res = await api({
                        url: "api/tasks/connect-kating",
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                        data: {
                            batch: 2021,
                            file_url: url
                        }
                    })
                    break;
                case ("mentoring-sr"):
                    res = await api({
                        url: "api/tasks/mentoring/reflection",
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                        data: {
                            description: "",
                            file_url: url
                        }
                    })
                    break;
                case ("mentoring-v"):
                    res = await api({
                        url: "api/tasks/mentoring/vlog",
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                        data: {
                            file_url: "url" //TODO: 
                        }
                    })
                    break;
                case ("kmbui-explorer"):
                    res = await api({
                        url: "api/tasks/explorer",
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                        data: {
                            file_url: url
                        }
                    })
                    break;
            }

        } else {
            console.error("No file provided for upload");
        }
    };
    return (
        <div className="flex flex-col p-3 md:p-4 border-[1px] border-ppmb-200 w-full rounded-lg gap-2">
            <Modal
                isOpen={isOpen}
                onClose={close}
                type={type}
                label={`Kumpul berkas ${name}`}
                onSubmit={handleSubmit}
                sublabel={namingFormat}
            />

            <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:justify-between">
                <div className="flex flex-row gap-2 md:gap-[10px] items-center">
                    <div className="flex p-[6px] bg-ppmb-blue-500 rounded-md text-xl md:text-[24px] text-ppmb-000 text-[16px]">
                        {icon}
                    </div>
                    <text className="font-semibold text-lg md:text-xl">{name}</text>
                </div>

                <div className="flex flex-row gap-2">

                    { rsvp && 
                    <a href={rsvp} target="_blank" rel="noopener noreferrer" className={`flex md:hidden`}>
                        <button className="border-ppmb-700 font-medium border-[2px] flex gap-[6px] items-center text-ppmb-700 px-3 pl-[16px] py-[2px] text-[13px] md:text-sm rounded-lg hover:bg-ppmb-100">
                            <text>RSVP</text>
                            <HiOutlineCursorClick size={17}/>
                        </button> 
                    </a>}

                    <div className="rounded-xl bg-ppmb-100 text-sm md:text-[16px] text-ppmb-800 px-3 gap-2 pr-3 flex flex-row py-1 items-center max-w-fit">
                    <HiOutlineCalendar />
                    <text className="font-medium">{deadline}</text>
                </div>
                </div>                
            </div>

            <div className="min-h-[1px] bg-ppmb-200 mt-[2px]"/>

            <div className="flex text-sm md:text-[16px]">
                <text>{description}</text>
            </div>

            <div className="flex justify-end gap-2 mt-2 lg:mt-3 items-center">
                { !isFinished && <>
                { rsvp && 
                <a href={rsvp} target="_blank" rel="noopener noreferrer" className={`hidden md:flex`}>
                    <button className="border-ppmb-700 font-medium border-[2px] flex gap-[6px] items-center text-ppmb-700 px-3 pl-[16px] py-[2px] text-[13px] md:text-sm rounded-lg hover:bg-ppmb-100">
                        <text>RSVP</text>
                        <HiOutlineCursorClick size={17}/>
                    </button> 
                </a>}

                { vbg && 
                <a href={vbg} target="_blank" rel="noopener noreferrer">
                    <button className="border-ppmb-700 font-medium border-[2px] flex gap-[6px] items-center text-ppmb-700 px-3 pl-[16px] py-[2px] text-[13px] md:text-sm rounded-lg hover:bg-ppmb-100">
                        <text>VBG</text>
                        <HiDownload />
                    </button> 
                </a>}

                { template && 
                <a href={template} target="_blank" rel="noopener noreferrer">
                    <button className="border-ppmb-700 font-medium border-[2px] flex gap-[6px] items-center text-ppmb-700 px-3 pl-[16px] py-[2px] text-[13px] md:text-sm rounded-lg hover:bg-ppmb-100">
                        <text>Template</text>
                        <HiDownload />
                    </button> 
                </a>}

                {/* <button className="border-ppmb-700 font-medium border-[2px] flex gap-[6px] items-center text-ppmb-700 px-3 pr-[16px] py-[2px] text-[13px] md:text-sm rounded-lg">
                    <HiOutlineFolderOpen size={20}/>
                    <text>Cek File</text>
                </button> */}

                {/* <button className="border-ppmb-700 font-medium border-[2px] flex gap-[6px] items-center text-ppmb-700 px-3 pr-[16px] py-[2px] text-[13px] md:text-sm rounded-lg">
                    <HiLink size={18} />
                    <text>Cek Link</text>
                </button> */}

                <button className="bg-ppmb-blue-500 flex gap-2 items-center text-ppmb-000 px-5 py-[2px] min-w-[80px] justify-center text-[13px] md:text-sm rounded-lg hover:bg-ppmb-blue-700 min-h-[27.5px]" onClick={open}>
                    <text>Submit</text>
                </button>
                </>}

                { isFinished && <></>}
           </div>
        </div>
    )
}