import { HiDownload, HiLink, HiOutlineAcademicCap, HiOutlineCalendar, HiOutlineFolderOpen } from "react-icons/hi"

interface TaskProps {
    name: string
    description: string
    deadline: string
    icon: React.ReactNode
    type?: string
}

export const TaskCard: React.FC<TaskProps> = ({
    name, description, deadline, icon, type
}) => {
    return (
        <div className="flex flex-col p-4 border-[1px] border-ppmb-200 w-[480px] rounded-lg gap-2">
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row gap-[10px] items-center">
                    <div className="flex p-[6px] bg-ppmb-blue-500 rounded-md text-[24px] text-ppmb-000">
                        {icon}
                    </div>
                    <text className="font-crimson text-2xl">{name}</text>
                </div>

                <div className="rounded-xl bg-ppmb-100 text-ppmb-800 px-3 gap-2 pr-3 flex flex-row text-sm py-1 items-center">
                    <HiOutlineCalendar size={16}/>
                    <text className="font-medium">{deadline}</text>
                </div>
            </div>

            <div className="min-h-[1px] bg-ppmb-200 mt-[2px]"/>

            <div className="flex">
                <text>{description}</text>
            </div>

            <div className="flex justify-end gap-2">
                <button className="border-ppmb-700 font-medium border-[2px] flex gap-[6px] items-center text-ppmb-700 px-3 pl-[16px] py-[2px] text-sm rounded-lg">
                    <text>Template</text>
                    <HiDownload />
                </button>

                {/* <button className="border-ppmb-700 font-medium border-[2px] flex gap-[6px] items-center text-ppmb-700 px-3 pr-[16px] py-[2px] text-sm rounded-lg">
                    <HiOutlineFolderOpen size={20}/>
                    <text>Cek File</text>
                </button> */}

                {/* <button className="border-ppmb-700 font-medium border-[2px] flex gap-[6px] items-center text-ppmb-700 px-3 pr-[16px] py-[2px] text-sm rounded-lg">
                    <HiLink size={18} />
                    <text>Cek Link</text>
                </button> */}

                <button className="bg-ppmb-blue-500 flex gap-2 items-center text-ppmb-000 px-5 py-[2px] min-w-[80px] justify-center text-sm rounded-lg">
                    <text>Submit</text>
                </button>

                {/* <button className="bg-ppmb-success flex gap-2 items-center text-ppmb-000 px-5 py-[2px] min-w-[80px] justify-center text-sm rounded-lg">
                    <text>Edit</text>
                </button> */}
           </div>
        </div>
    )
}