import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Exam Tracker",
    description: "Track your exam preparation",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}