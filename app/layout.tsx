import type { Metadata } from "next";
import { Geist, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const cormorant = Cormorant_Garamond({ variable: "--font-cormorant", subsets: ["latin"], weight: ["400", "500", "600"] });
export const metadata: Metadata = { title: "Ajdaam — Engineering, Manufacturing & Sanitary", description: "Explore Ajdaam's engineering and manufacturing capabilities alongside bath and sanitary products.", robots: { index: false, follow: false } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en" data-theme="ajdaam" className={`${geist.variable} ${cormorant.variable}`}><head><link rel="preload" as="image" href="/images/engineering-video-poster.jpg" /><link rel="preload" as="image" href="/images/sanitary-video-poster.jpg" /></head><body>{children}</body></html>; }

