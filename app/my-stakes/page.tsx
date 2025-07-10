"use client";

import type React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Bell,
  Wallet,
  Plus,
  Zap,
  Flame,
  BarChart,
  BarChart3,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  DollarSign,
  Lock,
  Clock,
  Menu,
  X,
  Home,
  Coins,
  ArrowUpDown,
  Users,
  User,
  ArrowRight,
  Gift,
  HelpCircle,
  Calculator,
  ArrowLeft,
  AlertCircle,
  CheckCircle,
  XCircle,
  ArrowDownToLine,
  RotateCcw,
  Download,
  AlertTriangle,
  Leaf,
  Target,
} from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { useWallet } from "@/contexts/wallet-context";
import LanguageSwitcher from "@/components/language-switcher";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MyStakesPage() {
  const { t } = useLanguage();
  const {
    isConnected,
    address,
    connectWallet,
    disconnectWallet,
    isConnecting,
  } = useWallet();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUnstakeModalOpen, setIsUnstakeModalOpen] = useState(false);
  const [selectedStake, setSelectedStake] = useState<any>(null);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [isSwapModalOpen, setIsSwapModalOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [swapAmount, setSwapAmount] = useState("");
  const [flashSwapSuccess, setFlashSwapSuccess] = useState(false);
  const [isFlashSwapLoading, setIsFlashSwapLoading] = useState(false);
  const [unstakeSuccess, setUnstakeSuccess] = useState(false);
  const [isUnstakeLoading, setIsUnstakeLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"staking" | "completed">(
    "staking"
  );
  const pathname = usePathname();

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

  // AD价格数据
  const adData = {
    currentPrice: 1.23,
    dailyIncrease: 0.1,
    userBalance: 45,
    initialPrice: 1.0,
    daysActive: 23,
  };

  // K线图数据 - 最近7天的价格走势
  const klineData = [
    { date: "12/18", price: 1.0 },
    { date: "12/19", price: 1.1 },
    { date: "12/20", price: 1.15 },
    { date: "12/21", price: 1.18 },
    { date: "12/22", price: 1.2 },
    { date: "12/23", price: 1.22 },
    { date: "12/24", price: 1.23 },
  ];

  // 计算闪兑价格 (系统定价的70%)
  const flashSwapPrice = adData.currentPrice * 0.7;

  // 计算闪兑收益
  const calculateSwapValue = (amount: string) => {
    const numAmount = parseFloat(amount) || 0;
    return (numAmount * flashSwapPrice).toFixed(2);
  };

  // 质押记录数据
  const stakingRecords = [
    {
      id: 1,
      type: "7天质押",
      amount: 1000,
      round: 3,
      dailyRate: 0.8,
      startDate: "2024-12-20",
      endDate: "2024-12-27",
      earnedApex: 56,
      generatedAd: 12.5,
      status: "staking",
      daysLeft: 2,
      autoReinvest: true, // 7天质押的自动再质押状态
    },
    {
      id: 2,
      type: "360天质押",
      amount: 5000,
      round: 1,
      dailyRate: 1.2,
      startDate: "2024-12-15",
      endDate: "2025-12-10",
      earnedApex: 360,
      generatedAd: 75,
      status: "staking",
      daysLeft: 350,
      autoReinvest: false, // 360天质押不支持自动再质押
    },
    {
      id: 3,
      type: "7天质押",
      amount: 800,
      round: 2,
      dailyRate: 0.75,
      startDate: "2024-12-10",
      endDate: "2024-12-17",
      earnedApex: 42,
      generatedAd: 10.08,
      status: "completed",
      daysLeft: 0,
      autoReinvest: false, // 已完成的记录
    },
    {
      id: 4,
      type: "7天质押",
      amount: 1200,
      round: 1,
      dailyRate: 0.7,
      startDate: "2024-12-05",
      endDate: "2024-12-12",
      earnedApex: 58.8,
      generatedAd: 14.11,
      status: "completed",
      daysLeft: 0,
      autoReinvest: true, // 已完成但之前开启了自动再质押
    },
  ];

  // 根据当前标签过滤记录
  const filteredRecords = stakingRecords.filter((record) =>
    activeTab === "staking"
      ? record.status === "staking"
      : record.status === "completed"
  );

  // 质押统计数据
  const stakingStats = {
    totalStaked: 4798,
    dailyRewards: 57.58,
    adGenerated: 108,
    availableRewards: 245.67,
  };

  const withdrawHistory = [
    {
      id: 1,
      amount: 150,
      fee: 15,
      received: 135,
      useAd: false,
      time: "2小时前",
      status: "完成",
      txHash: "0x123...abc",
    },
    {
      id: 2,
      amount: 200,
      fee: 20,
      received: 200,
      useAd: true,
      time: "1天前",
      status: "完成",
      txHash: "0x456...def",
    },
    {
      id: 3,
      amount: 2100,
      fee: 210,
      received: 0,
      useAd: false,
      time: "2天前",
      status: "审核中",
      txHash: "",
    },
  ];

  const handleUnstake = (stake: any) => {
    setSelectedStake(stake);
    setIsUnstakeModalOpen(true);
  };

  // 处理提取
  const handleWithdraw = () => {
    // 这里添加提取逻辑
    console.log("提取", withdrawAmount, "AD");
    setIsWithdrawModalOpen(false);
    setWithdrawAmount("");
  };

  // 处理闪兑
  const handleFlashSwap = async () => {
    if (!swapAmount || parseFloat(swapAmount) <= 0) return;

    setIsFlashSwapLoading(true);
    try {
      // 模拟闪兑操作
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log(
        "闪兑AD",
        swapAmount,
        "个，收到",
        calculateSwapValue(swapAmount),
        "USDT"
      );

      // 显示成功状态
      setFlashSwapSuccess(true);

      // 2秒后关闭弹窗并重置状态
      setTimeout(() => {
        setIsSwapModalOpen(false);
        setFlashSwapSuccess(false);
        setSwapAmount("");
      }, 2000);
    } catch (error) {
      console.error("闪兑失败:", error);
    } finally {
      setIsFlashSwapLoading(false);
    }
  };

  // 处理解除质押确认
  const handleUnstakeConfirm = async () => {
    if (!selectedStake) return;

    setIsUnstakeLoading(true);
    try {
      // 模拟解除质押操作
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log(
        "解除质押成功:",
        selectedStake.amount,
        "APEX，类型:",
        selectedStake.type
      );

      // 显示成功状态
      setUnstakeSuccess(true);

      // 2秒后关闭弹窗并重置状态
      setTimeout(() => {
        setIsUnstakeModalOpen(false);
        setUnstakeSuccess(false);
        setSelectedStake(null);
      }, 2000);
    } catch (error) {
      console.error("解除质押失败:", error);
    } finally {
      setIsUnstakeLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white relative">
      {/* 顶部导航栏 */}
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
                <div className="text-xs text-gray-500">我的质押</div>
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
            <p className="text-sm text-gray-600">管理您的质押记录</p>
          </div>
        </div>
      </header>

      {/* 导航下拉菜单 */}
      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
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
                      // 这里可以添加收益计算器弹窗逻辑
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-white hover:bg-green-50 text-green-600 rounded-full border border-green-500"
                  >
                    <Calculator className="h-4 w-4 mr-2" />
                    收益计算器
                  </Button>
                  <Button
                    onClick={() => {
                      connectWallet();
                      setIsMenuOpen(false);
                    }}
                    disabled={isConnecting}
                    className="w-full bg-gradient-to-r from-teal-400 to-green-500 hover:from-teal-500 hover:to-green-600 text-white rounded-full"
                  >
                    <Wallet className="h-4 w-4 mr-2" />
                    {isConnecting
                      ? "连接中..."
                      : isConnected
                      ? "已连接"
                      : "连接钱包"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="max-w-md mx-auto px-6 py-6 space-y-6 relative z-10">
        {/* 质押统计概览 */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <BarChart className="w-5 h-5 text-green-600" />
            <span className="text-lg font-semibold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              质押概览
            </span>
          </div>

          <Card className="bg-white shadow-lg border border-green-400/30">
            <CardContent className="p-0">
              <div className="grid grid-cols-4">
                <div className="text-left p-4 bg-white">
                  <div className="text-xl font-bold text-gray-900">
                    {stakingStats.totalStaked.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">APEX</div>
                  <div className="text-xs text-gray-600">总质押量</div>
                </div>
                <div className="text-left p-4 bg-green-50">
                  <div className="text-xl font-bold text-gray-600">
                    {(stakingStats.dailyRewards * 30).toFixed(1)}
                  </div>
                  <div className="text-xs text-gray-500">APEX</div>
                  <div className="text-xs text-gray-600">累计利息</div>
                </div>
                <div className="text-left p-4 bg-white">
                  <div className="text-xl font-bold text-green-600">
                    {stakingStats.availableRewards}
                  </div>
                  <div className="text-xs text-gray-500">APEX</div>
                  <div className="text-xs text-gray-600">未领取</div>
                </div>
                <div className="text-left p-4 bg-green-50">
                  <div className="text-xl font-bold text-gray-800">
                    {stakingStats.adGenerated}
                  </div>
                  <div className="text-xs text-gray-500">AD</div>
                  <div className="text-xs text-gray-600">累计产出</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AD 价格卡片 */}
        <Card className="bg-white shadow-sm border border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                  <Target className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-800">AD价格</div>
                  <div className="text-xs text-gray-600">
                    余额: {adData.userBalance} AD
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">
                  ${adData.currentPrice}
                </div>
                <div className="text-sm text-gray-600">
                  每日+${adData.dailyIncrease}
                </div>
              </div>
            </div>

            {/* K线图 */}
            <div className="mb-4">
              <div className="text-sm font-medium text-gray-700 mb-2">
                价格走势
              </div>
              <div className="h-32 bg-green-50 rounded-lg p-3 relative">
                <svg className="w-full h-full" viewBox="0 0 280 100">
                  {/* 绘制网格线 */}
                  <defs>
                    <pattern
                      id="grid"
                      width="40"
                      height="20"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 40 0 L 0 0 0 20"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="0.5"
                      />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />

                  {/* 绘制K线 */}
                  {klineData.map((item, index) => {
                    const maxPrice = Math.max(...klineData.map((d) => d.price));
                    const minPrice = Math.min(...klineData.map((d) => d.price));
                    const x = index * 40 + 20; // 每个点间隔40px
                    const y =
                      80 -
                      ((item.price - minPrice) / (maxPrice - minPrice)) * 60; // 反转Y轴

                    return (
                      <g key={index}>
                        {/* 绘制连接线 */}
                        {index > 0 && (
                          <line
                            x1={(index - 1) * 40 + 20}
                            y1={
                              80 -
                              ((klineData[index - 1].price - minPrice) /
                                (maxPrice - minPrice)) *
                                60
                            }
                            x2={x}
                            y2={y}
                            stroke="url(#gradient)"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        )}

                        {/* 绘制数据点 */}
                        <circle
                          cx={x}
                          cy={y}
                          r="3"
                          fill="#3b82f6"
                          stroke="#ffffff"
                          strokeWidth="2"
                          className="hover:r-4 transition-all duration-200"
                        >
                          <title>{`${item.date}: $${item.price}`}</title>
                        </circle>
                      </g>
                    );
                  })}

                  {/* 渐变定义 */}
                  <defs>
                    <linearGradient
                      id="gradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* 底部日期标签 */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2">
                  {klineData.map((item, index) => (
                    <div
                      key={index}
                      className="text-xs text-gray-500 font-medium"
                    >
                      {item.date}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="flex gap-3">
              <Button
                onClick={() => setIsSwapModalOpen(true)}
                className="flex-1 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white"
              >
                <ArrowUpDown className="w-4 h-4 mr-2" />
                闪兑
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 质押记录 */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Lock className="w-5 h-5 text-green-600" />
            <span className="text-lg font-semibold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              质押记录
            </span>
          </div>

          {/* 分页标签 */}
          <div className="flex bg-gray-100 rounded-lg p-1 mb-4">
            <button
              onClick={() => setActiveTab("staking")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === "staking"
                  ? "bg-white text-green-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              质押中 (
              {stakingRecords.filter((r) => r.status === "staking").length})
            </button>
            <button
              onClick={() => setActiveTab("completed")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === "completed"
                  ? "bg-white text-green-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              已完成 (
              {stakingRecords.filter((r) => r.status === "completed").length})
            </button>
          </div>

          {/* 质押记录列表 */}
          <div className="space-y-4">
            {filteredRecords.map((record) => (
              <Card
                key={record.id}
                className="bg-white shadow-sm border border-gray-200"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          record.status === "staking"
                            ? "bg-green-100"
                            : "bg-gray-100"
                        }`}
                      >
                        {record.status === "staking" ? (
                          <Lock className="w-5 h-5 text-green-600" />
                        ) : (
                          <CheckCircle className="w-5 h-5 text-gray-600" />
                        )}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">
                          {record.type}
                        </div>
                        <div className="text-sm text-gray-600">
                          第{record.round}轮 · {record.dailyRate}%/天
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          record.status === "staking"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {record.status === "staking"
                          ? `剩余${record.daysLeft}天`
                          : "已完成"}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">质押金额:</span>
                      <span className="font-medium text-gray-900">
                        {record.amount.toLocaleString()} APEX
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">产出APEX:</span>
                      <span className="font-medium text-green-600">
                        {record.earnedApex} APEX
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">产生AD:</span>
                      <span className="font-medium text-blue-600">
                        {record.generatedAd} AD
                      </span>
                    </div>
                    {/* 7天质押显示自动再质押状态 */}
                    {record.type === "7天质押" && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">自动再质押:</span>
                        <span
                          className={`font-medium ${
                            record.autoReinvest
                              ? "text-green-600"
                              : "text-gray-600"
                          }`}
                        >
                          {record.autoReinvest ? "已开启" : "已关闭"}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">质押期间:</span>
                      <span className="font-medium text-gray-900">
                        {record.startDate} ~ {record.endDate}
                      </span>
                    </div>
                  </div>

                  {/* 根据质押类型显示不同的按钮 */}
                  {record.status === "staking" && record.type === "7天质押" && (
                    <div className="mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleUnstake(record)}
                        className="w-full"
                      >
                        解除质押
                      </Button>
                    </div>
                  )}
                  {/* 360天质押不显示任何按钮 */}
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredRecords.length === 0 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500">
                {activeTab === "staking"
                  ? "暂无质押中的记录"
                  : "暂无已完成的记录"}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 提取AD弹窗 */}
      <Dialog open={isWithdrawModalOpen} onOpenChange={setIsWithdrawModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Download className="w-5 h-5 text-gray-500" />
              提取AD
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                  <Target className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">
                    余额: {adData.userBalance} AD
                  </h4>
                  <p className="text-sm text-gray-600">免费提取到钱包</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  提取数量
                </label>
                <div className="flex items-center gap-3">
                  <Input
                    type="number"
                    placeholder="输入提取数量"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="flex-1"
                    max={adData.userBalance}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setWithdrawAmount(adData.userBalance.toString())
                    }
                    className="shrink-0"
                  >
                    全部
                  </Button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setIsWithdrawModalOpen(false)}
                  className="flex-1"
                >
                  取消
                </Button>
                <Button
                  onClick={handleWithdraw}
                  disabled={
                    !withdrawAmount ||
                    parseFloat(withdrawAmount) <= 0 ||
                    parseFloat(withdrawAmount) > adData.userBalance
                  }
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white"
                >
                  确认提取
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 闪兑AD弹窗 */}
      <Dialog open={isSwapModalOpen} onOpenChange={setIsSwapModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ArrowUpDown className="w-5 h-5 text-gray-500" />
              闪兑AD
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {flashSwapSuccess ? (
              /* 闪兑成功状态显示 */
              <div className="flex flex-col items-center py-6 space-y-6">
                {/* 第一行：闪兑成功！ */}
                <div className="text-lg font-semibold text-gray-900">
                  闪兑成功！
                </div>

                {/* 第二行：收到金额 */}
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">
                    {calculateSwapValue(swapAmount)}
                  </div>
                  <div className="text-sm text-gray-500">USDT</div>
                </div>

                {/* 第三行：确定按钮 */}
                <Button
                  onClick={() => {
                    setIsSwapModalOpen(false);
                    setFlashSwapSuccess(false);
                    setSwapAmount("");
                  }}
                  className="bg-gradient-to-r from-teal-400 to-green-500 hover:from-teal-500 hover:to-green-600 text-white w-full"
                >
                  确定
                </Button>
              </div>
            ) : (
              <>
                <div className="bg-green-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                      <Zap className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">
                        闪兑价格: ${flashSwapPrice.toFixed(2)} USDT
                      </h4>
                      <p className="text-sm text-gray-600">
                        系统定价70%，即时到账
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      闪兑数量
                    </label>
                    <div className="flex items-center gap-3">
                      <Input
                        type="number"
                        placeholder="输入闪兑数量"
                        value={swapAmount}
                        onChange={(e) => setSwapAmount(e.target.value)}
                        className="flex-1"
                        max={adData.userBalance}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setSwapAmount(adData.userBalance.toString())
                        }
                        className="shrink-0"
                      >
                        全部
                      </Button>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-gray-600">预计收到:</span>
                      <span className="text-gray-600">
                        ${calculateSwapValue(swapAmount)} USDT
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setIsSwapModalOpen(false)}
                      className="flex-1"
                      disabled={isFlashSwapLoading}
                    >
                      取消
                    </Button>
                    <Button
                      onClick={handleFlashSwap}
                      disabled={
                        isFlashSwapLoading ||
                        !swapAmount ||
                        parseFloat(swapAmount) <= 0 ||
                        parseFloat(swapAmount) > adData.userBalance
                      }
                      className="flex-1 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white disabled:opacity-50"
                    >
                      {isFlashSwapLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          闪兑中...
                        </>
                      ) : (
                        "确认闪兑"
                      )}
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* 解押弹窗 */}
      <Dialog open={isUnstakeModalOpen} onOpenChange={setIsUnstakeModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-800">
              解除质押
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {unstakeSuccess ? (
              /* 解押成功状态显示 */
              <div className="flex flex-col items-center py-6 space-y-6">
                {/* 第一行：解押成功！ */}
                <div className="text-lg font-semibold text-gray-900">
                  解押成功！
                </div>

                {/* 第二行：解押金额 */}
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">
                    {selectedStake?.amount || 0}
                  </div>
                  <div className="text-sm text-gray-500">APEX</div>
                </div>

                {/* 第三行：确定按钮 */}
                <Button
                  onClick={() => {
                    setIsUnstakeModalOpen(false);
                    setUnstakeSuccess(false);
                    setSelectedStake(null);
                  }}
                  className="bg-gradient-to-r from-teal-400 to-green-500 hover:from-teal-500 hover:to-green-600 text-white w-full"
                >
                  确定
                </Button>
              </div>
            ) : (
              selectedStake && (
                <>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-2">质押详情:</div>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span>类型:</span>
                        <span className="font-medium">
                          {selectedStake.type}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>已质押:</span>
                        <span className="font-medium">
                          {selectedStake.amount} APEX
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>已获得:</span>
                        <span className="font-medium text-gray-600">
                          {selectedStake.earnedApex} APEX
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="text-sm text-yellow-800">
                      <div className="font-medium mb-1">注意:</div>
                      <div>
                        解除质押将结束您的质押合约。任何待处理的利息将自动提取。
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setIsUnstakeModalOpen(false)}
                      disabled={isUnstakeLoading}
                    >
                      取消
                    </Button>
                    <Button
                      onClick={handleUnstakeConfirm}
                      disabled={isUnstakeLoading}
                      className="flex-1 bg-gradient-to-r from-teal-400 to-green-500 hover:from-teal-500 hover:to-green-600 text-white disabled:opacity-50"
                    >
                      {isUnstakeLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          解押中...
                        </>
                      ) : (
                        "确认解押"
                      )}
                    </Button>
                  </div>
                </>
              )
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
