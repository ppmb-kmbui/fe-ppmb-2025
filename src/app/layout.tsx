import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components";
import { AuthContextProvider } from "@/context/AuthContext";
import { SmallBar } from "@/components/template/navbar/SmallBar";

const lexend_init = Lexend({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-lexend',
});

export const metadata: Metadata = {
  title: "PPMB Connect",
  description: "Website PPMB KMBUI 2024",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <meta>
      <link rel="icon" type="image/x-icon" href="/ppmb.ico"/>
      </meta>
      <body className={`${lexend_init.variable}`}>
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
