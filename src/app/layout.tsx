

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from '../components/Navbar';
import "./globals.css";
import SessionWrapper from "../components/SessionWrapper";
const inter = Inter({ subsets: ["latin"] });
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import MobileMenu from "@/components/MobileMenu";

export const metadata: Metadata = {
  title: "Kibung Reviews",
  description: "Discover and rate businesses both small and large.",
  icons: {
    icon: ['/favicon.ico?v=4'],
    apple: ['/apple-touch-icon.png?v=4'],
    shortcut: ['/apple-touch-icon.png?']
  }
};

export default function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    
      
    
      <html lang="en">
        <body className={inter.className}>
        <SessionWrapper>
          
      <NextThemesProvider attribute="class" defaultTheme="system" enableSystem
            disableTransitionOnChange>
          <div className="w-full  px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
            <Navbar />
          </div>
          <div className="w-full px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 space-y-5">
            
          {children}
            
          </div>
          </NextThemesProvider>
          </SessionWrapper>      
        </body>
      </html>
    
  );
}
