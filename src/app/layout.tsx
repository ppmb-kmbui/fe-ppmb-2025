import type { Metadata } from "next";
import "./globals.css";
import { AuthContextProvider } from "@/context/AuthContext";
import { body } from "@/styles/fonts";
import { TopBar, Sidebar } from "@/components";
import { headers } from "next/headers";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const pathname = headersList.get("x-current-path");

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
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
          <main className="mt-16 h-[calc(100vh-4rem)] grow overflow-y-scroll lg:ml-[65px]">
            {children}
          </main>
        </AuthContextProvider>
      </body>
    </html>
  );
}
