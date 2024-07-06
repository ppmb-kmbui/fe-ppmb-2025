"use client"

import { ProgressBar } from "@/components";
import Image from "next/image";

const TugasPage: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col gap-10">
             <div className="bg-gradient-to-r from-ppmb-blue-600 to-ppmb-blue-400 w-full min-h-[95px] flex justify-between px-[60px] items-center">
                <text className="font-bold text-2xl font-crimson text-ppmb-000">
                    To Do PPMB KMBUI
                </text>

                <Image
                    src={require("../../../public/logo.svg")}
                    alt={"Logo"}
                    width={150}
                    height={70}
                />
            </div>

            <div className="flex flex-col items-center gap-3">
                <text className="font-crimson text-3xl">Progress Tugas</text>

                <div className="flex flex-col gap-1">
                    <ProgressBar />
                    <ProgressBar />
                    <ProgressBar />
                </div>
            </div>
        </div>
    )
}

export default TugasPage;