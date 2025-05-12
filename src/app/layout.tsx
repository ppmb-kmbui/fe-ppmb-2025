import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components";
import { AuthContextProvider } from "@/context/AuthContext";
import { SmallBar } from "@/components/template/navbar/SmallBar";


export const metadata: Metadata = {
  title: "PPMB Connect",
  description: "Website PPMB KMBUI 2025",
  icons: {
    icon: "/ppmb.ico",
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>
        <div className="flex">
          <nav className="z-50">
            <Sidebar />
            <SmallBar />
          </nav>
          
          <main className="flex-1">
            {children}
          </main>
        </div>
        </AuthContextProvider>
      </body>
    </html>
  );
}
