import type { Metadata } from "next";
import { Archivo_Narrow, Inter, JetBrains_Mono } from "next/font/google";
import { CommandMenu } from "@/components/ui/command-menu";
import "./globals.css";

const archivoNarrow = Archivo_Narrow({
  variable: "--font-archivo-narrow",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NOVAH // SYSTEM_DEVELOPER",
  description: "Portfolio and digital infrastructure by Novah.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${archivoNarrow.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased bg-black text-white selection:bg-neon selection:text-black`}
      >
        <CommandMenu />
        {children}
      </body>
    </html>
  );
}
