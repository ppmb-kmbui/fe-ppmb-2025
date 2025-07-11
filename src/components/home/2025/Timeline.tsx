"use client";

import { useState } from "react";
import "./style.css";
import { Button } from "@/components/ui/Button";
import { dateToIndonesianString } from "@/utils/date";
import { TbBrandZoom } from "react-icons/tb";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { title } from "@/styles/fonts";
import TimelinePanel from "./subcomponents/TimelinePanel";

export interface PPMBEventProps {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  img: string;
  imgAlt: string;
  monthLong?: boolean;
  location?: string;
  rsvp?: string;
  meetingUrl?: string;
}
export const Timeline: React.FC = () => {
  const { isAuthenticated } = useAuth();

  const PPMB_EVENTS: PPMBEventProps[] = [
    {
      name: "Welcoming Mahasiswa Baru (WelMab)",
      description:
        "Acara ini bertujuan untuk menyambut mahasiswa baru UI yang beragama Buddha, termasuk mengenalkan fakultas dan sarana prasarana yang tersedia.",
      startDate: new Date(2025, 6, 26),
      endDate: new Date(2025, 6, 26),
      img: "/event-thumbnails/welmab.png",
      imgAlt: "Welcoming Mahasiswa Baru (WelMab)",
      location: "Zoom",
    },
    {
      name: "Keliling UI",
      description:
        "Mengenalkan lingkungan Universitas Indonesia (UI) kepada mahasiswa baru, termasuk fakultas dan sarana prasarana yang tersedia.",
      startDate: new Date(2025, 6, 30),
      endDate: new Date(2025, 6, 30),
      img: "/event-thumbnails/keliling-ui.png",
      imgAlt: "Keliling UI",
      location: "Universitas Indonesia",
    },
    {
      name: "Display UKM",
      description:
        "OKK UI menghadirkan kegiatan untuk memperkenalkan seluruh UKM yang ada di lingkungan Universitas Indonesia. KMBUI akan menyediakan booth dan menayangkan video profil kepada mahasiswa baru sebagai bentuk perkenalan pada kegiatan ini.",
      startDate: new Date(2025, 7),
      endDate: new Date(2025, 7),
      img: "/event-thumbnails/display-ukm.png",
      imgAlt: "Display UKM",
      location: "Balairung UI",
      monthLong: true,
    },
    {
      name: "OKK UI & PSAF",
      description:
        "KMBUI akan menemani mahasiswa baru yang beragama Buddha saat sesi kerohanian. Salah satu bentuknya dengan menyediakan mentor yang akan mendampingi dan memberikan informasi kepada mahasiswa baru mengenai OKK UI.",
      startDate: new Date(2025, 7),
      endDate: new Date(2025, 7),
      img: "/event-thumbnails/okk-and-psaf.png",
      imgAlt: "OKK UI",
      location: "Universitas Indonesia",
      monthLong: true,
    },
    {
      name: "Main Event",
      description:
        "Mahasiswa baru akan mengikuti rangkaian kegiatan serta menyelesaikan tugas dari PPMB yang bertujuan untuk membekali mereka dengan pengetahuan dan keterampilan yang bermanfaat selama menjalani masa perkuliahan.",
      startDate: new Date(2025, 7, 1),
      endDate: new Date(2025, 8, 6),
      img: "/event-thumbnails/main-event.png",
      imgAlt: "Main Event",
      location: "Online dan Offline",
    },
    {
      name: "Grand Closing",
      description:
        "Kegiatan terakhir yang diikuti oleh mahasiswa baru. Kegiatan akan diisi dengan sesi pembicara, bermain games, penampilan vlog seluruh grup mentoring, dan apresiasi.",
      startDate: new Date(2025, 8, 20),
      endDate: new Date(2025, 8, 20),
      img: "/event-thumbnails/grand-closing.png",
      imgAlt: "Grand Closing",
      location: "Universitas Indonesia",
    },
  ];

  return (
    <div className="flex flex-col items-center gap-3 lg:gap-5 bg-linear-to-b from-transparent from-0% via-neutral-light via-[2%] to-white pt-20 -m-[2%] z-40">
      <div className="gap-1 lg:gap-3 flex text-3xl md:text-4xl lg:text-6xl font-semibold items-center">
        <span className={`${title.className} text-blue-300 text-h5 lg:text-h1`}>
          TIMELINE
        </span>
        <span className={`${title.className} text-h5 lg:text-h1`}>KEGIATAN</span>
      </div>

      <div className="hidden timeline relative lg:flex lg:flex-col overflow-y-visible w-[90vw] scrollbar-hide my-5">
        <div className="flex flex-col items-center">
          {PPMB_EVENTS.map((timeline, key) => (
            <TimelinePanel
              key={key}
              timeline={timeline}
              index={key}
            />
          ))}
        </div>
      </div>

      <div className="flex lg:hidden flex-col gap-y-2 h-full items-start px-8">
        {PPMB_EVENTS.map((timeline, key) => (
          <div key={key} className="flex w-full h-full flex-row">
            <div
              className={`p-4 flex flex-row justify-between w-full rounded-lg border-[2px] border-neutral-medium`}
            >
              <div className="w-full flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <p className="text-xl font-semibold">{timeline.name}</p>
                  <div className="flex">
                    <div className="bg-gradient-to-r from-ppmb-blue-800 to-ppmb-blue-600 rounded-xl py-1 text-[10px] leading-[14px] font-medium text-ppmb-000 min-w-[110px] flex">
                      {dateToIndonesianString(
                        timeline.startDate,
                        timeline.monthLong,
                      )}{" "}
                      {timeline.startDate.getTime() !==
                        timeline.endDate.getTime() &&
                        `- ${dateToIndonesianString(timeline.endDate)}`}
                    </div>
                  </div>
                </div>

                <div className="text-xs">{timeline.description}</div>

                {timeline.rsvp && (
                  <div className="flex h-full mt-4">
                    <div className="self-end">
                      <Link
                        href={timeline.rsvp as string}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          label="RSVP"
                          size="md"
                          isRestricted={!isAuthenticated}
                        />
                      </Link>
                    </div>
                  </div>
                )}

                {timeline.meetingUrl && (
                  <div className="flex h-full mt-4">
                    <div className="self-end">
                      <Link
                        href={timeline.meetingUrl as string}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          label="Zoom"
                          size="md"
                          leftIcon={<TbBrandZoom />}
                          isRestricted={!isAuthenticated}
                        />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
