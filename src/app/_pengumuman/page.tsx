"use client";

import { AnnouncementCard } from "@/components";
import withAuth from "@/hoc/withAuth";

export interface AnnouncementProps {
  name: string;
  description: string;
  img: string;
  link: string;
}

const PengunmumanPage: React.FC = () => {
  const ANNOUNCEMENTS: AnnouncementProps[] = [
    {
      name: "Foster Sibling",
      description: "Klik bagian ini untuk meninjau kakak asuh KMBUI kamu",
      img: "/image/boy.png",
      link: "https://docs.google.com/spreadsheets/d/1CR_04zmtDXdWlzxsPUX1KbHuIsSKrn89CL1oETmiZ6E/edit?gid=0#gid=0",
    },
    {
      name: "Networking dan Mentoring",
      description:
        "Klik bagian ini untuk meninjau kelompok networking dan kelompok mentoring",
      img: "/image/girl.png",
      link: "https://docs.google.com/spreadsheets/d/1tm8bWRMi2QazZYgGNexEV-evIi3sZWqBrN-6PiNKewY/edit?gid=1391438748#gid=1391438748",
    },
    {
      name: "KMBUI Explorer",
      description:
        "Klik bagian ini untuk meninjau proker-porker KMBUI yang dapat diikuti sebagai penugasan KMBUI Explorer",
      img: "/image/boy.png",
      link: "https://docs.google.com/document/d/1I7eoFBP4oDJHZV1HFaq-ZOycBzD4BsRcTrNNN_09dzg/edit",
    },
  ];
  return (
    <div className="flex min-h-screen flex-col gap-10 pb-10">
      {/* <Header label="Pengumuman" /> */}

      <div className="flex flex-1 flex-col gap-4 px-10 md:px-14">
        <p className="text-2xl leading-[1.6] font-semibold md:text-[27px]">
          Tautan menuju informasi beberapa tugas PPMB
        </p>

        <div className="flex flex-1 flex-col gap-10 lg:flex-row">
          {ANNOUNCEMENTS.map((announcement, key) => (
            <AnnouncementCard key={key} {...announcement} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default withAuth(PengunmumanPage, "freshman");
