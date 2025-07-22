"use client";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { Input } from "@/components";
import { Button } from "@/components";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { z } from "zod";

import bgAuth from "@/assets/background/bg-auth-wider.png";
import mascot from "@/assets/graphic-elements/mascot.svg";

interface LoginFormErrors {
  nonFieldError?: string;
  emailError?: string;
  passwordError?: string;
}

const loginFormSchema = z.object({
  email: z.email("Email tidak valid"),
  password: z.string(),
});

export default function Login() {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginFormErrors>({});

  const reset = () => {
    setEmail("");
    setPassword("");
  };

  const handleLogin = async (e: FormEvent) => {
    // Prevent refreshing page
    e.preventDefault();

    setErrors({});

    // Frontend validation first before relying on backend validation #PKPL
    const zodParseResult = loginFormSchema.safeParse({ email, password });

    if (zodParseResult.error) {
      const flattened = z.flattenError(zodParseResult.error);

      // Only set errors if they're not undefined
      setErrors({
        emailError: flattened.fieldErrors.email?.[0] ?? "",
        passwordError: flattened.fieldErrors.password?.[0] ?? "",
      });
    } else {
      try {
        await login(email, password);
        reset();
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          switch (error.status) {
            case 400:
              setErrors({ nonFieldError: "Email atau password tidak valid" });
              break;

            case 404:
              setErrors({
                nonFieldError: "Pengguna dengan email tersebut tidak ditemukan",
              });
              break;

            default:
              setErrors({
                nonFieldError:
                  "Terjadi error internal, kontak administrator untuk informasi lebih lanjut",
              });
              break;
          }
        } else {
          console.error("An unexpected error occurred");
          reset();
        }
      }
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src={bgAuth}
        alt=""
        width={0}
        height={0}
        sizes="100vw"
        className="top-0 -z-50 hidden h-full object-cover lg:fixed lg:block"
      />

      <div className="flex w-3/4 flex-col gap-7 lg:w-3/8">
        <h1 className="text-h5 lg:text-h1 font-bold text-neutral-800">
          Masuk dengan Akun PPMB KMB UI 2025
        </h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <Input
            label="Email"
            placeholder="Masukkan Email Kamu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="text-red-600">
            {!!errors.emailError && errors.emailError}
          </p>

          <Input
            label="Password"
            placeholder="Masukkan Password Kamu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="text-red-600">
            {!!errors.passwordError && errors.passwordError}
          </p>

          <p>{!!errors.nonFieldError && errors.nonFieldError}</p>

          <div className="flex justify-end">
            <a href="" className="w-fit">
              Lupa password?
            </a>
          </div>
          <Button
            disabled={isLoading}
            label="Masuk"
            className="bg-neutral-dark cursor-pointer"
            type="submit"
          />

          <div className="flex justify-center">
            <h1>
              Belum memiliki akun?{" "}
              <a href="/signup" className="font-bold">
                Buat Akun
              </a>
            </h1>
          </div>
        </form>
      </div>

      <div className="hidden items-center justify-center overflow-visible lg:flex lg:w-1/2">
        <Image
          src={mascot}
          alt="gambar"
          width={512}
          height={512}
          className="h-auto w-[150%] min-w-[300px] -rotate-12"
        />
      </div>
    </div>
  );
}
