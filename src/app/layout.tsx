import type { Metadata } from "next";
import "./globals.css";

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
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
