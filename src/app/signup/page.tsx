"use client"

import { Button, Dropdown, FileInput, Input } from "@/components";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { FaFolderOpen, FaK } from "react-icons/fa6";
import { HiAcademicCap, HiLockClosed, HiLockOpen, HiMail, HiUser } from "react-icons/hi";

const SignupPage: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [faculty, setFaculty] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [repassword, setRepassword] = useState<string>("");
    const [photo, setPhoto] = useState<File | null>(null);

    const router = useRouter();

    const FAKULTAS = [
        { display: "Fakultas Farmasi", value: "ff" },
        { display: "Fakultas Hukum", value: "fh" },
        { display: "Fakultas Ilmu Administrasi", value: "fia" },
        { display: "Fakultas Ilmu Pengetahuan Budaya", value: "fib" },
        { display: "Fakultas Ekonomi dan Bismis", value: "feb" },
        { display: "Fakultas Ilmu Keperawatan", value: "fik" },
        { display: "Fakultas Ilmu Komputer", value: "fasilkom" },
        { display: "Fakultas Ilmu Sosial dan Ilmu Politik", value: "fisip" },
        { display: "Fakultas Kedokteran", value: "fk" },
        { display: "Fakultas Kedokteran Gigi", value: "fkg" },
        { display: "Fakultas Kesehatan Masyarakat", value: "fkm" },
        { display: "Fakultas Matematika dan Ilmu Pengetahuan Alam", value: "fmipa" },
        { display: "Fakultas Psikologi", value: "fpsi" },
        { display: "Fakultas Teknik", value: "ft" },
        { display: "Program Pendidikan Vokasi", value: "vokasi"  }
    ]

    return (
        <div className="h-screen flex flex-col">
            <div className="bg-gradient-to-r from-ppmb-blue-600 to-ppmb-blue-400 w-full min-h-[95px] flex justify-between px-[60px] items-center">
                <text className="font-semibold text-[21px] leading-[1.8] text-ppmb-000">
                    Buat Akun PPMB KMBUI 2024
                </text>

                <Image 
                    src={require("../../../public/logo.svg")}
                    alt={"Logo"}
                    width={150}
                    height={70}
                />
            </div>

            <div className="flex flex-row justify-evenly px-[60px] gap-5 h-full">
                <div className="w-full flex flex-col font-montserrat font-medium gap-5 items-center justify-center h-full">
                    <Input label="Email" placeholder="Kocite" setValue={setEmail} icon={<HiMail />}/>
                    <Input label="Nama Lengkap" placeholder="Koko Cici Teman-teman" setValue={setName} icon={<HiUser />}/>

                    <Dropdown options={FAKULTAS} dropdownValue={faculty} setDropdownValue={setFaculty} label="Fakultas" icon={<HiAcademicCap />}/>

                    <div className="flex flex-row gap-5 w-full">
                        <Input label="Password" placeholder="password" setValue={setPassword} icon={<HiLockOpen />}/>
                        <Input label="Konfirmasi Password" placeholder="password" setValue={setRepassword} icon={<HiLockClosed />}/>
                    </div>
                  
                    <div className="flex items-center flex-col gap-2 mt-3">
                        <Button label="Buat Akun" handleClick={() => {}} variant="lg"/>
                        <span className="font-medium">Sudah memiliki akun? <span className="text-ppmb-blue-500 font-semibold hover:text-ppmb-blue-700 cursor-pointer" onClick={() => router.push("/login")}>Login</span></span>
                    </div>               
                </div>

                <FileInput file={photo} setFile={setPhoto} label="Unggah foto kamu" description="Ini deskripsi nanti diubah ya"/>
            </div>
        </div>
    )
}

export default SignupPage;