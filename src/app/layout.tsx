import type { Metadata } from "next";
import { Archivo_Narrow, Inter, JetBrains_Mono } from "next/font/google";
import { CommandMenu } from "@/components/ui/command-menu";
import InstallPrompt from "@/components/InstallPrompt";
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
  description: "Vibe Coder Portfolio & Tech Hub",
  manifest: "/manifest.json",
  themeColor: "#000000",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Novah",
  },
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
        {/* Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(function(registration) {
                    console.log('ServiceWorker registration successful');
                  }, function(err) {
                    console.log('ServiceWorker registration failed: ', err);
                  });
                });
              }
            `,
          }}
        />
        <CommandMenu />
        {children}
        <InstallPrompt />
      </body>
    </html>
  );
}
