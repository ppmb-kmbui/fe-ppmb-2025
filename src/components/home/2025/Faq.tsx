"use client";

import { ReactNode, useState } from "react";
import { Accordion } from "@/components/ui/Accordion";
import { title } from "@/styles/fonts";

interface FAQProps {
  question: string;
  answer: ReactNode;
  panelColor?: "yellow" | "turquoise" | "orange";
}

export const Faq: React.FC = () => {
  const [selected, setSelected] = useState(-1);

  const FAQS: FAQProps[] = [
    {
      question: "Bagaimana cara mendapatkan kontak angkatan atas?",
      answer: (
        <span>
          Halaman networking memungkinkan kamu untuk melihat nama semua anggota
          dari angkatan 2022-2024 yang ada di database KMBUI. Untuk mendapatkan
          kontak mereka, kamu bisa join grup Discord berikut:{" "}
          <a
            href="https://discord.gg/24YBy7gFJ9"
            className="text-blue-300 underline"
          >
            Grup Discord KMBUI
          </a>
        </span>
      ),
      panelColor: "yellow",
    },
    {
      question: "Bagaimana cara networking dengan angkatan 2025?",
      answer: (
        <p>
          Buka halaman Cari Teman dan cari teman yang ingin dilakukan
          networking. Kemudian, setelah muncul teman yang ingin dilakukan
          networking, klik tombol "Ikuti" dan tunggu hingga teman yang satunya
          menerima permintaan untuk melakukan networking. Setelah sudah
          diterima, maka buka halaman Networking dan laksanakan aktivitas
          networking dengan pasangan kamu',
        </p>
      ),
      panelColor: "turquoise",
    },
    {
      question:
        "Apa yang perlu dilakukan kalau lupa password akun PPMB Connect?",
      answer: (
        <p>
          Tim IT Dev sedang dalam proses membuat fitur reset password. Selama
          fitur tersebut belum ada, tolong kontak Thorbert (LINE ID: triplet-1)
          untuk instruksi lebih lanjut.
        </p>
      ),
      panelColor: "orange",
    },
  ];

  return (
    <div className="mt-5 mb-5 flex w-full flex-col items-center gap-3 px-6 lg:mt-16 lg:mb-10 lg:gap-5">
      <p
        className={`${title.className} text-3xl font-semibold md:text-4xl lg:text-6xl`}
      >
        <span className="text-blue-300">F</span>AQ
      </p>

      <div className="flex flex-col items-center gap-1 md:gap-2">
        {FAQS.map((data, key) => (
          <Accordion
            variant={data.panelColor}
            key={key}
            question={data.question}
            answer={data.answer}
            selected={selected}
            setSelected={setSelected}
            value={key}
          />
        ))}
      </div>
    </div>
  );
};
