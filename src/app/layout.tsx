import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from '../components/Navbar';
import "./globals.css";
import SessionWrapper from "../components/SessionWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kibung Reviews",
  description: "Discover and rate businesses both small and large.",
  icons: {
    icon:['/favicon.ico?v=4'],
    apple:['/apple-touch-icon.png?v=4'],
    shortcut:['/apple-touch-icon.png?']
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
    <html lang="en">
      <body className={inter.className}>
        <div className= "w-full bg-white px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <Navbar />
        </div>
        <div className= "w-full bg-slate-100 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 space-y-5">
      {children}
      </div>
      </body>
    </html>
    </SessionWrapper>
  );
}