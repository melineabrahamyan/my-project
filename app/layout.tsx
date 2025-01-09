import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
const inter = Inter({ subsets: ["latin"] });
import { AuthProvider } from "@/context/authContext";
import { Toaster } from "@/components/ui/toaster";

// TODO: change favicon

export const metadata: Metadata = {
  // TODO: change
  title: "TalentSift",
  description: "Review CVs Effortlessly with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background", inter.className)}>
        <AuthProvider>
          <Toaster />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
