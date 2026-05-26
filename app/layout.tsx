import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { LenisProvider } from "@/components/layout/LenisProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "RaaS by IGPS — Robotics as a Service",
  description:
    "Plataforma de automatización industrial. Robótica, IA y sistemas integrados como servicio para la industria LATAM. Sin inversión inicial. Pago por uso.",
  keywords: [
    "robotica como servicio",
    "RaaS",
    "automatizacion industrial",
    "cobots",
    "robots industriales",
    "vision artificial",
    "inteligencia artificial industrial",
    "IGPS",
    "Chile",
    "LATAM",
  ],
  openGraph: {
    title: "RaaS by IGPS — Automatización Industrial como Servicio",
    description:
      "Transformamos procesos industriales mediante robótica, IA y automatización avanzada bajo modelos flexibles de servicio.",
    type: "website",
    locale: "es_CL",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning className={inter.variable}>
      <body className="min-h-screen flex flex-col bg-background text-text antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <LenisProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
