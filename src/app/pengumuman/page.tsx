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
import mascot from "@/assets/graphic-elements/mascot.svg";
import { title } from "@/styles/fonts";

const PengumumanPage: React.FC = () => {
  const ANNOUNCEMENTS: AnnouncementProps[] = [
    {
      name: "Foster Sibling",
      description: "Klik bagian ini untuk meninjau kakak asuh KMBUI kamu",
      img: boyMascot,
      link: "https://docs.google.com/spreadsheets/d/1_TJn7m-jID4p8UDL0_fR9xKTRYu65RwZcQ--bu3y1BI/edit?usp=sharing",
    },
    {
      name: "Networking dan Mentoring",
      description:
        "Klik bagian ini untuk meninjau kelompok networking dan kelompok mentoring",
      img: girlMascot,
      link: "https://docs.google.com/spreadsheets/d/1-ljQP327ISrY_ObclJHw1h-lLz4qsHijyEfSVx9cbug/edit?usp=sharing",
    },
    {
      name: "KMBUI Explorer",
      description:
        "Klik bagian ini untuk meninjau program kerja KMBUI yang dapat diikuti sebagai penugasan KMBUI Explorer",
      img: mascot,
      link: "https://docs.google.com/document/d/1l4NWVkZd4JhdOOPwO1OD_7qfK1WjcMkt4Hy3G9XwCTU/edit?usp=sharing",
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

export default withAuth(PengumumanPage, "freshman");
