"use client"

import { HiDownload, HiLink, HiOutlineAcademicCap, HiOutlineCalendar, HiOutlineCursorClick, HiOutlineFolderOpen } from "react-icons/hi"
import { useDisclosure } from "react-use-disclosure"
import { Modal } from "@/components";
import { AssingmentProps, ProgressProps } from "@/app/tugas/page";
import axios from "axios";
import { api } from "@/utils/axios";
import { useAuth } from "@/context/AuthContext";
import { Dispatch, SetStateAction, useState } from "react";
import { formatDate } from "@/utils/stringUtils";

interface TaskProps extends AssingmentProps {
    setProgress: Dispatch<SetStateAction<ProgressProps>>
}

export const TaskCard: React.FC<TaskProps> = ({
    id, name, description, deadline, icon, type, namingFormat, isFinished,
    template, vbg, rsvp,
    setProgress
}) => {
    const [url, setUrl] = useState<string>("");
    const { token } = useAuth();
    const { open, isOpen, close } = useDisclosure(false);

    const handleSubmit = async (data: any) => {
        if (data) {
            console.log("image", data);
            console.log("ini id", id);
            console.log("ini type", type)
            if (type === "image") {
            console.log("haiiii2")

                try {
                    const form = new FormData();
                    form.append('file', data);
                    form.append('upload_preset', 'ppmb_kmbui');
    
                    const res = await axios.post(
                        `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
                        form
                    );
    
                    setUrl(res.data.url);
    
                } catch (error) {
                    console.error("Error uploading image:", error);
                }
            } else if (type === "pdf") {
            console.log("haiiii3")

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

                switch (id) {
                    case ("insight-hunting"):
                        await api({
                            url: "api/tasks/insight-hunting",
                            method: "POST",
                            headers: {
                                Authorization: `Bearer ${token}`
                            },
                            data: {
                                file_url: res.data.url
                            }
                        })
                        setProgress(oldProgress => ({ ...oldProgress, insightHuntingDone: true }));
                        break;

                    case ("fossib-1"):
                        await api({
                            url: "api/tasks/fossib/first",
                            method: "POST",
                            headers: {
                                Authorization: `Bearer ${token}`
                            },
                            data: {
                                description: "",
                                file_url: res.data.url
                            }
                        })
                        setProgress(oldProgress => ({ ...oldProgress, firstFossibDone: true }));
                        break;

                    case ("fossib-2"):
                        await api({
                            url: "api/tasks/fossib/second",
                            method: "POST",
                            headers: {
                                Authorization: `Bearer ${token}`
                            },
                            data: {
                                description: "",
                                file_url: res.data.url
                            }
                        })
                        setProgress(oldProgress => ({ ...oldProgress, secondFossibDone: true }));
                        break;

                    case ("networking-2023"):
                        await api({
                            url: "api/tasks/connect-kating",
                            method: "POST",
                            headers: {
                                Authorization: `Bearer ${token}`
                            },
                            data: {
                                batch: 2023,
                                file_url: res.data.url
                            }
                        })
                        setProgress(oldProgress => ({ ...oldProgress, networkingKating: { ...oldProgress.networkingKating, "2023": {  ...oldProgress.networkingKating["2023"], progres: oldProgress.networkingKating["2023"].progres + 1 }}}));
                        break;

                    case ("networking-2022"):
                        await api({
                            url: "api/tasks/connect-kating",
                            method: "POST",
                            headers: {
                                Authorization: `Bearer ${token}`
                            },
                            data: {
                                batch: 2022,
                                file_url: res.data.url
                            }
                        })
                        setProgress(oldProgress => ({ ...oldProgress, networkingKating: { ...oldProgress.networkingKating, "2022": {  ...oldProgress.networkingKating["2022"], progres: oldProgress.networkingKating["2022"].progres + 1 }}}));
                        break;

                    case ("networking-2021"):
                        await api({
                            url: "api/tasks/connect-kating",
                            method: "POST",
                            headers: {
                                Authorization: `Bearer ${token}`
                            },
                            data: {
                                batch: 2021,
                                file_url: res.data.url
                            }
                        })
                        setProgress(oldProgress => ({ ...oldProgress, networkingKating: { ...oldProgress.networkingKating, "2021": {  ...oldProgress.networkingKating["2021"], progres: oldProgress.networkingKating["2021"].progres + 1 }}}));
                        break;

                    case ("mentoring-sr"):
                        await api({
                            url: "api/tasks/mentoring/reflection",
                            method: "POST",
                            headers: {
                                Authorization: `Bearer ${token}`
                            },
                            data: {
                                description: "",
                                file_url: res.data.url
                            }
                        })
                        setProgress(oldProgress => ({ ...oldProgress, mentoringReflectionDone: true }));
                        break;

                    case ("kmbui-explorer"):
                        await api({
                            url: "api/tasks/explorer",
                            method: "POST",
                            headers: {
                                Authorization: `Bearer ${token}`
                            },
                            data: {
                                img_url: res.data.url
                            }
                        })
                        setProgress(oldProgress => ({ ...oldProgress, kmbuiExplorerDone: true }));
                        break;
                } 
 
                    if (res.status == 200){
                        close();
                    }
        
        } catch (error) {
                console.error("Error uploading PDF:", error);
            }
        }

        if (id == "mentoring-v"){
            console.log("masuk sini kok")
            const res = await api({
                url: "api/tasks/mentoring/vlog",
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: {
                    file_url: data.link
                }
            })
            setProgress(oldProgress => ({ ...oldProgress, mentoringVlogDone: true }));
            if (res.status == 200){
                close();
            }
        }

        } else {
            
        }
    };

    const isOverdue = new Date() >= new Date(deadline);

    return (
        <>
        <Modal
                isOpen={isOpen}
                onClose={close}
                type={type}
                label={`Kumpul berkas ${name}`}
                onSubmit={handleSubmit}
                sublabel={namingFormat}
            />
        <div className={`${(!isOverdue && !isFinished) && 'opacity-70'} flex flex-col p-3 md:p-4 border-[1px] border-ppmb-200 w-full rounded-lg gap-2`}>
            

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

                    <div className={`${(!isOverdue && !isFinished) ? 'bg-ppmb-red-500 text-ppmb-000' : 'bg-ppmb-100 text-ppmb-800'} rounded-xl  text-sm md:text-[16px]  px-3 gap-2 pr-3 flex flex-row py-1 items-center max-w-fit`}>
                    <HiOutlineCalendar />
                    <text className="font-medium">{formatDate(deadline)}</text>
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

                <button className="bg-ppmb-blue-500 flex gap-2 items-center text-ppmb-000 px-5 py-[2px] min-w-[80px] justify-center text-[13px] md:text-sm rounded-lg hover:bg-ppmb-blue-700 min-h-[27.5px]" onClick={open}>
                    <text>Submit</text>
                </button>
                </>}

                { isFinished && <></>}
           </div>
        </div>
        </>
    )
}