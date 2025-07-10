"use client";

import type React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";

import {
  Bell,
  Wallet,
  Plus,
  Zap,
  Flame,
  BarChart,
  BarChart3,
  TrendingUp,
  DollarSign,
  Lock,
  Clock,
  Menu,
  X,
  Home,
  Coins,
  Users,
  User,
  ArrowRight,
  ArrowUpDown,
  Gift,
  HelpCircle,
  AlertCircle,
  Leaf,
  Download,
  Smartphone,
  Award,
  Calculator,
  Copy,
  Share2,
} from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { useWallet } from "@/contexts/wallet-context";
import LanguageSwitcher from "@/components/language-switcher";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

// Mock Data
const userData = {
  name: "Wallet 0x12...fEa3",
  totalStaked: 4798,
  adGenerated: 108,
  cap: 8000,
  adBalance: 45,
  totalAssets: {
    usdt: 719.67,
    apex: 4798, // 恢复APEX余额用于质押测试
  },
};

const platformData = {
  tvl: 19250728.94,
  apr: 9.16,
  apexBalance: 0,
  sApexBalance: 0,
  exchangeRate: 0.963363,
  availableToClaim: 0,
  myRewards: 0,
};

export default function HomeDashboard() {
  const { t } = useLanguage();
  const {
    isConnected,
    address,
    connectWallet,
    disconnectWallet,
    isConnecting,
  } = useWallet();
  const { toast } = useToast();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isStakeModalOpen, setIsStakeModalOpen] = useState(false);
  const [isUnstakeModalOpen, setIsUnstakeModalOpen] = useState(false);
  const [isSwapNoticeOpen, setIsSwapNoticeOpen] = useState(false);
  const [usdtAmount, setUsdtAmount] = useState("");
  const [apexAmount, setApexAmount] = useState("");
  const [isSwapLoading, setIsSwapLoading] = useState(false);
  const [swapSuccess, setSwapSuccess] = useState(false);
  const [stakeAmount, setStakeAmount] = useState("");
  const [stakeType, setStakeType] = useState<"7days" | "360days">("7days");
  const [isStakeLoading, setIsStakeLoading] = useState(false);
  const [stakeSuccess, setStakeSuccess] = useState(false);
  const [autoReinvest, setAutoReinvest] = useState(false);
  const [isCalculatorModalOpen, setIsCalculatorModalOpen] = useState(false);
  const [selectedVipType, setSelectedVipType] = useState<"vip1" | "vip2">(
    "vip1"
  );
  const [nodeQuantity, setNodeQuantity] = useState("1");
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [isPurchaseLoading, setIsPurchaseLoading] = useState(false);
  const [inviteSuccess, setInviteSuccess] = useState(false);

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

  const handleStakeClick = (type: "7days" | "360days") => {
    setStakeType(type);

    // 设置默认质押数量为用户当前APEX余额
    if (!stakeAmount) {
      setStakeAmount(userData.totalAssets.apex.toString());
    }

    setIsStakeModalOpen(true);
  };

  // 计算兑换数量
  const calculateApexAmount = (usdt: string) => {
    const usdtValue = parseFloat(usdt) || 0;
    const apexValue = (usdtValue * 1.038).toFixed(3);
    setApexAmount(apexValue);
  };

  // 处理USDT输入变化
  const handleUsdtChange = (value: string) => {
    setUsdtAmount(value);
    calculateApexAmount(value);
  };

  // 处理兑换确认
  const handleSwapConfirm = async () => {
    if (!usdtAmount || parseFloat(usdtAmount) <= 0) return;

    setIsSwapLoading(true);
    try {
      // 模拟兑换操作
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSwapSuccess(true);
      // 2秒后关闭弹窗
      setTimeout(() => {
        setIsSwapNoticeOpen(false);
        setSwapSuccess(false);
        setUsdtAmount("");
        setApexAmount("");
      }, 2000);
    } catch (error) {
      console.error("兑换失败:", error);
    } finally {
      setIsSwapLoading(false);
    }
  };

  // 处理质押确认
  const handleStakeConfirm = async () => {
    const finalStakeAmount = stakeAmount || "4798";
    if (!finalStakeAmount || parseFloat(finalStakeAmount) <= 0) return;

    setIsStakeLoading(true);
    try {
      // 模拟质押操作
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log(
        `质押成功: ${finalStakeAmount} APEX, 类型: ${stakeType}, 自动再质押: ${autoReinvest}`
      );

      // 显示成功状态
      setStakeSuccess(true);

      // 2秒后关闭弹窗并重置状态
      setTimeout(() => {
        setIsStakeModalOpen(false);
        setStakeSuccess(false);
        setStakeAmount("");
        setAutoReinvest(false);
      }, 2000);
    } catch (error) {
      console.error("质押失败:", error);
    } finally {
      setIsStakeLoading(false);
    }
  };

  // 处理节点购买确认
  const handlePurchaseConfirm = async () => {
    if (!nodeQuantity || parseInt(nodeQuantity) <= 0) return;

    setIsPurchaseLoading(true);
    try {
      // 模拟购买操作
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log(
        `购买成功: ${nodeQuantity}个 ${
          selectedVipType === "vip1" ? "VIP1" : "VIP2"
        } 节点`
      );

      // 显示成功状态
      setPurchaseSuccess(true);

      // 2秒后关闭弹窗并重置状态
      setTimeout(() => {
        setPurchaseSuccess(false);
        setNodeQuantity("1");
      }, 2000);
    } catch (error) {
      console.error("购买失败:", error);
    } finally {
      setIsPurchaseLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* 统一白色背景 */}
      <div className="absolute inset-0 bg-white"></div>

      {/* 页面内容容器 */}
      <div className="relative z-10">
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
                  <div className="text-xs text-gray-500">流动性质押</div>
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
              <p className="text-sm text-gray-600">
                通过 APEX 最大化您的质押收益
              </p>
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
                  <div className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors bg-green-50 text-gray-600">
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

        <div className="max-w-md mx-auto px-6 py-6 space-y-6">
          {/* 全网数据 - 动态轮播气泡 */}
          <div className="p-4 pb-1 -mt-10">
            {/* 动态轮播容器 */}
            <div className="relative h-16 overflow-hidden -mx-6">
              <div className="absolute inset-0 flex items-center">
                {/* 轮播数据气泡 */}
                <div className="flex animate-scroll-left space-x-2 whitespace-nowrap">
                  {/* 第一组数据 */}
                  <div className="flex items-center space-x-2">
                    <div className="bg-white/70 backdrop-blur-sm rounded-full px-3 py-1.5 border border-green-200/50 shadow-sm flex-shrink-0">
                      <span className="text-xs font-medium text-gray-700">
                        总锁定价值
                      </span>
                      <span className="ml-1.5 text-xs font-bold text-green-600">
                        $19.25M
                      </span>
                    </div>
                    <div className="bg-white/70 backdrop-blur-sm rounded-full px-3 py-1.5 border border-green-200/50 shadow-sm flex-shrink-0">
                      <span className="text-xs font-medium text-gray-700">
                        平均收益率
                      </span>
                      <span className="ml-1.5 text-xs font-bold text-green-600">
                        9.16%
                      </span>
                    </div>
                    <div className="bg-white/70 backdrop-blur-sm rounded-full px-3 py-1.5 border border-green-200/50 shadow-sm flex-shrink-0">
                      <span className="text-xs font-medium text-gray-700">
                        活跃用户
                      </span>
                      <span className="ml-1.5 text-xs font-bold text-green-600">
                        8,456
                      </span>
                    </div>
                    <div className="bg-white/70 backdrop-blur-sm rounded-full px-3 py-1.5 border border-green-200/50 shadow-sm flex-shrink-0">
                      <span className="text-xs font-medium text-gray-700">
                        AD价格
                      </span>
                      <span className="ml-1.5 text-xs font-bold text-green-600">
                        $2.89
                      </span>
                    </div>
                    <div className="bg-white/70 backdrop-blur-sm rounded-full px-3 py-1.5 border border-green-200/50 shadow-sm flex-shrink-0">
                      <span className="text-xs font-medium text-gray-700">
                        总销毁量
                      </span>
                      <span className="ml-1.5 text-xs font-bold text-green-600">
                        124,580
                      </span>
                    </div>
                    <div className="bg-white/70 backdrop-blur-sm rounded-full px-3 py-1.5 border border-green-200/50 shadow-sm flex-shrink-0">
                      <span className="text-xs font-medium text-gray-700">
                        节点总数
                      </span>
                      <span className="ml-1.5 text-xs font-bold text-green-600">
                        1,156
                      </span>
                    </div>
                  </div>
                  {/* 重复第二组数据以实现无缝循环 */}
                  <div className="flex items-center space-x-2">
                    <div className="bg-white/70 backdrop-blur-sm rounded-full px-3 py-1.5 border border-green-200/50 shadow-sm flex-shrink-0">
                      <span className="text-xs font-medium text-gray-700">
                        总锁定价值
                      </span>
                      <span className="ml-1.5 text-xs font-bold text-green-600">
                        $19.25M
                      </span>
                    </div>
                    <div className="bg-white/70 backdrop-blur-sm rounded-full px-3 py-1.5 border border-green-200/50 shadow-sm flex-shrink-0">
                      <span className="text-xs font-medium text-gray-700">
                        平均收益率
                      </span>
                      <span className="ml-1.5 text-xs font-bold text-green-600">
                        9.16%
                      </span>
                    </div>
                    <div className="bg-white/70 backdrop-blur-sm rounded-full px-3 py-1.5 border border-green-200/50 shadow-sm flex-shrink-0">
                      <span className="text-xs font-medium text-gray-700">
                        活跃用户
                      </span>
                      <span className="ml-1.5 text-xs font-bold text-green-600">
                        8,456
                      </span>
                    </div>
                    <div className="bg-white/70 backdrop-blur-sm rounded-full px-3 py-1.5 border border-green-200/50 shadow-sm flex-shrink-0">
                      <span className="text-xs font-medium text-gray-700">
                        AD价格
                      </span>
                      <span className="ml-1.5 text-xs font-bold text-green-600">
                        $2.89
                      </span>
                    </div>
                    <div className="bg-white/70 backdrop-blur-sm rounded-full px-3 py-1.5 border border-green-200/50 shadow-sm flex-shrink-0">
                      <span className="text-xs font-medium text-gray-700">
                        总销毁量
                      </span>
                      <span className="ml-1.5 text-xs font-bold text-green-600">
                        124,580
                      </span>
                    </div>
                    <div className="bg-white/70 backdrop-blur-sm rounded-full px-3 py-1.5 border border-green-200/50 shadow-sm flex-shrink-0">
                      <span className="text-xs font-medium text-gray-700">
                        节点总数
                      </span>
                      <span className="ml-1.5 text-xs font-bold text-green-600">
                        1,156
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 活动图片和质押功能区域 */}
          <div className="space-y-4 -mt-12">
            {/* 活动图片区域 */}
            <Link href="/activity">
              <div className="bg-gradient-to-r from-cyan-100 to-blue-100 rounded-lg overflow-hidden shadow-sm border border-gray-200 -mt-8 mb-3 cursor-pointer hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center p-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800 mb-1">
                      验证节点限量发售
                    </h3>
                    <p className="text-sm text-gray-600">
                      购买验证节点，享受1.2%日收益+额外权益！
                    </p>
                  </div>
                  <div className="w-20 h-16 ml-4">
                    <img
                      src="/apex-airdrop.png"
                      alt="节点限量发售"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>
            </Link>

            {/* 节点售卖区域 */}
            <div className="relative p-6">
              {/* 主要内容 */}
              <div className="relative z-10">
                {/* 标题和帮助按钮 */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold text-gray-800">
                      节点售卖
                    </h3>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <HelpCircle className="h-4 w-4 text-gray-500" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <Coins className="w-5 h-5" />
                            节点规则说明
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-3">
                          {/* 基础权益 */}
                          <div className="bg-white rounded-lg p-3 border border-green-200">
                            <div className="text-xs font-medium text-gray-800 mb-2">
                              🎯 基础权益
                            </div>
                            <div className="text-xs text-gray-700">
                              • 等同于360天质押合约（1.2%/天收益）
                              <br />• 配送5%（金本位）治理代币
                            </div>
                          </div>

                          {/* 额外权益 */}
                          <div className="bg-white rounded-lg p-3 border border-green-200">
                            <div className="text-xs font-medium text-gray-800 mb-2">
                              ✨ 额外权益
                            </div>
                            <div className="text-xs text-gray-700">
                              • 节点资金用于共建底池
                              <br />
                              • 享受提现手续费分红（VIP1/VIP2各30%）
                              <br />• 赠送工作室资格，享受10万USDT政策扶持
                            </div>
                          </div>

                          {/* 节点类型 */}
                          <div className="bg-white rounded-lg p-3 border border-green-200">
                            <div className="text-xs font-medium text-gray-800 mb-2">
                              📊 节点类型
                            </div>
                            <div className="text-xs text-gray-700">
                              • VIP 1：1000 USDT，限量1000份
                              <br />• VIP 2：5000 USDT，限量200份
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <div
                    className="flex items-center justify-between"
                    style={{ transform: "translateY(-27%)" }}
                  >
                    <p className="text-sm text-gray-600">
                      购买验证节点，获得持续收益
                    </p>
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="flex items-center gap-2 p-2 hover:bg-green-50 rounded-lg transition-all duration-200 cursor-pointer">
                          <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-md flex items-center justify-center">
                            <Gift className="w-3.5 h-3.5 text-white" />
                          </div>
                          <span className="text-sm text-green-700 font-medium underline">
                            邀请有礼
                          </span>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <Users className="w-5 h-5" />
                            邀请好友
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          {/* 节点邀请奖励 */}
                          <div className="bg-white rounded-lg p-3 border border-green-200">
                            <div className="text-xs font-medium text-gray-800 mb-2">
                              🎁 节点邀请奖励
                            </div>
                            <div className="text-xs text-gray-700">
                              • 邀请好友购买节点，即可获得10%奖励
                              <br />
                              • 奖励与被邀请人购买的节点类型相关
                              <br />
                              • VIP1节点：获得100 USDT奖励
                              <br />• VIP2节点：获得500 USDT奖励
                            </div>
                          </div>

                          {/* 邀请链接展示 */}
                          <div className="bg-white rounded-lg p-3 border border-green-200">
                            <div className="text-xs font-medium text-gray-800 mb-2">
                              🔗 您的专属邀请链接
                            </div>
                            <div className="bg-gray-50 rounded border p-2 text-xs text-gray-800 break-all">
                              https://apex-dapp.com/invite?ref=USER123456
                            </div>
                          </div>

                          {/* 操作按钮 */}
                          <div className="flex gap-2">
                            <Button
                              onClick={() => {
                                const inviteLink =
                                  "https://apex-dapp.com/invite?ref=USER123456";
                                navigator.clipboard.writeText(inviteLink);
                                setInviteSuccess(true);
                                setTimeout(() => setInviteSuccess(false), 3000);
                              }}
                              className="flex-1 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white"
                            >
                              <Copy className="w-4 h-4 mr-2" />
                              复制链接
                            </Button>
                            <Button
                              onClick={() => {
                                const shareData = {
                                  title: "APEX邀请",
                                  text: "加入APEX，开启您的DeFi收益之旅！",
                                  url: "https://apex-dapp.com/invite?ref=USER123456",
                                };
                                if (navigator.share) {
                                  navigator.share(shareData);
                                } else {
                                  // 降级处理
                                  navigator.clipboard.writeText(
                                    `${shareData.text} ${shareData.url}`
                                  );
                                  setInviteSuccess(true);
                                  setTimeout(
                                    () => setInviteSuccess(false),
                                    3000
                                  );
                                }
                              }}
                              variant="outline"
                              className="flex-1 border-green-500 text-green-600 hover:bg-green-50"
                            >
                              <Share2 className="w-4 h-4 mr-2" />
                              分享
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                {/* 节点类型选择 */}
                <div
                  className="grid grid-cols-2 gap-3 mb-4"
                  style={{ transform: "translateY(-20%)" }}
                >
                  <div className="relative bg-green-50 rounded-2xl p-4 border-2 border-green-500 text-center shadow-sm">
                    {/* HOT标签 */}
                    <div className="absolute -top-1 -left-1 z-10">
                      <div
                        className="bg-gradient-to-r from-yellow-200/70 via-yellow-300/70 to-yellow-400/70 text-gray-700 text-xs font-bold px-2 py-1 shadow-md"
                        style={{
                          clipPath:
                            "polygon(15% 0%, 85% 5%, 100% 40%, 90% 100%, 5% 95%, 0% 55%)",
                          minWidth: "35px",
                          minHeight: "20px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        HOT
                      </div>
                    </div>

                    <div className="text-sm font-medium text-gray-700 mb-1">
                      VIP 1
                    </div>
                    <div className="text-lg font-bold text-green-600">
                      1000 <span className="text-sm">USDT</span>
                    </div>
                    <div className="text-xs text-gray-600">限量1000份</div>
                  </div>
                  <div className="bg-green-50 rounded-2xl p-4 border-2 border-green-500 text-center shadow-sm">
                    <div className="text-sm font-medium text-gray-700 mb-1">
                      VIP 2
                    </div>
                    <div className="text-lg font-bold text-green-600">
                      5000 <span className="text-sm">USDT</span>
                    </div>
                    <div className="text-xs text-gray-600">限量200份</div>
                  </div>
                </div>

                {/* 购买按钮 */}
                <div style={{ transform: "translateY(-35%)" }}>
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="w-full bg-gradient-to-r from-teal-400 to-green-500 hover:from-teal-500 hover:to-green-600 text-white font-semibold py-3 px-6 rounded-2xl transition-colors flex items-center justify-center">
                        <Coins className="w-4 h-4 mr-2" />
                        购买节点 →
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>购买验证节点</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        {purchaseSuccess ? (
                          /* 购买成功状态显示 */
                          <div className="flex flex-col items-center py-6 space-y-6">
                            {/* 第一行：购买成功！ */}
                            <div className="text-lg font-semibold text-gray-900">
                              购买成功！
                            </div>

                            {/* 第二行：购买数量和类型 */}
                            <div className="text-center">
                              <div className="text-3xl font-bold text-green-600">
                                {nodeQuantity}
                              </div>
                              <div className="text-sm text-gray-500">
                                {selectedVipType === "vip1" ? "VIP1" : "VIP2"}{" "}
                                节点
                              </div>
                            </div>

                            {/* 第三行：确定按钮 */}
                            <Button
                              onClick={() => {
                                setPurchaseSuccess(false);
                                setNodeQuantity("1");
                              }}
                              className="bg-gradient-to-r from-teal-400 to-green-500 hover:from-teal-500 hover:to-green-600 text-white w-full"
                            >
                              确定
                            </Button>
                          </div>
                        ) : (
                          <>
                            <div>
                              <label className="text-sm font-medium text-gray-700 mb-2 block">
                                选择节点类型
                              </label>
                              <div className="grid grid-cols-2 gap-3">
                                <button
                                  className={`p-4 rounded-lg text-center transition-colors ${
                                    selectedVipType === "vip1"
                                      ? "bg-gradient-to-r from-teal-400 to-green-500 text-white"
                                      : "bg-green-50 border-2 border-green-500 text-gray-700 hover:bg-green-100"
                                  }`}
                                  onClick={() => setSelectedVipType("vip1")}
                                >
                                  <div className="text-lg font-medium">
                                    VIP 1
                                  </div>
                                </button>
                                <button
                                  className={`p-4 rounded-lg text-center transition-colors ${
                                    selectedVipType === "vip2"
                                      ? "bg-gradient-to-r from-teal-400 to-green-500 text-white"
                                      : "bg-green-50 border-2 border-green-500 text-gray-700 hover:bg-green-100"
                                  }`}
                                  onClick={() => setSelectedVipType("vip2")}
                                >
                                  <div className="text-lg font-medium">
                                    VIP 2
                                  </div>
                                </button>
                              </div>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-gray-700 mb-2 block">
                                购买数量
                              </label>
                              <Input
                                type="number"
                                placeholder="输入购买数量"
                                className="w-full"
                                min="1"
                                max="10"
                                value={nodeQuantity}
                                onChange={(e) =>
                                  setNodeQuantity(e.target.value)
                                }
                              />
                            </div>
                            <div className="bg-green-50 p-3 rounded-lg">
                              <div className="text-sm text-gray-600">
                                <div className="flex justify-between">
                                  <span>节点价格:</span>
                                  <span className="font-medium">
                                    {selectedVipType === "vip1"
                                      ? "1000"
                                      : "5000"}{" "}
                                    USDT
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span>购买数量:</span>
                                  <span className="font-medium">
                                    {nodeQuantity || "0"} 个
                                  </span>
                                </div>
                                <div className="flex justify-between border-t border-green-200 pt-2 mt-2">
                                  <span className="font-medium">总计:</span>
                                  <span className="font-bold text-green-600">
                                    {(
                                      (selectedVipType === "vip1"
                                        ? 1000
                                        : 5000) * (parseInt(nodeQuantity) || 0)
                                    ).toLocaleString()}{" "}
                                    USDT
                                  </span>
                                </div>
                              </div>
                            </div>
                            <Button
                              onClick={handlePurchaseConfirm}
                              disabled={
                                isPurchaseLoading ||
                                !nodeQuantity ||
                                parseInt(nodeQuantity) <= 0
                              }
                              className="w-full bg-gradient-to-r from-teal-400 to-green-500 hover:from-teal-500 hover:to-green-600 text-white disabled:opacity-50"
                            >
                              {isPurchaseLoading ? (
                                <>
                                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                  购买中...
                                </>
                              ) : (
                                "确认购买"
                              )}
                            </Button>
                          </>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>

            {/* 质押功能区域 */}
            <Card
              className="bg-gradient-to-br from-green-50 to-emerald-50 shadow-sm border border-gray-200 relative"
              style={{
                marginTop: "-0.38rem",
              }}
            >
              <CardContent className="p-6">
                {/* 右上角金币装饰 */}
                <div className="absolute top-6 right-6 flex items-center -space-x-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-green-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white z-10 opacity-80">
                    <span className="text-white font-bold text-lg">$</span>
                  </div>
                  <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-md border-2 border-white opacity-70">
                    <span className="text-white font-bold text-sm">€</span>
                  </div>
                  <div className="w-6 h-6 bg-gradient-to-br from-green-300 to-green-500 rounded-full flex items-center justify-center shadow-sm border-2 border-white -ml-1 opacity-60">
                    <span className="text-white font-bold text-xs">¥</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold text-gray-800">
                          静态质押
                        </h3>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                            >
                              <HelpCircle className="h-4 w-4 text-gray-500" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-2">
                                <Lock className="w-5 h-5" />
                                静态质押规则说明
                              </DialogTitle>
                            </DialogHeader>
                            <div className="space-y-3">
                              <div className="bg-white rounded-lg p-3 border border-green-200">
                                <div className="text-xs font-medium text-gray-800 mb-2">
                                  📋 基本规则
                                </div>
                                <div className="text-xs text-gray-700">
                                  • 利息发放：以币本位实时结算
                                  <br />
                                  • AD 生成：钱包中利息按金本位每天 1.2%
                                  <br />
                                  • 解押：无需服务费
                                  <br />• 提现：收取 10% 服务费（使用 AD 享 7
                                  折优惠）
                                </div>
                              </div>
                              <div className="bg-white rounded-lg p-3 border border-green-200">
                                <div className="text-xs font-medium text-gray-800 mb-2">
                                  ⏰ 7天质押合约
                                </div>
                                <div className="text-xs text-gray-700">
                                  • 每轮 0.05% 递增（支持一键复利）
                                  <br />
                                  • 第一轮：0.7%/天
                                  <br />
                                  • 第二轮：0.75%/天
                                  <br />
                                  • 第三轮：0.8%/天
                                  <br />• 利息递增，最高封顶 1.1%/天
                                </div>
                              </div>

                              <div className="bg-white rounded-lg p-3 border border-green-200">
                                <div className="text-xs font-medium text-gray-800 mb-2">
                                  🏆 360天质押合约
                                </div>
                                <div className="text-xs text-gray-700">
                                  • 固定利息：1.2%/天
                                  <br />
                                  • 治理代币奖励：按利息金本位发放 AD
                                  <br />• 长期收益更稳定
                                </div>
                              </div>
                              <div className="bg-white rounded-lg p-3 border border-green-200">
                                <div className="text-xs font-medium text-gray-800 mb-2">
                                  📥 提现规则
                                </div>
                                <div className="text-xs text-gray-700">
                                  • 单次提币：1-2000 枚 APEX
                                  <br />
                                  • ≤2000 枚：智能合约即时执行
                                  <br />• &gt;2000 枚：需人工审核
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                      <p className="text-sm text-gray-600">选择质押方案</p>
                    </div>
                  </div>
                </div>

                {/* 质押方案选择 */}
                <div className="space-y-3 mb-4">
                  {/* 7天质押选项 */}
                  <div
                    className="bg-white rounded-2xl p-4 border-2 border-green-500 bg-green-50 transition-all duration-200 cursor-pointer"
                    onClick={() => setStakeType("7days")}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {/* Logo区域 */}
                        <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-green-500 rounded-xl flex items-center justify-center">
                          <Clock className="w-6 h-6 text-white" />
                        </div>

                        {/* 信息区域 */}
                        <div className="flex items-center gap-3">
                          <div>
                            <div className="font-bold text-gray-800 text-lg">
                              7天质押
                            </div>
                            <div className="text-sm text-gray-500">
                              0.7%～1.1%/天
                            </div>
                            <div className="text-xs text-green-600">
                              递增收益
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 质押按钮 */}
                      <button
                        className="px-6 py-2 rounded-full font-medium transition-colors bg-gradient-to-r from-teal-400 to-green-500 hover:from-teal-500 hover:to-green-600 text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          setStakeType("7days");
                          setIsStakeModalOpen(true);
                        }}
                      >
                        质押
                      </button>
                    </div>
                  </div>

                  {/* 360天质押选项 */}
                  <div
                    className="bg-white rounded-2xl p-4 border-2 border-green-500 bg-green-50 transition-all duration-200 cursor-pointer"
                    onClick={() => setStakeType("360days")}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {/* Logo区域 */}
                        <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-green-500 rounded-xl flex items-center justify-center">
                          <Lock className="w-6 h-6 text-white" />
                        </div>

                        {/* 信息区域 */}
                        <div className="flex items-center gap-3">
                          <div>
                            <div className="font-bold text-gray-800 text-lg">
                              360天质押
                            </div>
                            <div className="text-sm text-gray-500">
                              1.2%/天+AD
                            </div>
                            <div className="text-xs text-green-600">
                              稳定收益
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 质押按钮 */}
                      <button
                        className="px-6 py-2 rounded-full font-medium transition-colors bg-gradient-to-r from-teal-400 to-green-500 hover:from-teal-500 hover:to-green-600 text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          setStakeType("360days");
                          setIsStakeModalOpen(true);
                        }}
                      >
                        质押
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 兑换APEX弹窗 */}
        <Dialog open={isSwapNoticeOpen} onOpenChange={setIsSwapNoticeOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-orange-500" />
                兑换APEX
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">💵</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-orange-800">
                      1 USDT = 1.038 APEX
                    </h4>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Input
                      type="number"
                      placeholder="输入USDT数量"
                      className="flex-1"
                      value={usdtAmount}
                      onChange={(e) => handleUsdtChange(e.target.value)}
                    />
                    <span className="text-sm text-gray-600">USDT</span>
                  </div>
                  <div className="text-center">
                    <ArrowRight className="w-4 h-4 text-green-400 mx-auto" />
                  </div>
                  <div className="flex items-center gap-3">
                    <Input
                      type="number"
                      placeholder="获得APEX数量"
                      className="flex-1"
                      value={apexAmount}
                      readOnly
                    />
                    <span className="text-sm text-gray-600">APEX</span>
                  </div>
                </div>
              </div>

              {swapSuccess ? (
                <div className="flex flex-col items-center py-6 space-y-6">
                  {/* 第一行：兑换成功！ */}
                  <div className="text-lg font-semibold text-gray-900">
                    兑换成功！
                  </div>

                  {/* 第二行：兑换数量 */}
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">
                      {apexAmount}
                    </div>
                    <div className="text-sm text-gray-500">APEX</div>
                  </div>

                  {/* 第三行：确定按钮 */}
                  <Button
                    onClick={() => {
                      setIsSwapNoticeOpen(false);
                      setSwapSuccess(false);
                      setUsdtAmount("");
                      setApexAmount("");
                    }}
                    className="bg-gradient-to-r from-teal-400 to-green-500 hover:from-teal-500 hover:to-green-600 text-white w-full"
                  >
                    确定
                  </Button>
                </div>
              ) : (
                <div className="text-center">
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setIsSwapNoticeOpen(false)}
                      className="flex-1"
                      disabled={isSwapLoading}
                    >
                      取消
                    </Button>
                    <Button
                      onClick={handleSwapConfirm}
                      className="flex-1 bg-gradient-to-r from-teal-400 to-green-500 hover:from-teal-500 hover:to-green-600 text-white disabled:opacity-50"
                      disabled={
                        isSwapLoading ||
                        !usdtAmount ||
                        parseFloat(usdtAmount) <= 0
                      }
                    >
                      {isSwapLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          兑换中...
                        </>
                      ) : (
                        "确认兑换"
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* 质押弹窗 */}
        <Dialog open={isStakeModalOpen} onOpenChange={setIsStakeModalOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-gray-800">
                {stakeType === "7days" ? "7天质押" : "360天质押"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {stakeSuccess ? (
                /* 成功状态显示 */
                <div className="flex flex-col items-center py-6 space-y-6">
                  {/* 第一行：质押成功！ */}
                  <div className="text-lg font-semibold text-gray-900">
                    质押成功！
                  </div>

                  {/* 第二行：质押数量 */}
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">
                      {stakeAmount || "4798"}
                    </div>
                    <div className="text-sm text-gray-500">APEX</div>
                  </div>

                  {/* 第三行：确定按钮 */}
                  <Button
                    onClick={() => {
                      setIsStakeModalOpen(false);
                      setStakeSuccess(false);
                      setStakeAmount("");
                      setAutoReinvest(false);
                    }}
                    className="bg-gradient-to-r from-teal-400 to-green-500 hover:from-teal-500 hover:to-green-600 text-white w-full"
                  >
                    确定
                  </Button>
                </div>
              ) : (
                <>
                  {/* 原押数量显示 */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      原押数量
                    </label>
                    <div className="bg-green-50 p-4 rounded-lg border border-gray-200">
                      <div className="text-center">
                        <span className="text-2xl font-bold text-gray-800">
                          {stakeAmount || "4798"} APEX
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 输入数量区域 */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-gray-700">
                        原押数量
                      </label>
                      <span className="text-xs text-gray-500">
                        余额: {userData.totalAssets.apex} APEX
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Input
                        type="number"
                        placeholder="47981"
                        className="flex-1 text-center font-medium text-lg border-green-500"
                        value={stakeAmount || "47981"}
                        onChange={(e) => setStakeAmount(e.target.value)}
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-green-500 text-green-600 hover:bg-green-50 px-4"
                        onClick={() =>
                          setStakeAmount(userData.totalAssets.apex.toString())
                        }
                      >
                        最大
                      </Button>
                    </div>

                    {/* 余额不足提示 */}
                    {stakeAmount &&
                      parseFloat(stakeAmount) > userData.totalAssets.apex && (
                        <div className="mt-3 bg-orange-50 p-3 rounded-lg border border-orange-200">
                          <div className="flex items-center gap-2 text-sm text-orange-800 mb-3">
                            <span>💰</span>
                            <span>余额不足，兑换APEX</span>
                          </div>
                          <Button
                            size="sm"
                            className="w-full bg-gradient-to-r from-teal-400 to-green-500 hover:from-teal-500 hover:to-green-600 text-white"
                            onClick={() => {
                              const neededApex =
                                parseFloat(stakeAmount) -
                                userData.totalAssets.apex;
                              const neededUsdt = (neededApex / 1.038).toFixed(
                                2
                              );
                              setUsdtAmount(neededUsdt);
                              calculateApexAmount(neededUsdt);
                              setIsSwapNoticeOpen(true);
                            }}
                          >
                            去兑换
                          </Button>
                        </div>
                      )}
                  </div>

                  {/* 质押信息 */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">原押期限:</span>
                      <span className="font-medium text-gray-800">
                        {stakeType === "7days" ? "7天" : "360天"}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">预期日收益:</span>
                      <span className="font-medium text-gray-800">
                        {stakeType === "7days" ? "0.7%" : "1.2%"}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">预计日收益:</span>
                      <span className="font-medium text-gray-800">
                        {(
                          parseFloat(stakeAmount || "4798") *
                          (stakeType === "7days" ? 0.007 : 0.012)
                        ).toFixed(2)}{" "}
                        APEX
                      </span>
                    </div>
                  </div>

                  {/* 自动再质押开关 - 仅7天质押显示 */}
                  {stakeType === "7days" && (
                    <div className="flex items-center justify-between py-3">
                      <span className="text-sm font-medium text-gray-700">
                        自动再质押
                      </span>
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={autoReinvest}
                          onChange={(e) => setAutoReinvest(e.target.checked)}
                          className="sr-only"
                        />
                        <div
                          className={`w-12 h-6 rounded-full border-2 transition-colors cursor-pointer ${
                            autoReinvest
                              ? "bg-green-500 border-green-500"
                              : "bg-gray-200 border-gray-300"
                          }`}
                          onClick={() => setAutoReinvest(!autoReinvest)}
                        >
                          <div
                            className={`w-4 h-4 bg-white rounded-full transition-transform ${
                              autoReinvest ? "translate-x-6" : "translate-x-0"
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 操作按钮 */}
                  <div className="flex gap-3 pt-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsStakeModalOpen(false);
                        setAutoReinvest(false);
                      }}
                      className="flex-1"
                      disabled={isStakeLoading}
                    >
                      取消
                    </Button>
                    <Button
                      onClick={handleStakeConfirm}
                      className={`flex-1 text-white disabled:opacity-50 ${
                        stakeAmount &&
                        parseFloat(stakeAmount) > userData.totalAssets.apex
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-teal-400 to-green-500 hover:from-teal-500 hover:to-green-600"
                      }`}
                      disabled={
                        isStakeLoading ||
                        Boolean(
                          stakeAmount &&
                            parseFloat(stakeAmount) > userData.totalAssets.apex
                        )
                      }
                    >
                      {isStakeLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          质押中...
                        </>
                      ) : stakeAmount &&
                        parseFloat(stakeAmount) > userData.totalAssets.apex ? (
                        "余额不足，请先兑换"
                      ) : (
                        "确认质押"
                      )}
                    </Button>
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
                Unstake APEX
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Amount to Unstake
                </label>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  className="mt-1"
                />
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="text-sm text-yellow-800">
                  <div className="font-medium mb-1">Notice:</div>
                  <div>10% service fee applies to reward withdrawals</div>
                </div>
              </div>
              <Button className="w-full bg-gradient-to-r from-teal-400 to-green-500 hover:from-teal-500 hover:to-green-600 text-white">
                Confirm Unstake
              </Button>
            </div>
          </DialogContent>
        </Dialog>

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

        {/* 邀请成功弹窗 */}
        <Dialog open={inviteSuccess} onOpenChange={setInviteSuccess}>
          <DialogContent className="max-w-sm">
            <div className="flex flex-col items-center py-6 space-y-6">
              {/* 第一行：邀请成功！ */}
              <div className="text-lg font-semibold text-gray-900">
                邀请成功！
              </div>

              {/* 第二行：成功图标或文字 */}
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">✓</div>
                <div className="text-sm text-gray-500">链接已复制</div>
              </div>

              {/* 第三行：确定按钮 */}
              <Button
                onClick={() => setInviteSuccess(false)}
                className="bg-gradient-to-r from-teal-400 to-green-500 hover:from-teal-500 hover:to-green-600 text-white w-full"
              >
                确定
              </Button>
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
