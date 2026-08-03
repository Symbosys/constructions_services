import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Construction Solutions & Services",
  description: "Crafting extraordinary architectural spaces, structural engineering blueprints, and luxury construction.",
  icons: {
    icon: [
      { url: "/assets/images/favicon.jpg", type: "image/jpeg" },
      { url: "/icon.jpg", type: "image/jpeg" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/assets/images/favicon.jpg",
    apple: "/assets/images/favicon.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/assets/images/favicon.jpg" type="image/jpeg" />
        <link rel="shortcut icon" href="/assets/images/favicon.jpg" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/assets/images/favicon.jpg" />
      </head>
      <body className="min-h-full flex flex-col bg-slate-950">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
