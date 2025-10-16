import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clunko - Stacks Lottery",
  description: "Decentralized sweepstakes lottery on Stacks blockchain - Play, Earn, Give Back",
  icons: {
    icon: [
      { url: '/main.png', type: 'image/png' },
      { url: '/main.png?v=2', type: 'image/png' }, // Cache busting
    ],
    apple: '/main.png',
    shortcut: '/main.png',
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
