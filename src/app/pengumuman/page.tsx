"use client";

import { AnnouncementCard, Background } from "@/components";
import withAuth from "@/hoc/withAuth";
import {
  AnnouncementCardProps,
  AnnouncementProps,
} from "@/components/ui/card/AnnouncementCard";

import bgCariTeman from "@/assets/background/bg-cari-teman.png";
import boyMascot from "@/assets/graphic-elements/mascot-boy.png";
import girlMascot from "@/assets/graphic-elements/mascot-girl.png";
import { title } from "@/styles/fonts";

const PengunmumanPage: React.FC = () => {
  const ANNOUNCEMENTS: AnnouncementProps[] = [
    {
      name: "Foster Sibling",
      description: "Klik bagian ini untuk meninjau kakak asuh KMBUI kamu",
      img: boyMascot,
      link: "https://docs.google.com/spreadsheets/d/1CR_04zmtDXdWlzxsPUX1KbHuIsSKrn89CL1oETmiZ6E/edit?gid=0#gid=0",
    },
    {
      name: "Networking dan Mentoring",
      description:
        "Klik bagian ini untuk meninjau kelompok networking dan kelompok mentoring",
      img: girlMascot,
      link: "https://docs.google.com/spreadsheets/d/1tm8bWRMi2QazZYgGNexEV-evIi3sZWqBrN-6PiNKewY/edit?gid=1391438748#gid=1391438748",
    },
    {
      name: "KMBUI Explorer",
      description:
        "Klik bagian ini untuk meninjau proker-porker KMBUI yang dapat diikuti sebagai penugasan KMBUI Explorer",
      img: boyMascot,
      link: "https://docs.google.com/document/d/1I7eoFBP4oDJHZV1HFaq-ZOycBzD4BsRcTrNNN_09dzg/edit",
    },
  ];

  const ANNOUNCEMENT_CARDS: AnnouncementCardProps[] = [
    { ...ANNOUNCEMENTS[0], color: "orange" },
    { ...ANNOUNCEMENTS[1], color: "blue" },
    { ...ANNOUNCEMENTS[2], color: "turquoise" },
  ];

  return (
    <div className="h-full w-full overflow-scroll">
      <Background image={bgCariTeman} />

      <div
        className={`flex h-fit flex-col items-center justify-center gap-y-5 py-5 lg:h-full`}
      >
        <h1
          className={`${title.className} text-h4 md:text-h2 font-semibold antialiased`}
        >
          Tugas-tugas <span className="text-blue-300">PPMB</span>
        </h1>
        <div className="flex w-3/4 flex-col gap-10 lg:flex-row">
          {ANNOUNCEMENT_CARDS.map((announcementCard, key) => (
            <AnnouncementCard key={key} {...announcementCard} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default withAuth(PengunmumanPage, "freshman");
