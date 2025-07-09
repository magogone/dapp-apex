"use client";

import { useState } from "react";
import {
  ArrowLeft,
  FileText,
  Wallet,
  PieChart,
  Lock,
  Menu,
  X,
  Home,
  User,
  Users,
  BarChart3,
  Gift,
  ArrowUpDown,
  Calculator,
  HelpCircle,
  Leaf,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";

export default function LiquidityPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const [isCalculatorModalOpen, setIsCalculatorModalOpen] = useState(false);
  const pathname = usePathname();

  // 锁仓代币数据
  const lockTokenData = {
    totalLocked: 1200, // 总锁仓代币
    totalUnlocked: 240, // 已解锁代币 (20%)
    totalClaimed: 120, // 已领取代币 (10%)
    availableToClaim: 120, // 可领取数量 (10%)
    chartData: [
      { name: "待解锁", value: 70, color: "#27cfa0", amount: 840 }, // 70% 待解锁
      { name: "已解锁", value: 10, color: "#24c667", amount: 120 }, // 10% 已解锁可领取
      { name: "已领取", value: 20, color: "#16a34a", amount: 240 }, // 20% 已领取
    ],
    stakingHistory: [
      { type: "7天质押", amount: 100, bonus: 100, multiplier: "1:1" },
      { type: "360天质押", amount: 300, bonus: 900, multiplier: "1:3" },
    ],
  };

  const quickMenuItems = [
    {
      icon: Wallet,
      title: "Top up wallet",
      subtitle: "money",
    },
    {
      icon: PieChart,
      title: "Create wallet",
      subtitle: "budget",
    },
    {
      icon: Lock,
      title: "Lock",
      subtitle: "card",
    },
  ];

  // 导航菜单项
  const navItems = [
    {
      name: "质押",
      icon: BarChart3,
      href: "/my-stakes",
      isActive: pathname === "/my-stakes",
    },
    {
      name: "团队",
      icon: Users,
      href: "/analytics",
      isActive: pathname === "/analytics",
    },
    {
      name: "个人中心",
      icon: User,
      href: "/profile",
      isActive: pathname === "/profile",
    },
    {
      name: "活动中心",
      icon: Gift,
      href: "/activity",
      isActive: pathname === "/activity",
    },
    {
      name: "流动性生态",
      icon: ArrowUpDown,
      href: "/liquidity",
      isActive: pathname === "/liquidity",
    },
  ];

  // 创建美观的圆环图
  const createDonutChart = () => {
    const radius = 105; // 圆环外半径
    const innerRadius = 75; // 圆环内半径
    const centerX = 150;
    const centerY = 150;

    let cumulativePercentage = 0;

    return lockTokenData.chartData.map((item, index) => {
      const startAngle = (cumulativePercentage / 100) * 360 - 90;
      const endAngle = ((cumulativePercentage + item.value) / 100) * 360 - 90;

      const x1 = centerX + radius * Math.cos((startAngle * Math.PI) / 180);
      const y1 = centerY + radius * Math.sin((startAngle * Math.PI) / 180);
      const x2 = centerX + radius * Math.cos((endAngle * Math.PI) / 180);
      const y2 = centerY + radius * Math.sin((endAngle * Math.PI) / 180);

      const x3 = centerX + innerRadius * Math.cos((endAngle * Math.PI) / 180);
      const y3 = centerY + innerRadius * Math.sin((endAngle * Math.PI) / 180);
      const x4 = centerX + innerRadius * Math.cos((startAngle * Math.PI) / 180);
      const y4 = centerY + innerRadius * Math.sin((startAngle * Math.PI) / 180);

      const largeArcFlag = item.value > 50 ? 1 : 0;

      const pathData = [
        `M ${x1} ${y1}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        `L ${x3} ${y3}`,
        `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4}`,
        "Z",
      ].join(" ");

      cumulativePercentage += item.value;

      return (
        <g key={index}>
          <defs>
            {/* 主渐变 - 增强颜色对比度 */}
            <linearGradient
              id={`gradient-${index}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor={item.color} stopOpacity="1" />
              <stop offset="30%" stopColor={item.color} stopOpacity="0.95" />
              <stop offset="70%" stopColor={item.color} stopOpacity="0.85" />
              <stop offset="100%" stopColor={item.color} stopOpacity="0.75" />
            </linearGradient>

            {/* 呼吸渐变 - 用于动画效果，增强对比度 */}
            <linearGradient
              id={`gradient-breathe-${index}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor={item.color} stopOpacity="1">
                <animate
                  attributeName="stop-opacity"
                  values="1;0.4;1"
                  dur="2.5s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="50%" stopColor={item.color} stopOpacity="0.9">
                <animate
                  attributeName="stop-opacity"
                  values="0.9;0.3;0.9"
                  dur="2.5s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="100%" stopColor={item.color} stopOpacity="0.8">
                <animate
                  attributeName="stop-opacity"
                  values="0.8;0.2;0.8"
                  dur="2.5s"
                  repeatCount="indefinite"
                />
              </stop>
            </linearGradient>

            {/* 悬停渐变 */}
            <linearGradient
              id={`gradient-hover-${index}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor={item.color} stopOpacity="1" />
              <stop offset="50%" stopColor={item.color} stopOpacity="0.95" />
              <stop offset="100%" stopColor={item.color} stopOpacity="0.8" />
            </linearGradient>

            {/* 立体阴影滤镜 */}
            <filter
              id={`shadow-${index}`}
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feDropShadow
                dx="0"
                dy="4"
                stdDeviation="8"
                floodColor={item.color}
                floodOpacity="0.3"
              />
              <feDropShadow
                dx="0"
                dy="8"
                stdDeviation="16"
                floodColor={item.color}
                floodOpacity="0.2"
              />
            </filter>

            {/* 内发光滤镜 */}
            <filter
              id={`glow-${index}`}
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* 底层阴影路径 */}
          <path
            d={pathData}
            fill={item.color}
            opacity="0.2"
            transform="translate(2, 4)"
            className="pointer-events-none"
          />

          {/* 主路径 - 使用呼吸渐变 */}
          <path
            d={pathData}
            fill={`url(#gradient-breathe-${index})`}
            className="transition-all duration-300 ease-out"
            style={{
              filter: `url(#shadow-${index})`,
            }}
          />

          {/* 高光效果 */}
          <path
            d={pathData}
            fill="url(#highlight)"
            opacity="0.3"
            className="pointer-events-none"
          />

          {/* 分割线 */}
          <line
            x1={x1}
            y1={y1}
            x2={x4}
            y2={y4}
            stroke="white"
            strokeWidth="3"
            className="opacity-80 drop-shadow-sm pointer-events-none"
          />

          {/* 定义高光渐变 */}
          <defs>
            <linearGradient id="highlight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="white" stopOpacity="0.4" />
              <stop offset="30%" stopColor="white" stopOpacity="0.2" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
        </g>
      );
    });
  };

  return (
    <div className="min-h-screen relative">
      {/* 原来的淡绿色背景 */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 via-emerald-500/15 to-green-600/20"></div>

      {/* 下半部分白色背景 */}
      <div className="absolute inset-0 top-1/2 bg-white"></div>

      {/* 页面内容容器 */}
      <div className="relative z-10">
        {/* 顶部导航栏 - 采用全局统一样式 */}
        <header className="bg-white shadow-sm border-b border-gray-200 relative z-20 pb-2">
          <div className="max-w-md mx-auto px-6 pt-0 pb-0 -mt-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 -ml-4">
                <div className="w-32 h-32 rounded-lg overflow-hidden">
                  <img
                    src="/logo.png"
                    alt="APEX Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="-ml-6">
                  <div className="text-xs text-gray-500">流动性生态</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="w-12 h-12 rounded-2xl bg-gradient-to-br from-white to-gray-50 hover:from-gray-50 hover:to-gray-100 border border-gray-200/60 shadow-md hover:shadow-lg transition-all duration-300 group flex items-center justify-center translate-y-2 scale-90"
                  variant="ghost"
                  size="icon"
                >
                  {isMenuOpen ? (
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full blur-sm opacity-15 group-hover:opacity-25 transition-opacity duration-300"></div>
                      <X className="w-5 h-5 text-gray-600 relative z-10 group-hover:text-gray-700 transition-colors duration-200" />
                    </div>
                  ) : (
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full blur-sm opacity-15 group-hover:opacity-25 transition-opacity duration-300"></div>
                      <div className="relative z-10 flex flex-col justify-center items-center space-y-1.5">
                        {/* 现代化的汉堡菜单图标 - 绿色主题 */}
                        <div className="w-5 h-0.5 bg-green-600 rounded-full group-hover:bg-green-700 transition-all duration-200 group-hover:scale-110"></div>
                        <div className="w-4 h-0.5 bg-green-600 rounded-full group-hover:bg-green-700 transition-all duration-200 group-hover:scale-110"></div>
                        <div className="w-5 h-0.5 bg-green-600 rounded-full group-hover:bg-green-700 transition-all duration-200 group-hover:scale-110"></div>
                      </div>
                    </div>
                  )}
                </Button>
              </div>
            </div>
            <div className="-mt-10">
              <p className="text-sm text-gray-600">查看和管理您的待解锁代币</p>
            </div>
          </div>
        </header>

        {/* 导航下拉菜单 - 添加向下展开动画 */}
        {isMenuOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 animate-in fade-in duration-200"
              onClick={() => setIsMenuOpen(false)}
            />
            <div className="fixed top-20 right-6 z-50 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden w-40 dropdown-menu-animate">
              <div className="py-2">
                <Link href="/" onClick={() => setIsMenuOpen(false)}>
                  <div className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-gray-700">
                    <Home className="w-5 h-5" />
                    <span className="font-medium">首页</span>
                  </div>
                </Link>
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div
                        className={`
                        flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors
                        ${
                          item.isActive
                            ? "bg-green-50 text-gray-600"
                            : "text-gray-700"
                        }
                      `}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.name}</span>
                      </div>
                    </Link>
                  );
                })}
                <div className="border-t border-gray-200 mt-2 pt-2">
                  <div className="px-4 space-y-2">
                    <Button
                      onClick={() => {
                        setIsCalculatorModalOpen(true);
                        setIsMenuOpen(false);
                      }}
                      className="w-full bg-white hover:bg-green-50 text-green-600 rounded-full border border-green-500"
                    >
                      <Calculator className="h-4 w-4 mr-2" />
                      收益计算器
                    </Button>
                    <Button className="w-full bg-gradient-to-r from-teal-400 to-green-500 hover:from-teal-500 hover:to-green-600 text-white rounded-full">
                      <Wallet className="h-4 w-4 mr-2" />
                      连接钱包
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="max-w-md mx-auto px-4 py-4 space-y-4 relative z-10">
          {/* 主要圆环图区域 - 采用截图样式但保持功能 */}
          <div className="relative">
            {/* 圆环图 - 丰富样式和呼吸效果 */}
            <div className="flex items-center justify-center relative mb-4">
              {/* 多层背景光晕和呼吸效果 - 增强版 */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* 外层呼吸光圈 - 增强颜色 */}
                <div
                  className="rounded-full w-80 h-80"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(34, 197, 94, 0.25) 0%, rgba(34, 197, 94, 0.15) 40%, rgba(34, 197, 94, 0.08) 70%, transparent 100%)",
                    animation: "breathe 3s ease-in-out infinite",
                  }}
                ></div>

                {/* 中层光晕 - 增强颜色 */}
                <div
                  className="absolute rounded-full w-72 h-72"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(16, 185, 129, 0.20) 0%, rgba(16, 185, 129, 0.12) 50%, rgba(16, 185, 129, 0.05) 80%, transparent 100%)",
                    animation: "breathe 3s ease-in-out infinite 0.5s",
                  }}
                ></div>

                {/* 内层光晕 - 增强颜色 */}
                <div
                  className="absolute rounded-full w-64 h-64"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.08) 80%, transparent 100%)",
                    animation: "breathe 3s ease-in-out infinite 1s",
                  }}
                ></div>

                {/* 新增：彩色呼吸环 */}
                <div
                  className="absolute rounded-full w-56 h-56"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(34, 197, 94, 0.3) 0%, rgba(16, 185, 129, 0.2) 30%, rgba(34, 197, 94, 0.1) 60%, transparent 100%)",
                    animation: "breathe 2.5s ease-in-out infinite 0.3s",
                  }}
                ></div>
              </div>

              {/* 旋转的装饰环 */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="rounded-full w-72 h-72 border border-green-200/30"
                  style={{
                    animation: "spin 20s linear infinite",
                  }}
                ></div>
                <div
                  className="absolute rounded-full w-56 h-56 border border-emerald-200/20"
                  style={{
                    animation: "spin 30s linear infinite reverse",
                  }}
                ></div>
              </div>

              <div className="relative z-10">
                <div
                  className="transition-all duration-500"
                  style={{
                    animation: "chartBreathe 6s ease-in-out infinite",
                  }}
                >
                  <svg
                    width="240"
                    height="240"
                    viewBox="0 0 300 300"
                    className="drop-shadow-2xl"
                    style={{
                      filter:
                        "drop-shadow(0 10px 30px rgba(34, 197, 94, 0.3)) drop-shadow(0 0 20px rgba(16, 185, 129, 0.2))",
                    }}
                  >
                    {createDonutChart()}
                  </svg>
                </div>

                {/* 圆形图表中心的总资产显示 - 增强样式 */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center p-4 rounded-full bg-white/80 backdrop-blur-sm border border-white/50 shadow-lg">
                    {/* 总资产显示 - 现在在圆形图表中心 */}
                    <div>
                      <p className="text-sm text-gray-600 mb-1 font-medium">
                        流动性代币
                      </p>
                      <p className="text-2xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 bg-clip-text text-transparent">
                        {lockTokenData.totalLocked}
                      </p>
                      <p className="text-xs text-gray-500 font-medium tracking-wider">
                        AQ
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 质押历史卡片 - 独立显示，一半会被白色背景覆盖 */}
          <div className="grid grid-cols-2 gap-3 mx-4 mb-4 relative z-10 mt-8">
            <Card
              className="backdrop-blur-xl hover:shadow-xl transition-all duration-300 border border-white/10 rounded-2xl overflow-hidden shadow-lg"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.06)",
                backdropFilter: "blur(25px) saturate(200%)",
                WebkitBackdropFilter: "blur(25px) saturate(200%)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(255, 255, 255, 0.15)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(255, 255, 255, 0.06)";
                e.currentTarget.style.transform = "translateY(0px)";
              }}
            >
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-green-400 rounded-lg flex items-center justify-center">
                    <Lock className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-800 font-medium text-xs">7天质押</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-green-600 font-semibold text-sm">
                    {lockTokenData.stakingHistory[0].amount} APEX
                  </p>
                  <p className="text-gray-600 text-xs">
                    获得 {lockTokenData.stakingHistory[0].bonus} AQ
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-green-400 h-1.5 rounded-full w-1/3"></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>{lockTokenData.stakingHistory[0].multiplier}</span>
                    <span>进行中</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              className="backdrop-blur-xl hover:shadow-xl transition-all duration-300 border border-white/10 rounded-2xl overflow-hidden shadow-lg"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.06)",
                backdropFilter: "blur(25px) saturate(200%)",
                WebkitBackdropFilter: "blur(25px) saturate(200%)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(255, 255, 255, 0.15)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(255, 255, 255, 0.06)";
                e.currentTarget.style.transform = "translateY(0px)";
              }}
            >
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                    <PieChart className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-800 font-medium text-xs">
                      360天质押
                    </p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-green-600 font-semibold text-sm">
                    {lockTokenData.stakingHistory[1].amount} APEX
                  </p>
                  <p className="text-gray-600 text-xs">
                    获得 {lockTokenData.stakingHistory[1].bonus} AQ
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-green-500 h-1.5 rounded-full w-4/5"></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>{lockTokenData.stakingHistory[1].multiplier}</span>
                    <span>进行中</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 白色背景卡片 - 从质押卡片中间开始覆盖 */}
          <div className="bg-white rounded-t-2xl -mx-4 -mt-80 pt-84 relative z-0">
            {/* 内容区域 - 添加左右间距 */}
            <div className="px-4">
              {/* 锁仓代币解锁详情区域 */}
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-900">
                  锁仓代币解锁详情
                </h3>
                <Button
                  onClick={() => setIsRulesOpen(!isRulesOpen)}
                  className="bg-green-100 backdrop-blur-sm hover:bg-green-200 text-green-700 border border-green-300 rounded-full px-3 py-1 text-xs"
                  variant="outline"
                >
                  + 解锁规则
                </Button>
              </div>

              {/* 解锁规则展开内容 */}
              {isRulesOpen && (
                <div className="mb-3 bg-green-50/90 backdrop-blur-sm p-3 rounded-lg border border-green-200">
                  <p className="mb-2 text-green-700 font-semibold text-sm">
                    解锁规则
                  </p>
                  <p className="text-orange-600 text-xs">• 撤出质押归零</p>
                  <p className="text-gray-500 text-xs mt-1">
                    具体规则进一步同步
                  </p>
                </div>
              )}

              {/* 解锁详情 */}
              <div className="space-y-2">
                {lockTokenData.chartData.map((item, index) => (
                  <Card
                    key={index}
                    className="bg-white border border-gray-200 shadow-sm rounded-xl"
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: item.color }}
                          />
                          <div>
                            <p className="font-medium text-gray-900 text-sm">
                              {item.name}
                            </p>
                            <p className="text-xs text-gray-600">
                              {item.value}% 共计
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900 text-sm">
                            {item.amount} AQ
                          </p>
                          <p className="text-xs">
                            {item.name === "已解锁" ? (
                              <button
                                className="text-green-600 hover:text-green-700 underline font-medium"
                                onClick={() => {
                                  // 这里可以添加领取逻辑
                                  alert("领取功能待开发");
                                }}
                              >
                                点击领取
                              </button>
                            ) : item.name === "已领取" ? (
                              <span className="text-green-600">已成功领取</span>
                            ) : (
                              <span className="text-green-600">等待解锁</span>
                            )}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 收益计算器弹窗 */}
        <Dialog
          open={isCalculatorModalOpen}
          onOpenChange={setIsCalculatorModalOpen}
        >
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-gray-500" />
                收益计算器
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <RewardCalculator />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

