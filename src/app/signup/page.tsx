"use client";

import Image from "next/image";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FileInput, Input } from "@/components";
import { Button } from "@/components";
import { useRouter } from "next/navigation";
import { Dropdown } from "@/components";
import { z, ZodError } from "zod";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import axios, { AxiosError } from "axios";
import { APIResponse } from "@/utils/interface";

const signupFormSchema = z
  .object({
    email: z.email({ message: "Masukkan email yang valid!" }),
    angkatan: z.string().length(4, "Angkatan harus dipilih!"), // 1 hour debug, couldn't pass the error message correctly, so I typed it manually (solution: use <Controller />, but the developer too lazy to refactor it)
    nama: z.string().min(1, { message: "Nama tidak boleh kosong!" }),
    fakultas: z.string().min(1, { message: "Fakultas tidak boleh kosong!" }),
    password: z
      .string()
      .min(8, { message: "Password minimal terdiri dari 8 karakter!" }),
    konfirmPw: z.string(),
    photo: z.instanceof(File, { message: "Foto tidak boleh kosong!" }),
  })
  .refine((data) => data.password === data.konfirmPw, {
    message: "Password tidak sesuai",
    path: ["reconfirmPassword"],
  });

const FAKULTAS = [
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
  { display: "Program Pendidikan Vokasi", value: "Vokasi" },
];

const ANGKATAN = [
  { display: "2025", value: "2025" },
  { display: "2024", value: "2024" },
  { display: "2023", value: "2023" },
  { display: "2022", value: "2022" },
];

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [angkatan, setAngkatan] = useState("");
  const [nama, setNama] = useState("");
  const [fakultas, setFakultas] = useState("");
  const [password, setPassword] = useState("");
  const [konfirmPw, setKonfirmPw] = useState("");
  const [isRestricted, setIsRestricted] = useState<boolean>(true);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [error, setError] = useState<any>();
  const router = useRouter();

  const { signUp } = useAuth();

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", profilePicture!);
    formData.append("upload_preset", "profile_pictures");

    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData,
    );

    if (res.status !== 200) {
      setError({
        fileUploadError: "Error terjadi saat sedang mengunggah foto",
      });

      return;
    } else {
      const imgUrl: string = res.data.url;

      try {
        const batchNo = parseInt(angkatan, 10);
        await signUp(email, batchNo, nama, password, fakultas, imgUrl);
      } catch (err: any) {
        if (err instanceof AxiosError) {
          let payload: APIResponse<any> = err.response?.data;
          console.log(payload.message);
          setError({ registrationError: payload.message });
        }
      }
    }
  };

  useEffect(() => {
    const zodParseResult = signupFormSchema.safeParse({
      email,
      angkatan,
      nama,
      fakultas,
      password,
      konfirmPw,
      photo: profilePicture,
    });

    if (zodParseResult.error) {
      setIsRestricted(true);
      const flattened = z.flattenError(zodParseResult.error);
      setError(flattened);
    } else {
      setIsRestricted(false);
    }
  }, [email, angkatan, nama, fakultas, password, konfirmPw, profilePicture]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-around overflow-y-scroll lg:flex-row lg:overflow-hidden">
      <Image
        src="/background/bg-auth-wider.png"
        alt="bg auth"
        width={0}
        height={0}
        sizes="100vw"
        className="object-fit top-16 -z-50 hidden h-auto w-full object-scale-down lg:fixed lg:flex"
      />
      <div className="flex h-full w-3/4 flex-col gap-7 py-10 xl:w-3/8">
        <h1 className="text-h3 lg:text-h1 grow font-bold text-neutral-800">
          Buat Akun PPMB KMB UI 2025
        </h1>

        <form onSubmit={handleSignUp} className="flex grow flex-col gap-5">
          <div className="flex w-full flex-col items-start justify-start gap-5 lg:flex-row lg:gap-x-7">
            <div className="flex w-full grow flex-col">
              <Input
                label="Email"
                placeholder="Masukkan Email Kamu"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {error?.fieldErrors?.email && (
                <p className="text-red-600">{error.fieldErrors?.email}</p>
              )}
            </div>

            <div className="flex w-full grow flex-col">
              <Dropdown
                options={ANGKATAN}
                label="Angkatan"
                setDropdownValue={setAngkatan}
                dropdownValue={angkatan}
              />
              {error?.fieldErrors?.angkatan && (
                <p className="text-red-600">{error.fieldErrors?.angkatan}</p>
              )}
            </div>
          </div>

          <div>
            <Input
              label="Nama Lengkap"
              placeholder="Masukkan nama"
              onChange={(e) => setNama(e.target.value)}
              required
            />
            {error?.fieldErrors?.nama && (
              <p className="text-red-600">{error?.fieldErrors?.nama}</p>
            )}
          </div>

          <div>
            <Dropdown
              options={FAKULTAS}
              label="Fakultas"
              setDropdownValue={setFakultas}
              dropdownValue={fakultas}
            />
            {error?.fieldErrors?.fakultas && (
              <p className="text-red-600">{error?.fieldErrors?.fakultas}</p>
            )}
          </div>

          <div className="flex flex-col items-start justify-center gap-5 lg:flex-row lg:gap-x-7">
            <div className="w-full">
              <Input
                label="Password"
                placeholder="Masukkan password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {error?.fieldErrors?.password && (
                <p className="text-red-600">{error?.fieldErrors?.password}</p>
              )}
            </div>

            <div className="w-full">
              <Input
                label="Konfirmasi Password"
                placeholder="Konfirmasi password"
                onChange={(e) => setKonfirmPw(e.target.value)}
                required
              />
            </div>
          </div>

          {error?.registrationError && (
            <div className="text-red-600">{error.registrationError}</div>
          )}

          <div className="flex w-full flex-col items-center justify-center overflow-visible lg:hidden">
            <FileInput
              file={profilePicture}
              onChange={(file) => setProfilePicture(file)}
              label="Foto Profil"
              description="Unduh foto profil kamu di sini"
              fileType="image"
              error={error?.fieldErrors?.photo}
              answer=""
              buttonText="Cari foto"
            />
            {error?.fileUploadError && (
              <p className="text-red-600">{error.fileUploadError}</p>
            )}
          </div>

          <Button
            isRestricted={isRestricted}
            label="Buat Akun"
            className="bg-neutral-dark"
            type="submit"
          />

          <div className="flex justify-center">
            <h1>
              Sudah memiliki akun?{" "}
              <Link href="/login" className="font-bold">
                Login
              </Link>
            </h1>
          </div>
        </form>
      </div>

      <div className="hidden w-1/3 items-center justify-center overflow-visible lg:flex lg:flex-col">
        <FileInput
          file={profilePicture}
          onChange={(file) => setProfilePicture(file)}
          label="Foto Profil"
          description="Unduh foto profil kamu di sini"
          fileType="image"
          error={error?.fieldErrors?.photo}
          answer=""
          buttonText="Cari foto"
        />
        {error?.fileUploadError && (
          <p className="text-red-600">{error.fileUploadError}</p>
        )}
      </div>
    </div>
  );
}
