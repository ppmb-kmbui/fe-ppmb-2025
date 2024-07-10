"use client"

import { useState } from "react"
import { Accordion } from "../ui/Accordion"

export const Faq: React.FC = () => {
    const [selected, setSelected] = useState(-1);

    const DATA = [
        {
          question: "[PLACEHOLDER] Apakah nilai akan ditampilkan ke mahasiswa?",
          answer: "[PLACEHOLDER] Maaf, nilak tidak ditampilkan"
        },
        {
          question: "[PLACEHOLDER] Apakah nilai akan ditampilkan ke mahasiswa?",
          answer: "[PLACEHOLDER] Maaf, nilak tidak ditampilkan, Maaf, nilak tidak ditampilkan, Maaf, nilak tidak ditampilkan, Maaf, nilak tidak ditampilkan, Maaf, nilak tidak ditampilkan"
        },
        {
          question: "[PLACEHOLDER] Apakah nilai akan ditampilkan ke mahasiswa?",
          answer: "[PLACEHOLDER] Maaf, nilak tidak ditampilkan"
        },
    ]

    return (
        <div className='w-full flex flex-col items-center px- gap-3'>
        <text className='text-6xl font-semibold text-ppmb-blue-600'>FAQ</text>

        <div className="flex flex-col gap-2">
            {DATA.map((data, key) => (
                <Accordion key={key} question={data.question} answer={data.answer} selected={selected} setSelected={setSelected} value={key}/>
            ))}
        </div>

      </div>
    )
}