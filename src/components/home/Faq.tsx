"use client"

import { useState } from "react"
import { Accordion } from "../ui/Accordion"

export const Faq: React.FC = () => {
    const [selected, setSelected] = useState(-1);

    const FAQS = [
        {
          question: "Bagaimana cara melakukan RSVP acara?",
          answer: "Desktop: Buka halaman beranda dan scroll hingga menemukan TIMELINE KEGIATAN. Kemudian, klik acara yang ingin dihadiri dan dibawah TIMELINE KEGIATAN pada penjelasan acara, klik tombol RSVP\nMobile: Buka halaman beranda dan klik RSVP pada box acara yang ingin dihadiri."
        },
        {
          question: "Bagaimana cara networking dengan angkatan 2024?",
          answer: " Buka halaman Cari Teman dan cari teman yang ingin dilakukan networking. Kemudian, setelah muncul teman yang ingin dilakukan networking, klik tombol Connect dan tunggu hingga teman yang satunya menerima permintaan untuk melakukan networking. Setelah sudah diterima, maka buka halaman Profile dan lakukan networking kepada teman kalian."
        },
        {
          question: "Bagaimana cara mengumpulkan tugas berformat PDF?",
          answer: "Buka halaman Tugas dan pilih submisi untuk tugas yang ingin dikumpulkan. Di halaman Tugas juga menyediakan template untuk pengumpulan tugas."
        },
    ]

    return (
        <div className='w-full flex flex-col items-center px-6 gap-3 lg:gap-5 mt-3 mb-5 lg:mt-5 lg:mb-10'>
          <text className='text-3xl md:text-4xl lg:text-6xl font-semibold text-ppmb-blue-600'>FAQ</text>

          <div className="flex flex-col gap-1 md:gap-2">
              {FAQS.map((data, key) => (
                  <Accordion key={key} question={data.question} answer={data.answer} selected={selected} setSelected={setSelected} value={key}/>
              ))}
          </div>
      </div>
    )
}