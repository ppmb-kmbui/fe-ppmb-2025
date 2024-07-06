"use client"

import { Button, FileInput, Input } from "@/components";
import Image from "next/image";
import { useState } from "react";
import { HiChatAlt2 } from "react-icons/hi";

const NetworkingAssignmentPage: React.FC = () => {
    const [answer1, setAnswer1] = useState<string>(""); 
    const [answer2, setAnswer2] = useState<string>(""); 
    const [answer3, setAnswer3] = useState<string>(""); 
    const [answer4, setAnswer4] = useState<string>(""); 
    const [photo, setPhoto] = useState<File | null>(null);


    return (
        <div className="h-screen flex flex-col">
             <div className="bg-gradient-to-r from-ppmb-blue-600 to-ppmb-blue-400 w-full min-h-[95px] flex justify-between px-[60px] items-center">
                <text className="font-bold text-2xl font-crimson text-ppmb-000">
                    Networking dengan Ariana Grande
                </text>

                <Image
                    src={require("../../../../public/logo.svg")}
                    alt={"Logo"}
                    width={150}
                    height={70}
                />
            </div>

            <div className="flex flex-row justify-evenly px-[60px] gap-5 h-full">
                <div className="w-full flex flex-col font-montserrat font-medium gap-5 items-center justify-center h-full">
                    <Input label="Pertanyaan wajib 1" placeholder="Jawaban" setValue={setAnswer1} icon={<HiChatAlt2 />}/>
                    <Input label="Pertanyaan wajib 2" placeholder="Jawaban" setValue={setAnswer2} icon={<HiChatAlt2 />}/>
                    <Input label="Pertanyaan random 1" placeholder="Jawaban" setValue={setAnswer3} icon={<HiChatAlt2 />}/>
                    <Input label="Pertanyaan random 2" placeholder="Jawaban" setValue={setAnswer4} icon={<HiChatAlt2 />}/>

                    <div className="flex mt-3">
                        <Button label="Kumpulkan" handleClick={() => {}}/>
                    </div>
                </div>

                <FileInput photo={photo} setPhoto={setPhoto} label="Unggah foto networking" />
            </div>
        </div>
    )
}

export default NetworkingAssignmentPage;