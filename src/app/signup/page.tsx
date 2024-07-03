"use client"

import { Button, Dropdown, Input } from "@/components";
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
    const inputRef = useRef<HTMLInputElement>(null);

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

    const onChooseFile = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    }

    const openPhoto = () => {
        if (photo) {
            const fileURL = URL.createObjectURL(photo);
            window.open(fileURL, '_blank');
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }

    const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        const file = event.dataTransfer.files?.[0]
        setPhoto(file || null)
    }, []);

    return (
        <div className="h-screen flex flex-col">
            <div className="bg-gradient-to-r from-ppmb-blue-600 to-ppmb-blue-400 w-full min-h-[95px] flex justify-between px-[60px] items-center">
                <text className="font-bold text-2xl font-crimson text-ppmb-000">
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
                  
                    <div className="flex items-center flex-col gap-2 mt-2">
                        <Button label="Buat Akun" handleClick={() => {}}/>
                        <span className="font-medium">Sudah memiliki akun? <span className="text-ppmb-blue-500 font-semibold hover:text-ppmb-blue-700 cursor-pointer" onClick={() => router.push("/login")}>Login</span></span>
                    </div>               
                </div>

                <div className="w-full flex flex-col gap-7 items-center justify-center">
                    <div className="flex flex-col items-center justify-center">
                        <text className="font-semibold text-2xl">Unggah foto kamu</text>
                        <text className="text-sm text-ppmb-600">pastikan jenis file yang diunggah berbentuk .jpg</text>
                    </div>
                  
                    <div className="border-dashed border-ppmb-600 border-[2px] px-7 justify-between rounded-lg w-[450px] h-[300px] pt-14 pb-10 flex flex-col items-center gap-6" onDrop={handleDrop} onDragOver={handleDragOver}>
                        <FaFolderOpen size={95} className="text-ppmb-blue-600"/>

                        <div className={`${photo ? 'gap-3' : 'gap-2'} flex flex-col w-full`}>
                            {photo?.name ? (
                                <span
                                    className="text-sm text-center underline text-ppmb-blue-500 font-medium cursor-pointer"
                                    onClick={openPhoto}
                                >
                                    {photo.name}
                                </span>
                            ) : (
                                <span className="text-center text-sm">Drag dan drop <br /> atau</span>
                            )}
                            
                            <button className="rounded-md bg-ppmb-blue-500 px-8 py-1 text-white font-medium hover:bg-ppmb-blue-700" onClick={() => onChooseFile()}>Cari Foto</button>
                            <input ref={inputRef} accept={'.jpg'} type="file" className="hidden" onChange={(e) => setPhoto(e.target.files?.[0] || null)}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignupPage;