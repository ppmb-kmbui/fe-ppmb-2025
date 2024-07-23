"use client"

import { Button, Dropdown } from "@/components";
import { useAuth } from "@/context/AuthContext";
import withAuth from "@/hoc/withAuth";
import { api } from "@/utils/axios";
import { generateAttendanceCode } from "@/utils/stringUtils";
import { useEffect, useState } from "react";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";

interface AttendanceProps {
    id: number
    name: string
    code: string
    expires_in: number
    created_at: string
    updated_at: string
}

const AdminPage: React.FC = () => {
    const { token } = useAuth();
    const [isFetching, setIsFetching] = useState<boolean>(true);
    const [isGenerating, setIsGenerating] = useState<boolean>(false);
    const [attendances, setAttendances] = useState<AttendanceProps[]>([]);

    const getData = async () => {
        try {
            setIsFetching(true);
            const res = await api({
                url: "api/admin/attendance",
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setAttendances(res.data);

        } catch (error: any) {

        } finally {
            setIsFetching(false);
        }
    }

    const generateAttendance = async () => {
        try {
            const res = await api({
                url: "api/admin/attendance",
                method: "POST",
                data: {
                    code: generateAttendanceCode(),
                    expires_in: 86400
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setAttendances(oldAttendances => [...oldAttendances, res.data])

        } catch (error: any) {
            console.error("Error while generating attendance code", error)
        } finally {
            
        }
    }

    // console.log(attendances);
    
    useEffect(() => {
        getData();
    }, [])

    return (
        <div className="min-h-screen p-10 gap-10 flex-col flex">
            <div className="flex flex-col">
                <div className="flex flex-row justify-between items-center">
                    <text className="text-[27px] leading-[1.6] font-semibold">Absensi PPMB</text>
                    <Button label="Buat Absensi" handleClick={generateAttendance}/>
                </div>

                <div className="grid grid-cols-2 md:flex md:flex-row md:overflow-x-auto md:max-w-[84vw] lg:max-w-[89vw] items-center gap-5 scrollbar-hide py-3 pr-3">
                    {attendances.map((attendance, key) => (
                        <div key={key} className="bg-white rounded-xl p-5 min-w-[340px] h-[230px] shadow-custom">
                            <div className="flex flex-col h-full">
                                <text className="text-xl font-medium">{attendance.name}</text>

                                <div className="flex items-center justify-center flex-1">
                                    <text className="text-5xl font-semibold ">{attendance.code}</text>
                                </div>

                                <div className="flex flex-row gap-2">
                                    {/* TODO: implement dynamic style, add w-full */}
                                    <Button label="Salin" handleClick={() => {}} />
                                    <button className="text-ppmb-red-500 border-[2px] border-ppmb-red-500 rounded-md p-2 hover:bg-ppmb-red-100"><HiOutlineTrash size={20}/></button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <text className={`${attendances.length == 0 ? "flex" : "hidden"} text-lg italic w-full text-ppmb-500`}>Anda belum pernah membuat kode absensi :(</text>
            </div>

            <div className="bg-white flex w-full rounded-lg h-[300px] p-5 overflow-y-auto border-[1px] border-ppmb-100">
                {/* <Dropdown dropdownValue=/> */}
                <div className="flex flex-row justify-center w-full">
                    <div className="flex self-start justify-start w-full">Dropdown here</div>
                    <div className="w-full flex flex-row gap-3">
                        <div>chip here</div>
                        <div>chip here</div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default withAuth(AdminPage, 'admin');