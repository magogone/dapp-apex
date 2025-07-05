"use client";

import type React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/language-context";
import { WalletProvider } from "@/contexts/wallet-context";
import SplashScreen from "@/components/splash-screen";
import { useState, useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    // 每次访问都显示启动动画（根据需求文档）
    setShowSplash(true);
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <LanguageProvider>
          <WalletProvider>
            {/* 启动动画 */}
            {showSplash && <SplashScreen onComplete={handleSplashComplete} />}

            <div className="relative min-h-screen w-full max-w-md mx-auto flex flex-col bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900">
              {/* 科技绿色渐变背景层 */}
              <div className="fixed inset-0 bg-gradient-to-br from-green-900/95 via-emerald-800/90 to-teal-900/95 z-0"></div>

              {/* 动态科技光效 */}
              <div className="fixed -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-green-400/20 via-emerald-400/15 to-teal-400/10 rounded-full blur-3xl animate-pulse pointer-events-none z-1"></div>
              <div
                className="fixed top-1/4 right-0 w-72 h-72 bg-gradient-to-bl from-green-500/15 via-emerald-500/10 to-transparent rounded-full blur-2xl animate-pulse pointer-events-none z-1"
                style={{ animationDelay: "1s" }}
              ></div>

              {/* 底部科技光效 */}
              <div
                className="fixed -bottom-32 -right-32 w-96 h-96 bg-gradient-to-tl from-emerald-400/20 via-green-500/15 to-teal-400/10 rounded-full blur-3xl animate-pulse pointer-events-none z-1"
                style={{ animationDelay: "2s" }}
              ></div>
              <div
                className="fixed bottom-1/4 left-0 w-80 h-80 bg-gradient-to-tr from-teal-500/15 via-green-400/10 to-transparent rounded-full blur-2xl animate-pulse pointer-events-none z-1"
                style={{ animationDelay: "0.5s" }}
              ></div>

              <main className="relative flex-1 z-10">{children}</main>
            </div>
          </WalletProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
