import "./globals.css";
import "@cpc/assets/fonts/onest.css";
import type {Metadata} from "next";
import LanguageProvider from "@/features/providers/LanguageProvider";

export const metadata: Metadata = {
    title: "Admin CPC",
    description: "Admin CPC content management.",
};

export default function RootLayout({children}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <LanguageProvider>
            <body>{children}</body>
        </LanguageProvider>
        </html>
    );
}
