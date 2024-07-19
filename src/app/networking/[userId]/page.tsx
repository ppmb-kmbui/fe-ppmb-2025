"use client"

import { Button, FileInput, Header, Input, LoadingScreen } from "@/components";
import { useAuth } from "@/context/AuthContext";
import withAuth from "@/hoc/withAuth";
import { api } from "@/utils/axios";
import axios from "axios";
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

const DEFAULT_NETWORKING_ASSINGMENT: NetworkingAssignmentProps = {
    fromId: -1,
    toId: -2,
    is_done: false,
    questions: [
        {
            questionId: -1,
            fromId: -1,
            toId: -2,
            answer: "",
            question: {
                id: -1,
                question: "",
                created_at: "",
                updated_at: "",
                is_mandatory: true
            }
        },
        {
            questionId: -2,
            fromId: -1,
            toId: -2,
            answer: "",
            question: {
                id: -2,
                question: "",
                created_at: "",
                updated_at: "",
                is_mandatory: true
            }
        },
        {
            questionId: -3,
            fromId: -1,
            toId: -2,
            answer: "",
            question: {
                id: -3,
                question: "",
                created_at: "",
                updated_at: "",
                is_mandatory: false
            }
        },
        {
            questionId: -4,
            fromId: -1,
            toId: -2,
            answer: "",
            question: {
                id: -4,
                question: "",
                created_at: "",
                updated_at: "",
                is_mandatory: false
            }
        }
    ]
}

const NetworkingAssignmentPage: React.FC<{ params: { userId: string } }> = ({ params: { userId } }) => {
    const [networkingAssignment, setNetworkingAssignment] = useState<NetworkingAssignmentProps>(DEFAULT_NETWORKING_ASSINGMENT);
    const [answer1, setAnswer1] = useState<string>(""); 
    const [answer2, setAnswer2] = useState<string>(""); 
    const [answer3, setAnswer3] = useState<string>(""); 
    const [answer4, setAnswer4] = useState<string>("");
    const [photo, setPhoto] = useState<File | null>(null);
    const [photoUrl, setPhotoUrl] = useState<string>("");

    const [isFetching, setIsFetching] = useState<boolean>(true);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const { user, token } = useAuth();

    const getData = async () => {
        try {
            setIsFetching(true);
            const res = await api({
                url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/networking/${userId}`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            setNetworkingAssignment(res.data);
            console.log(res, "ini res");
        } catch (error: any) {
            console.log("Error while getting networking assingment")
        } finally {
            setIsFetching(false);
        }
    }

    const handleSubmit = async () => {
        // Formality
        if (!photo) {
            console.error('No photo selected.');
            return;
        }

        try {
            setIsSubmitting(true);
            const form = new FormData();
            form.append('file', photo);
            form.append('upload_preset', 'ppmb_kmbui');
    
            const res = await axios.post(
                `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                form
            );

            await setPhotoUrl(res.data.url);
            await api({
                url: `${process.env.NEXT_PUBLIC_BASE_URL}/networking/${userId}}`,
                method: "PUT",
                data: {
                    // TODO: ask be to update 
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

        } catch (error: any) {
            console.error("Error while submitting assignment")
        } finally {
            setIsSubmitting(false);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        isFetching ? <LoadingScreen /> :
            <div className="min-h-screen flex flex-col h-full">
                <Header label="Networking" subLabel={``}/>
                <div className="flex flex-col-reverse items-center justify-center md:flex-row md:justify-evenly px-10 md:px-[60px] gap-8 md:gap-5 h-full py-10">
                    <div className="w-full flex flex-col font-montserrat font-medium gap-5 items-center justify-center h-full">
                        <Input label={networkingAssignment.questions[0].question.question} placeholder="Jawaban" setValue={setAnswer1} icon={<HiChatAlt2 />}/>
                        <Input label={networkingAssignment.questions[1].question.question} placeholder="Jawaban" setValue={setAnswer2} icon={<HiChatAlt2 />}/>
                        <Input label={networkingAssignment.questions[2].question.question} placeholder="Jawaban" setValue={setAnswer3} icon={<HiChatAlt2 />}/>
                        <Input label={networkingAssignment.questions[3].question.question} placeholder="Jawaban" setValue={setAnswer4} icon={<HiChatAlt2 />}/>

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