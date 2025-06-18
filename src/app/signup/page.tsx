"use client"

import { Button, Dropdown, FileInput, Header, Input } from "@/components";
import { useAuth } from "@/context/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaFolderOpen, FaK } from "react-icons/fa6";
import { HiAcademicCap, HiLibrary, HiLockClosed, HiLockOpen, HiMail, HiUser } from "react-icons/hi";
import { z } from "zod";

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

const signupFormSchema = z.object({
    email: z.string().email({ message: "Masukkan email yang valid!" }),
    batch: z.string().min(1), // 1 hour debug, couldn't pass the error message correctly, so I typed it manually (solution: use <Controller />, but the developer too lazy to refactor it)
    fullname: z.string().min(1, { message: "Nama tidak boleh kosong!" }),
    faculty: z.string().min(1, { message: "Fakultas tidak boleh kosong!" }),
    password: z.string().min(8, { message: "Password minimal terdiri dari 8 karakter!" }),
    reconfirmPassword: z.string(),
    photo: z.instanceof(File, { message: "Foto tidak boleh kosong!" })
}).refine(data => data.password === data.reconfirmPassword, {
    message: "Password tidak sesuai",
    path: ['reconfirmPassword']
})

const SignupPage: React.FC = () => {
    const { signUp } = useAuth();
    const router = useRouter();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { register, control, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<z.infer<typeof signupFormSchema>>({
        resolver: zodResolver(signupFormSchema),
    });

    const handleSignUp = async (data: z.infer<typeof signupFormSchema>) => {
        // console.log("ini data", data);
    
        try {
            setIsLoading(true);
            await new Promise<void>((resolve) => setTimeout(resolve, 5000));
            const form = new FormData();
            form.append('file', data.photo);
            form.append('upload_preset', 'ppmb_kmbui');
    
            const res = await axios.post(
                `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
                form
            );
    
            await signUp(data.email.toLowerCase(), parseInt(data.batch), data.fullname, data.password, data.faculty.toUpperCase(), res.data.url);

        } catch (error: any) {
            console.error("Error while signing up:", error);
        } finally {
            setIsLoading(false);
        }
    };
    
    
    return (
        <div className="min-h-screen flex flex-col h-full">
            <Header label="Buat Akun" subLabel="PPMB KMBUI 2024"/>            

            <div className="flex flex-col-reverse items-center justify-center md:flex-row md:justify-evenly px-10 md:px-[60px] gap-8 md:gap-5 h-full py-10 md:py-0">
                <form onSubmit={handleSubmit(handleSignUp)}  className="w-full flex flex-col font-montserrat font-medium gap-5 items-center justify-center h-full">
                    <div className="flex flex-col md:flex-row gap-5 w-full">
                        <Input {...register("email")} label="Email" placeholder="Masukkan email" icon={<HiMail />} error={errors.email?.message}/>
                        <Dropdown options={BATCHES} dropdownValue={watch("batch")} setDropdownValue={(value) => setValue("batch", value)} label="Angkatan" icon={<HiAcademicCap />} error={errors.batch?.message && "Angkatan tidak boleh kosong!"}/>
                    </div>

                    <Input {...register("fullname")} label="Nama Lengkap" placeholder="Masukkan nama" icon={<HiUser />} error={errors.fullname?.message}/>
                    <Dropdown options={FACULTIES} dropdownValue={watch("faculty")} setDropdownValue={(value) => setValue("faculty", value)} label="Fakultas" icon={<HiLibrary />} error={errors.faculty?.message && "Fakultas tidak boleh kosong!"}/>

                    <div className="flex flex-col md:flex-row gap-5 w-full">
                        <Input {...register("password")} label="Password" placeholder="Masukkan password" icon={<HiLockOpen />} error={errors.password?.message}/>
                        <Input {...register("reconfirmPassword")} label="Konfirmasi Password" placeholder="Konfirmasi password" icon={<HiLockClosed />} error={errors.reconfirmPassword?.message}/>
                    </div>
                  
                    <div className="flex items-center flex-col gap-1 lg:mt-1">
                        <Button label="Buat Akun" size="lg" type="submit" disabled={isLoading}/>
                        <span className="font-medium">Sudah memiliki akun? <span className="text-ppmb-blue-500 font-semibold hover:text-ppmb-blue-700 cursor-pointer hover:underline decoration-2" onClick={() => router.push("/login")}>Login</span></span>
                    </div>               
                </form>

                <Controller name="photo" control={control} render={({ field: { onChange, value } }) => (
                    <FileInput
                        file={value as File | null}
                        onChange={(file) => onChange(file)}
                        label="Unggah foto kamu"
                        description="Unggah dalam bentuk .jpg/.jpeg/.png"
                        fileType="image"
                        error={errors.photo?.message}
                        answer=""
                    />
                )} />
            </div>
        </div>
    )
}

export default SignupPage;