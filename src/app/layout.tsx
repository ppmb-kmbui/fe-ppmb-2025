import type { Metadata } from "next";
import "./globals.css";
import { AuthContextProvider } from "@/context/AuthContext";
import { body } from "@/styles/fonts";
import { TopBar, Sidebar } from "@/components";

export const metadata: Metadata = {
  title: "PPMB Connect",
  description: "Website PPMB KMBUI 2025",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${body.className} bg-white`}>
        <AuthContextProvider>
          <div className="hidden z-50 md:flex flex-col w-screen h-screen pointer-events-none fixed top-0">
            <TopBar />
            <Sidebar />
          </div>
          <div className="md:hidden z-50 flex flex-col w-screen h-screen pointer-events-none fixed top-0">
            <TopBar />
          </div>
          <main className="overflow-y-scroll h- w-screen flex-1 md:ml-[65px] top-16">
            {children}
          </main>
        </AuthContextProvider>
      </body>
    </html>
  );
}
