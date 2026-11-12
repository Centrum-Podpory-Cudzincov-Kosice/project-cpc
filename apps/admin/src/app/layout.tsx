import "./globals.css";
import type {Metadata} from "next";
import {Onest} from "next/font/google";
import LanguageProvider from "@/features/providers/LanguageProvider";

const onest = Onest({
    variable: "--font-onest",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Admin CPC",
    description: "Admin CPC content management.",
};

export default function RootLayout({children}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${onest.variable}`}>
        <LanguageProvider>
            <body>{children}</body>
        </LanguageProvider>
        </html>
    );
}
