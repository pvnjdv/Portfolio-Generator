import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Portfolio Generator - AI-Powered Portfolio Creation",
  description: "Create stunning portfolios instantly with AI. Choose from multiple templates and get your professional portfolio live in minutes.",
  keywords: ["portfolio", "AI", "resume", "personal website", "professional"],
  openGraph: {
    title: "Portfolio Generator",
    description: "Create stunning portfolios instantly with AI",
    url: "https://portfolio.hackydaddy.xyz",
    siteName: "Portfolio Generator",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
