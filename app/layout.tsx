import type { Metadata } from "next";
import { Anton, Source_Serif_4, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import club from "@/data/club.json";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton"
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif"
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains"
});

export const metadata: Metadata = {
  title: `${club.nombre} | Sitio oficial`,
  description: club.resumen
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`${anton.variable} ${sourceSerif.variable} ${jetbrainsMono.variable} font-serif`}
      >
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
