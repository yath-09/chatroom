import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { SessionProvider } from "next-auth/react";
import { Providers } from "./provider";
import { Header } from "./Header";
import NextTopLoader from 'nextjs-toploader';
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dev Room",
  description: "App for pair programing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
      <Providers>
        <NextTopLoader color="#50C878" />
        <Header/>
        <div className="container mx-auto">{children}</div>
      </Providers>

      </body>
    </html>
  );
}
