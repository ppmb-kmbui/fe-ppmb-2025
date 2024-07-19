"use client"

import { Button, FileInput, Header, Input } from "@/components";
import { useAuth } from "@/context/AuthContext";
import withAuth from "@/hoc/withAuth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HiChatAlt2 } from "react-icons/hi";

interface QuestionProps {
    id: number
    question: string
    created_at: string
    updated_at: string
    is_mandatory: boolean
}

interface QuestionAnswerProps {
    questionId: number
    fromId: number
    toId: number
    answer: string
    question: QuestionProps
}

interface NetworkingAssignmentProps {
    fromId: number
    toId: number
    is_done: boolean
    questions: QuestionAnswerProps[]
}

const NetworkingAssignmentPage: React.FC<{ params: { uuid: string } }> = ({ params: { uuid } }) => {
    const [networkingAssignment, setNetworkingAssignment] = useState<NetworkingAssignmentProps>();
    const [answer1, setAnswer1] = useState<string>(""); 
    const [answer2, setAnswer2] = useState<string>(""); 
    const [answer3, setAnswer3] = useState<string>(""); 
    const [answer4, setAnswer4] = useState<string>("");
    const [photo, setPhoto] = useState<File | null>(null);

    const [isFetching, setIsFetching] = useState<boolean>(true);

    const { user } = useAuth();

    const getData = async () => {
        try {

        } catch (error: any) {

        }
    }


    useEffect(() => {

    }, [])

    console.log(user)


    return (
        <div className="min-h-screen flex flex-col h-full">
            <Header label="Networking" subLabel="dengan Ariana Grande"/>

            <div className="flex flex-col-reverse items-center justify-center md:flex-row md:justify-evenly px-10 md:px-[60px] gap-8 md:gap-5 h-full py-10">
                <div className="w-full flex flex-col font-montserrat font-medium gap-5 items-center justify-center h-full">
                    <Input label="Pertanyaan wajib 1" placeholder="Jawaban" setValue={setAnswer1} icon={<HiChatAlt2 />}/>
                    <Input label="Pertanyaan wajib 2" placeholder="Jawaban" setValue={setAnswer2} icon={<HiChatAlt2 />}/>
                    <Input label="Pertanyaan random 1" placeholder="Jawaban" setValue={setAnswer3} icon={<HiChatAlt2 />}/>
                    <Input label="Pertanyaan random 2" placeholder="Jawaban" setValue={setAnswer4} icon={<HiChatAlt2 />}/>

                    <div className="flex mt-3">
                        <Button label="Kumpulkan" handleClick={() => {}}/>
                    </div>
                </div>

                <FileInput file={photo} setFile={setPhoto} label="Unggah foto networking" description="Ini deskripsi perlu diganti nanti"/>
            </div>
        </div>
    )
}

export default withAuth(NetworkingAssignmentPage, 'freshman');