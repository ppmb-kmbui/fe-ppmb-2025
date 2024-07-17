"use client"

import { useState } from "react"
import { Accordion } from "../ui/Accordion"

export const Faq: React.FC = () => {
    const [selected, setSelected] = useState(-1);

    const FAQS = [
        {
          question: "Bagaimana cara untuk melakukan RSVP untuk suatu acara?",
          answer: "Desktop: Buka halaman beranda dan scroll hingga menemukan TIMELINE KEGIATAN. Kemudian, klik acara yang ingin dihadiri dan dibawah TIMELINE KEGIATAN pada penjelasan acara, klik tombol RSVP\nMobile: Buka halaman beranda dan klik RSVP pada box acara yang ingin dihadiri."
        },
        {
          question: "Bagaimana cara untuk melakukan networking sesama teman angkatan?",
          answer: " Buka halaman Cari Teman dan cari teman yang ingin dilakukan networking. Kemudian, setelah muncul teman yang ingin dilakukan networking, klik tombol Connect dan tunggu hingga teman yang satunya menerima permintaan untuk melakukan networking. Setelah sudah diterima, maka buka halaman Profile dan lakukan networking kepada teman kalian."
        },
        {
          question: "Bagaimana cara untuk mengumpulkan tugas dengan format PDF?",
          answer: "Buka halaman Tugas dan pilih submisi untuk tugas yang ingin dikumpulkan. Di halaman Tugas juga menyediakan template untuk pengumpulan tugas."
        },
    ]

    return (
        <div className='w-full flex flex-col items-center px-6 gap-1 md:gap-3'>
          <text className='text-2xl lg:text-6xl font-semibold text-ppmb-blue-600'>FAQ</text>

          <div className="flex flex-col gap-1 md:gap-2">
              {FAQS.map((data, key) => (
                  <Accordion key={key} question={data.question} answer={data.answer} selected={selected} setSelected={setSelected} value={key}/>
              ))}
          </div>
      </div>
    )
}