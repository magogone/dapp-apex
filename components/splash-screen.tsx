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
  const [opacity, setOpacity] = useState(0);

  const loadingSteps = [
    { key: "splash.initializing", duration: 800 },
    { key: "splash.connecting", duration: 600 },
    { key: "splash.loading", duration: 800 },
    { key: "splash.securing", duration: 800 },
  ];

  useEffect(() => {
    if (isSkipped) return;

    // 初始渐入动画
    setTimeout(() => setOpacity(1), 100);

    const totalDuration = 3000; // 3秒总时长
    const intervalTime = 30; // 每30ms更新一次
    const progressIncrement = 100 / (totalDuration / intervalTime);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + progressIncrement;
        if (newProgress >= 90) {
          // 在90%时开始渐出
          setOpacity(0);
        }
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          setTimeout(onComplete, 500); // 完成后稍微延迟，等待渐出完成
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
    setOpacity(0);
    setTimeout(onComplete, 300); // 跳过时也有渐出效果
  };

  if (isSkipped) return null;

  return (
    <div
      className="fixed inset-0 bg-gradient-to-br from-white via-gray-50 to-white z-50 flex flex-col items-center justify-center overflow-hidden transition-opacity duration-500 ease-in-out"
      style={{ opacity }}
    >
      {/* 动态网格背景 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#22c55e2e_1px,transparent_1px),linear-gradient(to_bottom,#22c55e2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      {/* 粒子效果 */}
      <div className="absolute inset-0">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-green-400 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* 波浪动画背景 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-10 opacity-30">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-green-500/10 via-emerald-500/8 to-green-400/12 rounded-full animate-spin-slow"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-emerald-500/12 via-green-500/10 to-green-400/8 rounded-full animate-spin-reverse"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-r from-green-400/15 via-emerald-500/12 to-green-500/10 rounded-full animate-spin-slow"></div>
        </div>
      </div>

      {/* 主内容 */}
      <div className="relative z-10 text-center">
        {/* Logo动画 */}
        <div className="mb-8">
          <div className="relative w-40 h-40 mx-auto mb-6">
            {/* 外圈旋转环 - 加粗 */}
            <div className="absolute inset-0 border-8 border-transparent border-t-green-400 border-r-emerald-400 rounded-full animate-spin"></div>
            <div className="absolute inset-4 border-8 border-transparent border-b-green-500 border-l-emerald-500 rounded-full animate-spin-reverse"></div>

            {/* 中心Logo - 半透明毛玻璃效果 */}
            <div className="absolute inset-8 backdrop-blur-2xl rounded-full flex items-center justify-center shadow-2xl border border-white/20 glass-effect">
              {/* 玻璃反光效果 */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 via-white/10 to-transparent opacity-70"></div>
              <div className="absolute top-2 left-2 w-8 h-8 rounded-full bg-white/40 blur-sm"></div>

              <div className="w-24 h-24 flex items-center justify-center relative z-10">
                <img
                  src="/logo.png"
                  alt="APEX Logo"
                  className="w-40 h-40 object-contain drop-shadow-lg"
                />
              </div>
            </div>

            {/* 光晕效果 */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 via-emerald-500/15 to-green-600/10 rounded-full blur-xl animate-pulse"></div>
          </div>

          {/* 品牌名称 */}
          <div className="animate-fade-in-up">
            <p className="text-gray-600 text-xl font-light mb-1">
              Advanced Privacy Exchange
            </p>
            <p className="text-gray-500 text-base font-light">
              顶尖隐私交换协议
            </p>
          </div>
        </div>

        {/* 加载进度条 */}
        <div className="w-[325px] mx-auto mb-6">
          <div className="relative">
            <div className="bg-green-100/50 rounded-full h-3 overflow-hidden backdrop-blur-sm border border-gray-200/30">
              <div
                className="h-full bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 rounded-full transition-all duration-300 ease-out relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-green-300/20 rounded-full animate-pulse"></div>
              </div>
            </div>
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse shadow-lg"></div>
          </div>
          <div className="mt-2 text-right">
            <span className="text-sm text-gray-500 font-mono">
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        {/* 加载状态文字 */}
        <div className="mb-8">
          <p className="text-gray-600 text-sm font-medium animate-pulse">
            {t(loadingSteps[currentStep]?.key || "splash.initializing")}
          </p>
        </div>

        {/* 跳过按钮 */}
        <button
          onClick={handleSkip}
          className="group relative px-6 py-2 bg-gradient-to-r from-green-500/80 via-emerald-500/80 to-green-600/80 text-white hover:text-green-100 text-sm font-medium transition-all duration-300 rounded-full border border-green-400/50 hover:border-green-400/70 hover:shadow-lg hover:shadow-green-400/20"
        >
          <span className="relative z-10">{t("splash.skip")}</span>
          <div className="absolute inset-0 bg-gradient-to-r from-green-400/0 to-emerald-400/0 group-hover:from-green-400/10 group-hover:to-emerald-400/10 rounded-full transition-all duration-300"></div>
        </button>
      </div>

      {/* 底部装饰 */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            ></div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }

        .glass-effect {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(25px);
          -webkit-backdrop-filter: blur(25px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 8px 32px rgba(31, 38, 135, 0.25),
            0 4px 16px rgba(34, 197, 94, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.4),
            inset 0 -1px 0 rgba(255, 255, 255, 0.08);
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-20px);
            opacity: 1;
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        .animate-spin-reverse {
          animation: spin-reverse 6s linear infinite;
        }
      `}</style>
    </div>
  );
}
