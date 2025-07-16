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
          <div className="pointer-events-none fixed top-0 z-50 hidden h-screen w-screen flex-col md:flex">
            <TopBar />
            <Sidebar />
          </div>
          <div className="pointer-events-none fixed top-0 z-50 flex h-screen w-screen flex-col md:hidden">
            <TopBar />
          </div>
          <main className="mt-16 h-full overflow-y-scroll md:ml-[65px]">
            {children}
          </main>
        </AuthContextProvider>
      </body>
    </html>
  );
}