// 收益计算器组件
const RewardCalculator = () => {
  const [investmentAmount, setInvestmentAmount] = useState([1000]);
  const [referralCount, setReferralCount] = useState([5]);

  const calculateRewards = () => {
    const amount = investmentAmount[0];
    const referrals = referralCount[0];

    return {
      directBonus: amount * 0.15 * referrals,
      levelBonus: amount * 0.02 * 4, // 假设4层
      managementBonus: amount * 0.05,
      weightedDividend: amount * 0.03,
      total:
        amount * 0.15 * referrals +
        amount * 0.02 * 4 +
        amount * 0.05 +
        amount * 0.03,
    };
  };

  const rewards = calculateRewards();

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          投资金额: {investmentAmount[0]} APEX
        </label>
        <Slider
          value={investmentAmount}
          onValueChange={setInvestmentAmount}
          max={10000}
          min={100}
          step={100}
          className="w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          推荐人数: {referralCount[0]}
        </label>
        <Slider
          value={referralCount}
          onValueChange={setReferralCount}
          max={50}
          min={0}
          step={1}
          className="w-full"
        />
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-800">预期收益</h3>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="text-sm text-gray-600">直推奖励</div>
            <div className="text-lg font-bold text-green-600">
              {rewards.directBonus.toFixed(2)}{" "}
              <span className="text-xs text-gray-500">APEX</span>
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="text-sm text-gray-600">层级奖励</div>
            <div className="text-lg font-bold text-green-600">
              {rewards.levelBonus.toFixed(2)}{" "}
              <span className="text-xs text-gray-500">APEX</span>
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="text-sm text-gray-600">管理奖励</div>
            <div className="text-lg font-bold text-green-600">
              {rewards.managementBonus.toFixed(2)}{" "}
              <span className="text-xs text-gray-500">APEX</span>
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="text-sm text-gray-600">加权分红</div>
            <div className="text-lg font-bold text-green-600">
              {rewards.weightedDividend.toFixed(2)}{" "}
              <span className="text-xs text-gray-500">APEX</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-1">总预期收益</div>
            <div className="text-2xl font-bold text-green-600">
              {rewards.total.toFixed(2)}{" "}
              <span className="text-sm text-gray-500">APEX</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
