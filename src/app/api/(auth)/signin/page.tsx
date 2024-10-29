"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import SignInForm from "@/components/form/SignInForm";

export default function SignInPage() {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <div className="w-full flex justify-center items-center min-h-screen pt-20 bg-gray-100 dark:bg-gray-800">
        <div className="w-full max-w-md p-8 rounded-lg shadow-md bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
          <SignInForm />
        </div>
      </div>
    </NextThemesProvider>
  );
}
