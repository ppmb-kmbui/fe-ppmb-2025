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

                <div>
                    {attendances.map((attendance, key) => (
                        <div key={key}>
                            hiii
                        </div>
                    ))}
                </div>

                <text className={`${attendances.length == 0 ? "flex" : "hidden"} text-lg italic w-full text-ppmb-500`}>Anda belum pernah membuat kode absensi :(</text>
                



            </div>

            {/* <div className="flex flex-row gap-7">
                <div c lassName="bg-white flex w-[25%] p-6 rounded-lg h-[300px] border-[1px] border-ppmb-100">
                    <div className="flex flex-col w-full">
                        <div className="flex flex-row justify-between items-center">
                            <text className="text-xl font-medium">Kode absen</text>
                            <Button handleClick={() => {}} label="Buat"/>
                        </div>

                        <div className="flex items-center justify-center h-full">
                            <text className="text-5xl font-semibold ">AI37#MP9</text>
                        </div>

                        <Button handleClick={() => {}} label="Salin" type="secondary"/>
                    </div>
                </div>
 
                <div className="bg-white flex w-[75%] rounded-lg h-[300px] overflow-y-auto border-[1px] border-ppmb-100">
                    <div className="flex flex-col w-full">
                    <div className="sticky top-0 z-10 px-6 pt-6 pb-4 flex bg-white">
                            <text className="text-xl font-medium">Kelola event PPMB</text>
                        </div>

                        <div className="px-6">
                            {TIMELINES.map((data, key) => (
                                <div className="grid grid-cols-11 py-2 gap-2">
                                    <div className="col-span-2">
                                        <text>{data.name}</text>
                                    </div>

                                    <div className="col-span-4">
                                        <text>{data.description}</text>
                                    </div>

                                    <div className="col-span-2">
                                        <text>{data.date}</text>
                                    </div>

                                    <div className="col-span-2">
                                        <text>{data.image}</text>
                                    </div>

                                    <div className="col-span-1">
                                        <button className="bg-ppmb-blue-500 p-[6px] rounded-md text-ppmb-000 mr-1"><HiOutlinePencil size={18}/></button>
                                        <button className="bg-ppmb-red-500 p-[6px] rounded-md text-ppmb-000"><HiOutlineTrash size={18}/></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div> */}
            {/* </div> */}

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