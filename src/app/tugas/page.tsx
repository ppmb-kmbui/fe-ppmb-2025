"use client"

import { Header, LoadingScreen, MultiProgressBar, ProgressBar, TaskCard } from "@/components";
import { useAuth } from "@/context/AuthContext";
import withAuth from "@/hoc/withAuth";
import { api } from "@/utils/axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { HiOutlineChatAlt2, HiOutlineClipboardList, HiOutlineDocumentText, HiOutlineLightBulb, HiOutlineUsers } from "react-icons/hi";

interface ProgresDetailProps {
    progres: number
    min: number
}

interface ProgressDetailProps {
    progress: number
    min: number
}

interface ProgressRumpunProps {
    SAINTEK: ProgressDetailProps
    SOSHUM: ProgressDetailProps
    RIK_VOK: ProgressDetailProps
}

interface NetworkingAngkatanProgressProps {
    progress: ProgressRumpunProps
    min: number
}

interface NetworkingKatingProgressProps {
    2021: ProgresDetailProps
    2022: ProgresDetailProps
    2023: ProgresDetailProps
}

interface ProgressProps {
    networkingAngkatan: NetworkingAngkatanProgressProps
    networkingKating: NetworkingKatingProgressProps
    firstFossibDone: boolean
    secondFossibDone: boolean
    insightHuntingDone: boolean
    mentoringReflectionDone: boolean
    mentoringVlogDone: boolean
    kmbuiExplorerDone: boolean
}

export interface AssingmentProps {
    id: string
    name: string
    description: string
    deadline: string
    icon: React.ReactNode
    isFinished: boolean
    type: "pdf" | "input" | "image"
    namingFormat?: string
    template?: string
    rsvp?: string
    vbg?: string
}

const DEFAULT_PROGRESS: ProgressProps = {
    networkingAngkatan: {
        progress: {
            SAINTEK: { progress: 0, min: 0 },
            SOSHUM: { progress: 0, min: 0 },
            RIK_VOK: { progress: 0, min: 0 }
        },
        min: 0
    },
    networkingKating: {
        "2021": { progres: 0, min: 0 },
        "2022": { progres: 0, min: 0 },
        "2023": { progres: 0, min: 0 }
    },
    firstFossibDone: false,
    secondFossibDone: false,
    insightHuntingDone: false,
    mentoringReflectionDone: false,
    mentoringVlogDone: false,
    kmbuiExplorerDone: false
}

