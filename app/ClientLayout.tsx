"use client";

import type React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/language-context";
import { WalletProvider } from "@/contexts/wallet-context";
import SplashScreen from "@/components/splash-screen";
import { Toaster } from "@/components/ui/toaster";
import { useState, useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // 每次访问都显示启动动画（根据需求文档）
    setShowSplash(true);
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <html lang="zh-CN">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.className}`}>
        <LanguageProvider>
          <WalletProvider>
            {/* 启动动画 */}
            {showSplash && <SplashScreen onComplete={handleSplashComplete} />}

            <div className="relative min-h-screen w-full max-w-md mx-auto flex flex-col bg-white">
              <main className="relative flex-1 z-10">{children}</main>
            </div>
            <Toaster />
          </WalletProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
