"use client"

import { Button, Dropdown } from "@/components";
import withAuth from "@/hoc/withAuth";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";

const AdminPage: React.FC = () => {
    const TIMELINES = [
        { date: "1 Jan 2024", name: "Waisak KMBUI", description: "Lorem ipsum, test this is dummy desc", image: "link dumi" },
        { date: "1 Jan 2024", name: "Waisak", description: "Lorem ipsum, test this is dummy desc", image: "link dumi" },
        { date: "1 Jan 2024", name: "Grand Opening PPMB", description: "Lorem ipsum, test this is dummy desc", image: "link dumi" },
        { date: "1 Jan 2024", name: "Waisak", description: "Lorem ipsum, test this is dummy desc", image: "link dumi" },
        { date: "1 Jan 2024", name: "Waisak", description: "Lorem ipsum, test this is dummy desc", image: "link dumi" },
        { date: "1 Jan 2024", name: "Waisak", description: "Lorem ipsum, test this is dummy desc", image: "link dumi" },
        { date: "1 Jan 2024", name: "Waisak", description: "Lorem ipsum, test this is dummy desc", image: "link dumi" },
    ];

    
    return (
        <div className="min-h-screen p-10 gap-7 flex-col flex">
            <div className="flex flex-row gap-7">
                <div className="bg-white flex w-[25%] p-6 rounded-lg h-[300px] border-[1px] border-ppmb-100">
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
                </div>
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