const TugasPage: React.FC = () => {
    const { token } = useAuth();

    const [progress, setProgress] = useState<ProgressProps>(DEFAULT_PROGRESS)
    const [isFetching, setIsFetching] = useState<boolean>(true);

    console.log(token);

    const getData = async () => {
        try {
            setIsFetching(true);
            const res = await api({
                url: 'api/tasks',
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setProgress(res.data)

        } catch (error: any) {
            console.error("Error while fetching assingment's progress")
        } finally {
            setIsFetching(false);
        }
    }

    useEffect(() => {
        getData();
    }, [])

    const DATA_PROGRESS = [
        {
            label: "Mentoring",
            currentProgress: progress.mentoringVlogDone && progress.mentoringReflectionDone ? 2 : progress.mentoringVlogDone || progress.mentoringReflectionDone ? 1 : 0,
            totalProgress: 2
        },
        {
            label: "Insight Hunting",
            currentProgress: progress.insightHuntingDone ? 1 : 0,
            totalProgress: 1
        },
        {
            label: "Foster Sibling",
            currentProgress: progress.firstFossibDone && progress.secondFossibDone ? 2 : progress.firstFossibDone || progress.secondFossibDone ? 1 : 0,
            totalProgress: 1
        },
        {
            label: "KMBUI Explorer",
            currentProgress: progress.kmbuiExplorerDone ? 1 : 0,
            totalProgress: 1
        },
    ]
      
    const ASSINGMENTS: AssingmentProps[] = [
        {
            id: "insight-hunting",
            name: "Insight Hunting",
            description: "Melalui Insight Hunting, diharapkan maba mendapatkan wawasan dari narasumber yang berpengalaman di beberapa kategori yang diminati.",
            deadline: "29/08/2024",
            icon: <HiOutlineLightBulb />,
            isFinished: progress.insightHuntingDone,
            namingFormat: "Nama Lengkap_Fakultas_FosterSibling2",
            type: "pdf",
            rsvp: "https://docs.google.com/forms/d/e/1FAIpQLScIHbDL7w-SaY_sDy-z7wabRaBLVKIRZ3CfwIQuJEuQD73S7Q/viewform",
            template: "https://docs.google.com/document/d/1Z3engQq3QwqyE2HjhTSxwxJchf2brPr7/edit",
            vbg: "https://drive.google.com/file/d/18QDIWk0txOuxGM6OvyFeOjTdo8urAyC6/view?usp=drive_link"
        },
        {
            id: "fossib-1",
            name: "Fossib: Sharing Insight",
            description: "Maba dan kakak asuh melakukan sharing bersama untuk dapat saling mengenal dan bertukar wawasan mengenai kehidupan perkuliahan.",
            deadline: "29/08/2024",
            icon: <HiOutlineUsers />,
            isFinished: progress.firstFossibDone,
            namingFormat: "Nama Lengkap_Fakultas_FosterSibling1",
            type: "pdf",
            template: "https://drive.google.com/drive/folders/1nai7H4PCZplp8qaP7VFqF90TEOwnWSly"
        },
        {
            id: "fossib-2",
            name: "Fossib: Fun Activity",
            description: "Setelah sharing insight, maba dan kakak asuh melakukan kegiatan bersama untuk dapat saling mendekatkan diri.",
            deadline: "29/08/2024",
            icon: <HiOutlineUsers />,
            isFinished: progress.secondFossibDone,
            namingFormat: "Nama Lengkap_Fakultas_FosterSibling2",
            type: "pdf",
        },
        {
            id: "networking-2023",
            name: "Networking Kating 2023",
            description: "Maba bersama teman satu kelompok networking menjalin relasi dengan kakak tingkat KMBUI angkatan 2023.",
            deadline: "31/08/2024",
            icon: <HiOutlineChatAlt2 />,
            isFinished: progress.networkingKating["2023"].progres >= progress.networkingKating["2023"].min,
            namingFormat: "[Nama Lengkap]_[Fakultas]_Networking2023_[nomor].pdf",
            type: "pdf",
            template: "https://docs.google.com/document/d/1lZgM33u7c1GUpFVZYDBeZWrPQjzvaDyPwwJYrnz-VB4/edit"
        },
        {
            id: "networking-2022",
            name: "Networking Kating 2022",
            description: "Maba bersama teman satu kelompok networking menjalin relasi dengan kakak tingkat KMBUI angkatan 2022.",
            deadline: "31/08/2024",
            icon: <HiOutlineChatAlt2 />,
            isFinished:  progress.networkingKating["2022"].progres >= progress.networkingKating["2022"].min,
            namingFormat: "[Nama Lengkap]_[Fakultas]_Networking2022_[nomor].pdf",
            type: "pdf",
            template: "https://docs.google.com/document/d/1lZgM33u7c1GUpFVZYDBeZWrPQjzvaDyPwwJYrnz-VB4/edit"
        },
        {
            id: "networking-2021",
            name: "Networking Kating 2021",
            description: "Maba bersama teman satu kelompok networking menjalin relasi dengan kakak tingkat KMBUI angkatan 2021.",
            deadline: "31/08/2024",
            icon: <HiOutlineChatAlt2 />,
            isFinished: progress.networkingKating["2021"].progres >= progress.networkingKating["2021"].min,
            namingFormat: "[Nama Lengkap]_[Fakultas]_Networking2021_[nomor].pdf",
            type: "pdf",
            template: "https://docs.google.com/document/d/1lZgM33u7c1GUpFVZYDBeZWrPQjzvaDyPwwJYrnz-VB4/edit"
        },
        {
            id: "mentoring-sr",
            name: "Mentoring: Self Reflection",
            description: "Setelah tiap sesi mentoring, maba diharapkan dapat menulis rangkuman intisari dari kegiatan yang dilakukan sesuai kreativitas masing-masing.",
            deadline: "11/09/2024",
            icon: <HiOutlineDocumentText />,
            isFinished: progress.mentoringReflectionDone,
            namingFormat: "[Nama Lengkap]_[Fakultas]_SelfReflection",
            type: "pdf",
            template: "https://www.canva.com/design/DAGKvoTzibg/xWWM0zwn6hPYRy5qN0hX6A/view?utm_content=DAGKvoTzibg&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink&mode=preview"
        },
        {
            id: "mentoring-v",
            name: "Mentoring: Vlog",
            description: "Vlog berisi  cuplikan kegiatan selama mentoring dengan durasi maksimal 3 menit, dikumpulkan oleh ketua kelompok.",
            deadline: "11/09/2024",
            icon: <HiOutlineDocumentText />,
            isFinished: progress.mentoringVlogDone,
            type: "input",
        },
        {
            id: "kmbui-explorer",
            name: "KMBUI Explorer",
            description: "Maba mengikuti paling sedikit 2 proker yang diadakan oleh KMBUI agar lebih mengenali KMBUI dan nilai-nilai Buddhis.",
            deadline: "11/09/2024",
            icon: <HiOutlineUsers />,
            isFinished: progress.kmbuiExplorerDone,
            namingFormat: "[Nama Lengkap]_[Fakultas]_KMBUIExplorer",
            type: "pdf",
            template: "https://drive.google.com/file/d/1YlWD1fHyxUPzCd0f2qRbHaOKNBvelWol/view"
        },
    ]

    const PROGRESS_ANGKATAN = [
        {
          name: "2021",
          progres: progress.networkingKating["2021"].progres,
          min: progress.networkingKating["2021"].min,
        },
        {
          name: "2022",
          progres: progress.networkingKating["2022"].progres,
          min: progress.networkingKating["2022"].min,
        },
        {
          name: "2023",
          progres: progress.networkingKating["2023"].progres,
          min: progress.networkingKating["2023"].min,
        },
        {
          name: "2024",
          progres:
            progress.networkingAngkatan.progress.SAINTEK.progress +
            progress.networkingAngkatan.progress.SOSHUM.progress +
            progress.networkingAngkatan.progress.RIK_VOK.progress,
          min: progress.networkingAngkatan.min,
        },
      ];
      
      const PROGRESS_RUMPUN = [
        {
          name: "SAINTEK",
          progres: progress.networkingAngkatan.progress.SAINTEK.progress,
          min: progress.networkingAngkatan.progress.SAINTEK.min,
        },
        {
          name: "SOSHUM",
          progres: progress.networkingAngkatan.progress.SOSHUM.progress,
          min: progress.networkingAngkatan.progress.SOSHUM.min,
        },
        {
          name: "RIK_VOK",
          progres: progress.networkingAngkatan.progress.RIK_VOK.progress,
          min: progress.networkingAngkatan.progress.RIK_VOK.min,
        },
    ];
    
    // console.log(progress);
    // console.log("ini rimpun", PROGRESS_RUMPUN);
    // console.log("ini angkatan", PROGRESS_ANGKATAN);
    // console.log(ASSINGMENTS)

    return (
        isFetching ? <LoadingScreen /> : 
        <div className="min-h-screen flex flex-col gap-5 lg:gap-10">
            <Header label="Tugas" subLabel="PPMB KMBUI"/>

            <div className="flex flex-col items-center gap-3">
                <text className="text-2xl lg:text-3xl font-semibold">Progress Tugas</text>

                <div className="flex flex-col gap-2 items-center">
                <MultiProgressBar
                    progressData={PROGRESS_ANGKATAN}
                    networkingRumpun={PROGRESS_RUMPUN}
                />

                    {DATA_PROGRESS.map((data, key) => (
                        <ProgressBar key={key} {...data}/>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 px-8 lg:px-[60px] xl:px-[80px] gap-10 lg:gap-[80px] mt-5 pb-10">
                <div className="flex flex-col gap-2">
                    <text className="text-2xl lg:text-[27px] lg:leading-[1.6] font-semibold">Belum Dikerjakan</text>

                    <div className="flex flex-col gap-5 w-full">
                        {ASSINGMENTS.map((assignment, key) => (
                            <div className={`${assignment.isFinished == true && "hidden"}`}>
                                <TaskCard key={key} {...assignment}/>
                            </div>
                        ))}
                    </div>
                    <text className={`${ASSINGMENTS.filter(assignment => !assignment.isFinished).length != 0 && "hidden"} text-ppmb-500 italic text-lg`}>Kamu belum menyelesaikan tugas apa pun :(</text>
                </div>

                <div className="flex flex-col gap-2 w-full">
                    <text className="text-2xl lg:text-[27px] lg:leading-[1.6] font-semibold">Sudah Dikumpulkan</text>
                    <div className="flex flex-col gap-5">
                        {ASSINGMENTS.map((assingment, key) => (
                            <div className={`${assingment.isFinished == false && "hidden"}`}>
                                <TaskCard key={key} {...assingment}/>
                            </div>
                        ))}
                    </div>
                    <text className={`${ASSINGMENTS.filter(assignment => assignment.isFinished).length > 0 && "hidden"} text-ppmb-500 italic text-lg`}>Kamu belum menyelesaikan tugas apa pun :(</text>
                </div>
            </div>
        </div>
    )
}

export default withAuth(TugasPage, 'freshman');