import type { Metadata } from "next";
import "./globals.css";
import { AuthContextProvider } from "@/context/AuthContext";
import { body } from "@/styles/fonts";
import { TopBar, Sidebar } from "@/components";

export const metadata: Metadata = {
  title: "PPMB Connect",
  description:
    "Website untuk menyambut kedatangan mahasiswa baru sebagai anggota keluarga Keluarga Mahasiswa Buddhis Universitas Indonesia (KMB UI)",
  keywords: [
    "KMB",
    "UI",
    "Keluarga Mahasiswa Buddhis",
    "Universitas Indonesia",
    "PPMB",
    "2025",
  ],
  applicationName: "PPMB Connect",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-title" content="PPMB Connect" />
      </head>
      <body
        className={`${body.className} flex min-h-screen max-w-screen flex-col bg-white`}
      >
        <AuthContextProvider>
          <div className="pointer-events-none fixed top-0 z-50 hidden h-screen w-screen flex-col md:flex">
            <TopBar />
            <Sidebar />
          </div>
          <div className="pointer-events-none fixed top-0 z-50 flex h-screen w-screen flex-col md:hidden">
            <TopBar />
          </div>
          <main className="mt-16 h-[calc(100vh-4rem)] w-full grow overflow-y-scroll md:ml-[65px] md:w-[calc(100vw-65px)]">
            {children}
          </main>
        </AuthContextProvider>
      </body>
    </html>
  );
}
