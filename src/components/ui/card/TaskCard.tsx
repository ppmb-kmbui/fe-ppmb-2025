import { HiDownload, HiLink, HiOutlineAcademicCap, HiOutlineCalendar, HiOutlineCursorClick, HiOutlineFolderOpen } from "react-icons/hi"
import { useDisclosure } from "react-use-disclosure"
import { Modal } from "@/components";
import { AssingmentProps } from "@/app/tugas/page";

interface TaskProps extends AssingmentProps {

}

export const TaskCard: React.FC<TaskProps> = ({
    id, name, description, deadline, icon, type, namingFormat, isFinished,
    template, vbg, rsvp
}) => {
    const { open, isOpen, close } = useDisclosure(false);

    // const handleSubmit = () => {
    //     switch (id) {
    //         case (""):
    //             console.log("hi");
    //             break
    //     }
    // }

    return (
        <div className="flex flex-col p-4 border-[1px] border-ppmb-200 w-full rounded-lg gap-2">
            <Modal
                isOpen={isOpen}
                onClose={close}
                type={type}
                label={`Kumpul berkas ${name}`}
                handleSubmit={() => {}}
                sublabel={namingFormat}
            />

            <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:justify-between">
                <div className="flex flex-row gap-2 md:gap-[10px] items-center">
                    <div className="flex p-[6px] bg-ppmb-blue-500 rounded-md md:text-[24px] text-ppmb-000 text-[16px]">
                        {icon}
                    </div>
                    <text className="font-semibold text-lg md:text-xl">{name}</text>
                </div>

                <div className="rounded-xl bg-ppmb-100 text-sm md:text-[16px] text-ppmb-800 px-3 gap-2 pr-3 flex flex-row py-1 items-center max-w-fit">
                    <HiOutlineCalendar />
                    <text className="font-medium">{deadline}</text>
                </div>
            </div>

            <div className="min-h-[1px] bg-ppmb-200 mt-[2px]"/>

            <div className="flex text-sm md:text-[16px]">
                <text>{description}</text>
            </div>

            <div className="flex justify-end gap-2 mt-2 lg:mt-3">
                { rsvp && 
                <a href={rsvp} target="_blank" rel="noopener noreferrer">
                    <button className="border-ppmb-700 font-medium border-[2px] flex gap-[6px] items-center text-ppmb-700 px-3 pl-[16px] py-[2px] text-sm rounded-lg">
                        <text>RSVP</text>
                        <HiOutlineCursorClick size={17}/>
                    </button> 
                </a>}

                { vbg && 
                <a href={vbg} target="_blank" rel="noopener noreferrer">
                    <button className="border-ppmb-700 font-medium border-[2px] flex gap-[6px] items-center text-ppmb-700 px-3 pl-[16px] py-[2px] text-sm rounded-lg">
                        <text>VBG</text>
                        <HiDownload />
                    </button> 
                </a>}

                { template && 
                <a href={template} target="_blank" rel="noopener noreferrer">
                    <button className="border-ppmb-700 font-medium border-[2px] flex gap-[6px] items-center text-ppmb-700 px-3 pl-[16px] py-[2px] text-sm rounded-lg">
                        <text>Template</text>
                        <HiDownload />
                    </button> 
                </a>}

                {/* <button className="border-ppmb-700 font-medium border-[2px] flex gap-[6px] items-center text-ppmb-700 px-3 pr-[16px] py-[2px] text-sm rounded-lg">
                    <HiOutlineFolderOpen size={20}/>
                    <text>Cek File</text>
                </button> */}

                {/* <button className="border-ppmb-700 font-medium border-[2px] flex gap-[6px] items-center text-ppmb-700 px-3 pr-[16px] py-[2px] text-sm rounded-lg">
                    <HiLink size={18} />
                    <text>Cek Link</text>
                </button> */}

                <button className="bg-ppmb-blue-500 flex gap-2 items-center text-ppmb-000 px-5 py-[2px] min-w-[80px] justify-center text-sm rounded-lg" onClick={open}>
                    <text>Submit</text>
                </button>

                {/* <button className="bg-ppmb-success flex gap-2 items-center text-ppmb-000 px-5 py-[2px] min-w-[80px] justify-center text-sm rounded-lg">
                    <text>Edit</text>
                </button> */}
           </div>
        </div>
    )
}