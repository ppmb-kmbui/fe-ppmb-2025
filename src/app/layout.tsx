"use client"
import type { Metadata } from "next";
import "./globals.css";
import { AuthContextProvider } from "@/context/AuthContext";
import { body } from "@/styles/fonts";
import { TopBar, Sidebar } from "@/components";
import { usePathname } from "next/navigation";

;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname()

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${body.className} flex flex-col min-h-screen max-w-screen bg-white`}>
        <AuthContextProvider>
          <div className="hidden z-50 md:flex flex-col w-screen h-screen pointer-events-none fixed top-0">
            <TopBar />
            <Sidebar />
          </div>
          <div className="md:hidden z-50 flex flex-col w-screen h-screen pointer-events-none fixed top-0">
            <TopBar />
          </div>
          <main className={`${pathname == "/signup" || pathname == "/login" && "lg:ml-[65px]"} h-[calc(100vh-4rem)] overflow-y-scroll grow mt-16`}>
            {children}
          </main>
        </AuthContextProvider>
      </body>
    </html>
  );
}
