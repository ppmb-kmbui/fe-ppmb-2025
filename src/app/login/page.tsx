// "use client";

// import Image from "next/image";
// import { useEffect, useState } from "react";
// import { Button, Header, Input } from "@/components";
// import { HiLockOpen, HiMail } from "react-icons/hi";
// import { useRouter } from "next/navigation";
// import { useAuth } from "@/context/AuthContext";
// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";

// const loginFormSchema = z.object({
//   email: z.string().email({ message: "Masukkan email yang valid!" }),
//   password: z
//     .string()
//     .min(8, { message: "Password minimal terdiri dari 8 karakter!" }),
// });

// const LoginPage: React.FC = () => {
//   const { login, isAuthenticated } = useAuth();
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [loginError, setLoginError] = useState<string | null>(null);
//   const router = useRouter();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm<z.infer<typeof loginFormSchema>>({
//     resolver: zodResolver(loginFormSchema),
//   });

//   const handleLogin = async (data: z.infer<typeof loginFormSchema>) => {
//     try {
//       setIsLoading(true);
//       setLoginError(null);
//       await login(data.email.toLowerCase(), data.password);
//       reset();
//     } catch (error: any) {
//       console.log("error");
//       if (error.response && error.response.status === 404) {
//         console.log("error atas");

//         setLoginError("Email atau password tidak valid!");
//       } else {
//         console.log("error bawah");

//         console.log("Error while logging in", error.message);
//       }
//     } finally {
//       setTimeout(() => {
//         setIsLoading(false);
//       }, 1000);
//     }
//   };

//   useEffect(() => {
//     if (isAuthenticated) {
//       router.push("/");
//     }
//   }, [isAuthenticated]);

//   return (
//     <div className="min-h-screen flex flex-col h-full">
//       <Header label="Masuk dengan Akun" subLabel="PPMB KMBUI 2024" />

//       <div className="flex flex-col-reverse items-center justify-center md:flex-row md:justify-evenly px-5 md:px-[60px] gap-8 lg:gap-5 h-full">
//         <form
//           onSubmit={handleSubmit(handleLogin)}
//           className="w-full flex flex-col font-medium gap-5 items-center justify-center px-2 lg:px-0"
//         >
//           <Input
//             {...register("email")}
//             placeholder="Masukkan email kamu"
//             icon={<HiMail />}
//             label="Email"
//             error={errors.email?.message}
//           />
//           <Input
//             {...register("password")}
//             placeholder="Masukkan password kamu"
//             icon={<HiLockOpen />}
//             label="Password"
//             error={errors.password?.message}
//           />

//           <div className="flex items-center flex-col gap-1 lg:mt-1">
//             {loginError && (
//               <div className="text-ppmb-red-500">{loginError}</div>
//             )}
//             <Button
//               label="Masuk"
//               type="submit"
//               size="lg"
//               disabled={isLoading}
//             />
//             <span className="font-medium">
//               Belum memiliki akun?{" "}
//               <span
//                 className="text-ppmb-blue-500 font-semibold hover:text-ppmb-blue-700 cursor-pointer hover:underline decoration-2"
//                 onClick={() => router.push("/signup")}
//               >
//                 Buat Akun
//               </span>
//             </span>
//           </div>
//         </form>

//         <div className="flex flex-col justify-center items-center w-full">
//           <div className="w-[350px] lg:w-[480px] lg:h-full">
//             <Image
//               src={"/image/mascot.png"}
//               alt="mascot"
//               width={500}
//               height={500}
//             />
//           </div>
//           <text className="font-crimson text-xl md:text-3xl lg:text-4xl font-semibold text-ppmb-800">
//             #DiscoveringSelfAndPurpose
//           </text>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

"use client";
import { useState } from "react";
import axios from "axios";
import { Input } from "@/components";
import { Button } from "@/components";
import { useRouter } from "next/navigation";

export const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:4000/api/v1/auth/login", { email, password });
    } catch (err) {
      console.log(err)
    }

  }

  return (
    <div className="w-full h-full flex justify-center items-center overflow-hidden">
      <div className="flex flex-col gap-7 w-3/8">
        <h1 className="text-h1 text-neutral-800 font-bold">
          Masuk dengan Akun PPMB KMB UI 2025
        </h1>
        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-5"
        >
          <Input label="Email" placeholder="Masukkan Email Kamu" onChange={(e) => setEmail(e.target.value)} />
          <Input label="Password" placeholder="Masukkan Password Kamu" onChange={(e) => setPassword(e.target.value)} />
          <div className="flex justify-end">
            <a href="" className="w-fit">
              Lupa password?
            </a>
          </div>
          <Button label="Masuk" className="bg-neutral-dark" type="submit" />


          <div className="flex justify-center">
            <h1>
              Belum memiliki akun ? <a href="/signup" className="font-bold">Buat Akun</a>
            </h1 >
          </div >
        </form >
      </div >

      <div className="w-1/2 overflow-visible flex justify-center items-center">
        <img src="/image/Logo-Login.png" alt="gambar" className="w-full" />
      </div>

    </div >
  )
}

export default Login
