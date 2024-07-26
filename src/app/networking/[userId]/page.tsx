"use client"

import { Button, FileInput, Header, Input, LoadingScreen } from "@/components";
import { useAuth } from "@/context/AuthContext";
import withAuth from "@/hoc/withAuth";
import { api } from "@/utils/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { HiChatAlt2 } from "react-icons/hi";
import { z } from "zod";

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

const networkingFromSchema = z.object({
    answer1: z.string().min(1, { message: "Pertanyaan harus dijawab!" }),
    answer2: z.string().min(1, { message: "Pertanyaan harus dijawab!" }),
    answer3: z.string().min(1, { message: "Pertanyaan harus dijawab!" }),
    answer4: z.string().min(1, { message: "Pertanyaan harus dijawab!" }),
    photo: z.instanceof(File, { message: "Foto tidak boleh kosong!" })
})

const NetworkingAssignmentPage: React.FC<{ params: { userId: string } }> = ({ params: { userId } }) => {
    const { token } = useAuth();
    const router = useRouter();

    const [networkingAssignment, setNetworkingAssignment] = useState<NetworkingAssignmentProps>(DEFAULT_NETWORKING_ASSINGMENT);
    const [isFetching, setIsFetching] = useState<boolean>(true);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const { register, handleSubmit, formState: { errors }, reset, control } = useForm<z.infer<typeof networkingFromSchema>>({
        resolver: zodResolver(networkingFromSchema),
    })

    // console.log(token)

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
            console.log("Error while getting networking assignment");
        } finally {
            setIsFetching(false);
        }
    }

    const handleSubmitNetworking = async (data: z.infer<typeof networkingFromSchema>) => {
        try {
            setIsSubmitting(true);
            const form = new FormData();
            form.append('file', data.photo);
            form.append('upload_preset', 'ppmb_kmbui');
    
            const res = await axios.post(
                `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                form
            );
            const uploadedPhotoUrl = res.data.url;
            await api({
                url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/networking/${userId}`,
                method: "PUT",
                data: {
                    img_url: uploadedPhotoUrl,
                    answers: [
                        {
                            questionId: networkingAssignment.questions[0].questionId,
                            answer: data.answer1
                        },
                        {
                            questionId: networkingAssignment.questions[1].questionId,
                            answer: data.answer2
                        },
                        {
                            questionId: networkingAssignment.questions[2].questionId,
                            answer: data.answer3
                        },
                        {
                            questionId: networkingAssignment.questions[3].questionId,
                            answer: data.answer4
                        },
                    ]
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            reset();

        } catch (error: any) {
            console.error("Error while submitting assignment");
        } finally {
            setIsSubmitting(false);
            router.push('/networking');
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        isFetching ? <LoadingScreen /> :
        <div className="min-h-screen flex flex-col h-full">
            <Header label="Networking" />
            <div className="flex flex-col-reverse items-center justify-center md:flex-row md:justify-evenly px-10 md:px-[60px] gap-8 md:gap-5 h-full py-10">
                <form onSubmit={handleSubmit(handleSubmitNetworking)} className="w-full flex flex-col font-montserrat font-medium gap-5 items-center justify-center h-full">
                    <Input {...register("answer1")} label={networkingAssignment.questions[0].question.question} placeholder="Masukkan jawabanmu di sini" icon={<HiChatAlt2 />} error={errors.answer1?.message}/>
                    <Input {...register("answer2")} label={networkingAssignment.questions[1].question.question} placeholder="Masukkan jawabanmu di sini" icon={<HiChatAlt2 />} error={errors.answer2?.message}/>
                    <Input {...register("answer3")} label={networkingAssignment.questions[2].question.question} placeholder="Masukkan jawabanmu di sini" icon={<HiChatAlt2 />} error={errors.answer3?.message}/>
                    <Input {...register("answer4")} label={networkingAssignment.questions[3].question.question} placeholder="Masukkan jawabanmu di sini" icon={<HiChatAlt2 />} error={errors.answer4?.message}/>

                    <div className="flex mt-3">
                        <Button label="Kumpulkan" type="submit" size="lg" disabled={isSubmitting}/>
                    </div>
                </form>

                <Controller name="photo" control={control} render={({ field: { onChange, value } }) => (
                    <FileInput
                        file={value as File | null}
                        onChange={(file) => onChange(file)}
                        label="Unggah foto kamu"
                        description="Unggah dalam bentuk .jpg/.jpeg/.png"
                        fileType="image"
                        error={errors.photo?.message}
                    />
                )} />
            </div>
        </div>
    )
}

export default withAuth(NetworkingAssignmentPage, 'freshman');