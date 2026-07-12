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
  title: "Lightweight Mamba: Efficient State Space Models for Real-time Robotic Control",
  description: "Official project page for the RA-L 2026 paper: Lightweight Mamba: Efficient State Space Models for Real-time Robotic Control via Cross-Architecture Knowledge Distillation.",
  keywords: ["Mamba", "State Space Models", "Knowledge Distillation", "Robotics", "Real-time Control", "Deep Learning", "Imitation Learning"],
  authors: [{ name: "Quoc-Cuong Nguyen", url: "https://github.com/qcuongning" }],
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
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">{children}</body>
    </html>
  );
}
