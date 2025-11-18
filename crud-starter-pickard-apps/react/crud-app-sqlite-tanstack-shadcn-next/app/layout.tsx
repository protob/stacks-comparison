import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "sonner";
import { AppSidebar } from '@/components/layout/AppSidebar';
import { TopBar } from '@/components/layout/TopBar';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Items App",
  description: "CRUD Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen flex`}>
        <Providers>
          {/* Sidebar stays fixed on the left */}
          <AppSidebar />
          
          {/* Main Content Area */}
          <div className="flex-1 flex flex-col min-h-screen">
            <TopBar />
            <main className="flex-1">
              {children}
            </main>
          </div>
          
          <Toaster position="top-right" />
        </Providers>
      </body>
    </html>
  );
}
