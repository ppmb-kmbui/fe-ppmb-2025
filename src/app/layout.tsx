import type { Metadata } from "next";
import "./globals.css";
import { AuthContextProvider } from "@/context/AuthContext";
import { body } from "@/styles/fonts";
import TopBar from "@/components/template/navbar/2025/TopBar";

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
          <div className="z-50 flex flex-col w-full fixed top-0">
            <TopBar />
          </div>
          <main className="overflow-scroll h-screen flex-1">
            {children}
          </main>
        </AuthContextProvider>
      </body>
    </html>
  );
}
