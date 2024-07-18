"use client"

import { Button, Dropdown, FileInput, Header, Input } from "@/components";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { FaFolderOpen, FaK } from "react-icons/fa6";
import { HiAcademicCap, HiLibrary, HiLockClosed, HiLockOpen, HiMail, HiUser } from "react-icons/hi";

const SignupPage: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [batch, setBatch] = useState<string>("");
    const [fullname, setFullname] = useState<string>("");
    const [faculty, setFaculty] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [repassword, setRepassword] = useState<string>("");
    const [photo, setPhoto] = useState<File | null>(null);
    const [photoUrl, setPhotoUrl] = useState<string>("");

    const { register } = useAuth();
    const router = useRouter();

    const FACULTIES = [
        { display: "Fakultas Farmasi", value: "FF" },
        { display: "Fakultas Hukum", value: "FH" },
        { display: "Fakultas Ilmu Administrasi", value: "FIA" },
        { display: "Fakultas Ilmu Pengetahuan Budaya", value: "FIB" },
        { display: "Fakultas Ekonomi dan Bismis", value: "FEB" },
        { display: "Fakultas Ilmu Keperawatan", value: "FIK" },
        { display: "Fakultas Ilmu Komputer", value: "Fasilkom" },
        { display: "Fakultas Ilmu Sosial dan Ilmu Politik", value: "Fisip" },
        { display: "Fakultas Kedokteran", value: "FK" },
        { display: "Fakultas Kedokteran Gigi", value: "FKG" },
        { display: "Fakultas Kesehatan Masyarakat", value: "FKM" },
        { display: "Fakultas Matematika dan Ilmu Pengetahuan Alam", value: "Fmipa" },
        { display: "Fakultas Psikologi", value: "Fpsi" },
        { display: "Fakultas Teknik", value: "FT" },
        { display: "Program Pendidikan Vokasi", value: "Vokasi"  }
    ]

    const BATCHES = [
        { display: '2024', value: '2024' },
        { display: '2023', value: '2023' },
        { display: '2022', value: '2022' },
        { display: '2021', value: '2021' },
    ]

    const handleFileChange = (file: File | null) => {
        setPhoto(file);

        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPhotoUrl(imageUrl);
        } else {
            setPhotoUrl("");
        }
    };

    const handleSignUp = async () => {
        try {
            await register(email, parseInt(batch), fullname, password, faculty, photoUrl);
        } catch (error: any) {
            console.error("Error while signing up:", error);
        }
    }

    return (
        <div className="min-h-screen flex flex-col h-full">
            <Header label="Buat Akun" subLabel="PPMB KMBUI 2024"/>                

            <div className="flex flex-col-reverse items-center justify-center md:flex-row md:justify-evenly px-10 md:px-[60px] gap-8 md:gap-5 h-full py-10">
                <div className="w-full flex flex-col font-montserrat font-medium gap-5 items-center justify-center h-full">
                    <div className="flex flex-col md:flex-row gap-5 w-full">
                        <Input label="Email" placeholder="Kocite" setValue={setEmail} icon={<HiMail />}/>
                         <Dropdown options={BATCHES} dropdownValue={batch} setDropdownValue={setBatch} label="Angkatan" icon={<HiAcademicCap />}/>
                    </div>

                    <Input label="Nama Lengkap" placeholder="Koko Cici Teman-teman" setValue={setFullname} icon={<HiUser />}/>
                    <Dropdown options={FACULTIES} dropdownValue={faculty} setDropdownValue={setFaculty} label="Fakultas" icon={<HiLibrary />}/>

                    <div className="flex flex-col md:flex-row gap-5 w-full">
                        <Input label="Password" placeholder="password" setValue={setPassword} icon={<HiLockOpen />}/>
                        <Input label="Konfirmasi Password" placeholder="password" setValue={setRepassword} icon={<HiLockClosed />}/>
                    </div>
                  
                    <div className="flex items-center flex-col gap-2 mt-3">
                        {/* TODO: Implement Throttling */}
                        <Button label="Buat Akun" handleClick={handleSignUp} variant="lg"/>
                        <span className="font-medium">Sudah memiliki akun? <span className="text-ppmb-blue-500 font-semibold hover:text-ppmb-blue-700 cursor-pointer" onClick={() => router.push("/login")}>Login</span></span>
                    </div>               
                </div>

                <FileInput file={photo} setFile={handleFileChange} label="Unggah foto kamu" description="Ini deskripsi nanti diubah ya"/>
            </div>
        </div>
    )
}

export default SignupPage;