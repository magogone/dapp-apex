"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/language-context";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const { t } = useLanguage();
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSkipped, setIsSkipped] = useState(false);

  const loadingSteps = [
    { key: "splash.initializing", duration: 800 },
    { key: "splash.connecting", duration: 600 },
    { key: "splash.loading", duration: 800 },
    { key: "splash.securing", duration: 800 },
  ];

  useEffect(() => {
    if (isSkipped) return;

    const totalDuration = 3000; // 3秒总时长
    const intervalTime = 30; // 每30ms更新一次
    const progressIncrement = 100 / (totalDuration / intervalTime);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + progressIncrement;
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          setTimeout(onComplete, 200); // 完成后稍微延迟
          return 100;
        }
        return newProgress;
      });
    }, intervalTime);

    // 步骤切换
    let stepTimeout: NodeJS.Timeout;
    let currentStepIndex = 0;

    const switchStep = () => {
      if (currentStepIndex < loadingSteps.length - 1) {
        currentStepIndex++;
        setCurrentStep(currentStepIndex);
        stepTimeout = setTimeout(
          switchStep,
          loadingSteps[currentStepIndex].duration
        );
      }
    };

    stepTimeout = setTimeout(switchStep, loadingSteps[0].duration);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(stepTimeout);
    };
  }, [isSkipped, onComplete]);

  const handleSkip = () => {
    setIsSkipped(true);
    onComplete();
  };

  if (isSkipped) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900 z-50 flex flex-col items-center justify-center">
      {/* 动态科技光效背景 */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/95 via-emerald-800/90 to-teal-900/95"></div>
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-green-400/20 via-emerald-400/15 to-teal-400/10 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute top-1/4 right-0 w-72 h-72 bg-gradient-to-bl from-green-500/15 via-emerald-500/10 to-transparent rounded-full blur-2xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-tl from-emerald-400/20 via-green-500/15 to-teal-400/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute bottom-1/4 left-0 w-80 h-80 bg-gradient-to-tr from-teal-500/15 via-green-400/10 to-transparent rounded-full blur-2xl animate-pulse"
        style={{ animationDelay: "0.5s" }}
      ></div>

      {/* 主内容 */}
      <div className="relative z-10 text-center">
        {/* Logo动画 */}
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-teal-400 to-green-500 rounded-3xl flex items-center justify-center shadow-2xl transform animate-bounce">
            <span className="text-white font-bold text-4xl">🌿</span>
          </div>

          {/* 品牌名称 */}
          <div className="mt-6 animate-fade-in">
            <h1 className="text-4xl font-bold text-white mb-2 tracking-wide">
              {t("splash.title")}
            </h1>
            <p className="text-emerald-200 text-lg font-light">
              {t("splash.subtitle")}
            </p>
          </div>
        </div>

        {/* 加载进度条 */}
        <div className="w-80 mx-auto mb-6">
          <div className="bg-white/20 rounded-full h-2 overflow-hidden backdrop-blur-sm">
            <div
              className="h-full bg-gradient-to-r from-teal-400 to-green-500 rounded-full transition-all duration-300 ease-out shadow-lg"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* 加载状态文字 */}
        <div className="mb-8">
          <p className="text-emerald-100 text-sm font-medium animate-pulse">
            {t(loadingSteps[currentStep]?.key || "splash.initializing")}
          </p>
        </div>

        {/* 跳过按钮 */}
        <button
          onClick={handleSkip}
          className="text-emerald-300 hover:text-white text-sm font-medium transition-colors duration-200 underline underline-offset-4"
        >
          {t("splash.skip")}
        </button>
      </div>

      {/* 底部装饰 */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.3}s` }}
            ></div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  );
}
