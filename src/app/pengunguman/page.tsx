"use client"

import { Header } from "@/components";
import withAuth from "@/hoc/withAuth";

interface AnnouncementProps {
    name: string
    description: string
    img: string
    link: string
}

const PengungumanPage: React.FC = () => {
    const ANNOUNCEMENTS: AnnouncementProps[] = [
        {
            name: "Foster Sibling",
            description: "Lorem ipsum",
            img: "",
            link: "https://docs.google.com/spreadsheets/d/1CR_04zmtDXdWlzxsPUX1KbHuIsSKrn89CL1oETmiZ6E/edit?gid=0#gid=0"
        },
        {
            name: "Networking dan Mentoring",
            description: "Lorem ipsum",
            img: "",
            link: "https://docs.google.com/spreadsheets/d/1tm8bWRMi2QazZYgGNexEV-evIi3sZWqBrN-6PiNKewY/edit?gid=1391438748#gid=1391438748"
        },
        {
            name: "KMBUI Explorer",
            description: "Lorem ipsum",
            img: "",
            link: "https://docs.google.com/document/d/1I7eoFBP4oDJHZV1HFaq-ZOycBzD4BsRcTrNNN_09dzg/edit"
        }
    ]
    return (
        <div className="flex flex-col gap-10">
            <Header label="Pengunguman"/>

            <div className="flex px-14 flex-col gap-10">
                <text className="text-[27px] leading-[1.6] font-semibold">Tautan menuju informasi beberapa tugas PPMB</text>

                <div className="flex flex-row">
                    {ANNOUNCEMENTS.map((announcement, key) => (
                        <div>tes</div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default withAuth(PengungumanPage, "freshman");