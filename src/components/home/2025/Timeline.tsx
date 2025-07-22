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

import displayUkm from "@/assets/event-thumbnails/display-ukm.png";
import grandClosing from "@/assets/event-thumbnails/grand-closing.png";
import kelilingUi from "@/assets/event-thumbnails/keliling-ui.png";
import mainEvent from "@/assets/event-thumbnails/main-event.png";
import okkAndPsaf from "@/assets/event-thumbnails/okk-and-psaf.png";
import welmab from "@/assets/event-thumbnails/welmab.png";
import { StaticImageData } from "next/image";

export interface PPMBEventProps {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  img: StaticImageData;
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
      img: welmab,
      imgAlt: "Welcoming Mahasiswa Baru (WelMab)",
      location: "Zoom",
    },
    {
      name: "Keliling UI",
      description:
        "Mengenalkan lingkungan Universitas Indonesia (UI) kepada mahasiswa baru, termasuk fakultas dan sarana prasarana yang tersedia.",
      startDate: new Date(2025, 6, 30),
      endDate: new Date(2025, 6, 30),
      img: kelilingUi,
      imgAlt: "Keliling UI",
      location: "Universitas Indonesia",
    },
    {
      name: "Display UKM",
      description:
        "OKK UI menghadirkan kegiatan untuk memperkenalkan seluruh UKM yang ada di lingkungan Universitas Indonesia. KMBUI akan menyediakan booth dan menayangkan video profil kepada mahasiswa baru sebagai bentuk perkenalan pada kegiatan ini.",
      startDate: new Date(2025, 7),
      endDate: new Date(2025, 7),
      img: displayUkm,
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
      img: okkAndPsaf,
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
      img: mainEvent,
      imgAlt: "Main Event",
      location: "Online dan Offline",
    },
    {
      name: "Grand Closing",
      description:
        "Kegiatan terakhir yang diikuti oleh mahasiswa baru. Kegiatan akan diisi dengan sesi pembicara, bermain games, penampilan vlog seluruh grup mentoring, dan apresiasi.",
      startDate: new Date(2025, 8, 20),
      endDate: new Date(2025, 8, 20),
      img: grandClosing,
      imgAlt: "Grand Closing",
      location: "Universitas Indonesia",
    },
  ];

  return (
    <div className="z-40 flex w-full flex-col items-center gap-3 pt-20 lg:gap-5">
      <div className="flex items-center gap-1 text-3xl font-semibold md:text-4xl lg:gap-3 lg:text-6xl">
        <span className={`${title.className} text-h5 lg:text-h1 text-blue-300`}>
          TIMELINE
        </span>
        <span className={`${title.className} text-h5 lg:text-h1`}>
          KEGIATAN
        </span>
      </div>

      <div className="timeline scrollbar-hide relative my-5 hidden w-[90vw] overflow-y-visible lg:flex lg:flex-col">
        <div className="flex flex-col items-center">
          {PPMB_EVENTS.map((timeline, key) => (
            <TimelinePanel key={key} timeline={timeline} index={key} />
          ))}
        </div>
      </div>

      <div className="flex h-full flex-col items-start gap-y-2 px-8 lg:hidden">
        {PPMB_EVENTS.map((timeline, key) => (
          <div key={key} className="flex h-full w-full flex-row">
            <div
              className={`border-neutral-medium flex w-full flex-row justify-between rounded-lg border-[2px] p-4`}
            >
              <div className="flex w-full flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <p className="text-xl font-semibold">{timeline.name}</p>
                  <div className="flex">
                    <div className="from-ppmb-blue-800 to-ppmb-blue-600 text-ppmb-000 flex min-w-[110px] rounded-xl bg-gradient-to-r py-1 text-[10px] leading-[14px] font-medium">
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
                  <div className="mt-4 flex h-full">
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
                  <div className="mt-4 flex h-full">
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
