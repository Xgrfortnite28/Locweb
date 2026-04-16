import type { Metadata } from "next";
import type {} from "react";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `${siteConfig.name} | Lilburn, GA`,
  description: siteConfig.tagline,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="page-bg-grid" />
        <div className="page-orb orb-one" />
        <div className="page-orb orb-two" />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
