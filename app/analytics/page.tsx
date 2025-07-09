"use client";

import type React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Menu,
  X,
  Home,
  Coins,
  ArrowUpDown,
  Users,
  User,
  TrendingUp,
  Award,
  DollarSign,
  Calculator,
  Wallet,
  Plus,
  Share2,
  Target,
  Layers,
  Crown,
  Zap,
  AlertCircle,
  AlertTriangle,
  Leaf,
  Gem,
  Gift,
  BarChart3,
  ChevronDown,
  ChevronUp,
  Copy,
} from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/language-context";
import { Slider } from "@/components/ui/slider";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWallet } from "@/contexts/wallet-context";
import LanguageSwitcher from "@/components/language-switcher";

// 动态收益数据
const dynamicRewardsData = {
  directBonus: {
    rate: 15, // 15%
    earned: 145.5,
    referrals: 5,
    validReferrals: 3, // ≥10 APEX的有效推荐
  },
  levelBonus: {
    rate: 2, // 2%
    earned: 89.2,
    layers: 7, // 当前可拿层数
    maxLayers: 15,
  },
  managementBonus: {
    earned: 1250.8,
    smallAreaPower: 15420, // 小区算力
    totalNetworkPower: 158000, // 全网算力
    percentage: 9.76, // 占比
  },
  weightedDividend: {
    earned: 880.3,
    sevenDayIncrease: 2340, // 7日新增算力
    totalSevenDayIncrease: 45600, // 全网7日新增
    percentage: 5.13, // 占比
  },
  // 封顶机制数据
  capData: {
    stakedAmount: 200, // 质押量（最大200）
    burnedAmount: 50, // 销毁量
    withdrawnAmount: 800, // 已提现
    totalEarned: 1485.8, // 总获得收益（直推奖+层级奖+管理奖+加权分红）
  },
};

// 团队层级数据
const teamLevelsData = [
  {
    level: 1,
    directCount: 5, // 人数
    levelCount: 5, // 层级人数
    totalStaked: 1250, // 层级总质押量
    referrals: [
      { address: "0x1234...5678", staked: 250, isDirect: true },
      { address: "0x2345...6789", staked: 300, isDirect: true },
      { address: "0x3456...7890", staked: 200, isDirect: true },
      { address: "0x4567...8901", staked: 350, isDirect: true },
      { address: "0x5678...9012", staked: 150, isDirect: true },
    ],
  },
  {
    level: 2,
    directCount: 5, // 第一层的人数
    levelCount: 12, // 第二层总人数
    totalStaked: 2340,
    referrals: [
      { address: "0x6789...0123", staked: 180, isDirect: false },
      { address: "0x7890...1234", staked: 220, isDirect: false },
      { address: "0x8901...2345", staked: 190, isDirect: false },
      { address: "0x9012...3456", staked: 280, isDirect: false },
      { address: "0x0123...4567", staked: 160, isDirect: false },
      { address: "0x1122...3344", staked: 200, isDirect: false },
      { address: "0x2233...4455", staked: 170, isDirect: false },
      { address: "0x3344...5566", staked: 240, isDirect: false },
      { address: "0x4455...6677", staked: 150, isDirect: false },
      { address: "0x5566...7788", staked: 190, isDirect: false },
      { address: "0x6677...8899", staked: 210, isDirect: false },
      { address: "0x7788...9900", staked: 180, isDirect: false },
    ],
  },
  {
    level: 3,
    directCount: 5,
    levelCount: 28,
    totalStaked: 4560,
    referrals: [
      { address: "0x1357...2468", staked: 120, isDirect: false },
      { address: "0x2468...3579", staked: 140, isDirect: false },
      { address: "0x3579...4680", staked: 110, isDirect: false },
      { address: "0x4680...5791", staked: 200, isDirect: false },
      { address: "0x5791...6802", staked: 130, isDirect: false },
      // 更多地址...
    ],
  },
  {
    level: 4,
    directCount: 5,
    levelCount: 45,
    totalStaked: 7890,
    referrals: [
      { address: "0x1111...2222", staked: 90, isDirect: false },
      { address: "0x2222...3333", staked: 110, isDirect: false },
      { address: "0x3333...4444", staked: 85, isDirect: false },
      { address: "0x4444...5555", staked: 150, isDirect: false },
      { address: "0x5555...6666", staked: 95, isDirect: false },
      // 更多地址...
    ],
  },
];

export default function AnalyticsPage() {
  const { t } = useLanguage();
  const {
    isConnected,
    address,
    connectWallet,
    disconnectWallet,
    isConnecting,
  } = useWallet();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const [selectedTab, setSelectedTab] = useState("overview");
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);
  const [isTeamWithdrawModalOpen, setIsTeamWithdrawModalOpen] = useState(false);
  const [teamWithdrawAmount, setTeamWithdrawAmount] = useState("");
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);
  const [isWithdrawLoading, setIsWithdrawLoading] = useState(false);
  const [isCalculatorModalOpen, setIsCalculatorModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

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

  // TVL数据
  const tvlData = {
    current: 19250728.94,
    change: 5.2,
    apr: 9.16,
  };

  // 团队统计数据
  const teamStats = {
    totalValue: 45280,
    weeklyGrowth: 2340, // 7日增长的APEX数量
    teamSize: 158,
    activeLevels: 4,
    totalEarnings: 2365.8,
  };

  const teamData = {
    tvl: "1,250,000",
    growth7d: "2,340", // 7日增长的APEX数量
    teamSize: "1,256",
    smallAreaPerformance:
      dynamicRewardsData.managementBonus.smallAreaPower.toLocaleString(),
  };

  // 处理团队收益提取
  const handleTeamWithdraw = async () => {
    if (!teamWithdrawAmount || parseFloat(teamWithdrawAmount) <= 0) return;

    setIsWithdrawLoading(true);
    try {
      // 模拟提取操作
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("团队提取", teamWithdrawAmount, "APEX，扣10%手续费");

      // 显示成功状态
      setWithdrawSuccess(true);

      // 2秒后关闭弹窗并重置状态
      setTimeout(() => {
        setIsTeamWithdrawModalOpen(false);
        setWithdrawSuccess(false);
        setTeamWithdrawAmount("");
      }, 2000);
    } catch (error) {
      console.error("提取失败:", error);
    } finally {
      setIsWithdrawLoading(false);
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
                <div className="text-xs text-gray-500">团队</div>
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
            <p className="text-sm text-gray-600">团队业绩和动态收益管理</p>
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

      <div className="max-w-md mx-auto px-6 py-6 space-y-6 relative z-10">
        {/* 团队总览卡片 */}
        <Card className="bg-gradient-to-br from-green-400/20 via-emerald-500/15 to-green-600/20 backdrop-blur-md shadow-lg border border-green-400/30 hover:from-green-400/25 hover:via-emerald-500/20 hover:to-green-600/25 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 via-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    团队业绩
                  </div>
                  <div className="text-xs text-gray-500">动态奖励概览</div>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-200 text-gray-600 hover:bg-gray-50"
                onClick={() => setIsInviteModalOpen(true)}
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex gap-4 mb-4">
              {/* 左侧 - TVL总锁定（正方形卡片） */}
              <div className="flex-1 flex flex-col justify-center">
                <div className="w-32 h-32 mx-auto bg-gray-50 rounded-lg flex flex-col items-center justify-center">
                  <div className="text-2xl font-bold text-green-600">
                    $19.3M
                  </div>
                  <div className="text-sm text-gray-600">TVL总锁定</div>
                </div>
              </div>

              {/* 右侧 - 两个指标垂直排列 */}
              <div className="flex-1 grid grid-cols-1 gap-3">
                {/* 团队规模 */}
                <div className="text-center py-1.5">
                  <div className="text-base font-bold text-gray-800">
                    {teamStats.teamSize}
                  </div>
                  <div className="text-xs text-gray-600 border-b border-green-400 pb-1">
                    团队规模
                  </div>
                </div>

                {/* 7日增长 */}
                <div className="text-center py-1.5">
                  <div className="text-base font-bold text-gray-600">
                    +{teamStats.weeklyGrowth.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-600 border-b border-green-400 pb-1">
                    7日增长 APEX
                  </div>
                </div>
              </div>
            </div>

            {/* 底部两个指标并排 */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              {/* 全网小区业绩 */}
              <div className="text-center py-1.5">
                <div className="text-base font-bold text-gray-800">
                  {dynamicRewardsData.managementBonus.totalNetworkPower.toLocaleString()}
                </div>
                <div className="text-xs text-gray-600 border-b border-green-400 pb-1">
                  全网小区业绩
                </div>
              </div>

              {/* 小区总业绩 */}
              <div className="text-center py-1.5">
                <div className="text-base font-bold text-gray-800">
                  {dynamicRewardsData.managementBonus.smallAreaPower.toLocaleString()}
                </div>
                <div className="text-xs text-gray-600 border-b border-green-400 pb-1">
                  小区总业绩
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">总收益:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">
                      {teamStats.totalEarnings} APEX
                    </span>
                    <Button
                      size="sm"
                      onClick={() => setIsTeamWithdrawModalOpen(true)}
                      className="bg-gradient-to-r from-teal-400 to-green-500 hover:from-teal-500 hover:to-green-600 text-white text-xs px-3 py-1"
                    >
                      提取
                    </Button>
                  </div>
                </div>
              </div>

              {/* 动态可用额度显示 */}
              <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">动态可用额度:</span>
                  <span
                    className={`font-bold ${
                      (Math.min(dynamicRewardsData.capData.stakedAmount, 200) +
                        dynamicRewardsData.capData.burnedAmount) *
                        4 -
                        dynamicRewardsData.capData.withdrawnAmount >
                      0
                        ? "text-gray-600"
                        : "text-red-600"
                    }`}
                  >
                    {(Math.min(dynamicRewardsData.capData.stakedAmount, 200) +
                      dynamicRewardsData.capData.burnedAmount) *
                      4 -
                      dynamicRewardsData.capData.withdrawnAmount}{" "}
                    USDT
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 标签页导航 */}
        <Tabs
          defaultValue="overview"
          className="w-full"
          value={selectedTab}
          onValueChange={setSelectedTab}
        >
          <TabsList className="grid w-full grid-cols-2 bg-white rounded-xl shadow-sm border border-gray-200">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-400 data-[state=active]:to-green-500 data-[state=active]:text-white"
            >
              动态收益
            </TabsTrigger>
            <TabsTrigger
              value="team"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-400 data-[state=active]:to-green-500 data-[state=active]:text-white"
            >
              团队层级
            </TabsTrigger>
          </TabsList>

          {/* 收益概览标签页 */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <Card className="bg-white shadow-sm border border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                      <Target className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">直推奖</div>
                      <div className="text-xs text-gray-500">15% 佣金比例</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">已获得:</span>
                      <span className="font-medium text-gray-900">
                        {dynamicRewardsData.directBonus.earned} APEX
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">推荐人数:</span>
                      <span className="font-medium text-gray-900">
                        {dynamicRewardsData.directBonus.referrals} 总计
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">有效推荐:</span>
                      <span className="font-medium text-gray-600">
                        {dynamicRewardsData.directBonus.validReferrals} (≥10
                        APEX)
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm border border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                      <Layers className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">层级奖</div>
                      <div className="text-xs text-gray-500">每层2%</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">已获得:</span>
                      <span className="font-medium text-gray-900">
                        {dynamicRewardsData.levelBonus.earned} APEX
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">活跃层级:</span>
                      <span className="font-medium text-gray-900">
                        {dynamicRewardsData.levelBonus.layers}/
                        {dynamicRewardsData.levelBonus.maxLayers}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full"
                        style={{
                          width: `${
                            (dynamicRewardsData.levelBonus.layers /
                              dynamicRewardsData.levelBonus.maxLayers) *
                            100
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm border border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                      <Crown className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">管理奖</div>
                      <div className="text-xs text-gray-500">基于小区算力</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">已获得:</span>
                      <span className="font-medium text-gray-900">
                        {dynamicRewardsData.managementBonus.earned} APEX
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">全网占比:</span>
                      <span className="font-medium text-gray-900">
                        {dynamicRewardsData.managementBonus.percentage}%
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">小区算力:</span>
                      <span className="font-medium text-gray-900">
                        {dynamicRewardsData.managementBonus.smallAreaPower.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm border border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                      <Zap className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">
                        加权分红
                      </div>
                      <div className="text-xs text-gray-500">基于7日增长</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">已获得:</span>
                      <span className="font-medium text-gray-900">
                        {dynamicRewardsData.weightedDividend.earned} APEX
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">全网占比:</span>
                      <span className="font-medium text-gray-900">
                        {dynamicRewardsData.weightedDividend.percentage}%
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">7日增长:</span>
                      <span className="font-medium text-gray-900">
                        {dynamicRewardsData.weightedDividend.sevenDayIncrease.toLocaleString()}{" "}
                        APEX
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* 团队层级标签页 */}
          <TabsContent value="team" className="space-y-4">
            <TeamLevelCard levels={teamLevelsData} />
          </TabsContent>
        </Tabs>
      </div>

      {/* 团队收益提取弹窗 */}
      <Dialog
        open={isTeamWithdrawModalOpen}
        onOpenChange={setIsTeamWithdrawModalOpen}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-gray-500" />
              提取团队收益
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {withdrawSuccess ? (
              /* 提取成功状态显示 */
              <div className="flex flex-col items-center py-6 space-y-6">
                {/* 第一行：提取成功！ */}
                <div className="text-lg font-semibold text-gray-900">
                  提取成功！
                </div>

                {/* 第二行：实际到账金额 */}
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">
                    {teamWithdrawAmount
                      ? (parseFloat(teamWithdrawAmount) * 0.9).toFixed(2)
                      : "0"}
                  </div>
                  <div className="text-sm text-gray-500">APEX</div>
                </div>

                {/* 第三行：确定按钮 */}
                <Button
                  onClick={() => {
                    setIsTeamWithdrawModalOpen(false);
                    setWithdrawSuccess(false);
                    setTeamWithdrawAmount("");
                  }}
                  className="bg-gradient-to-r from-teal-400 to-green-500 hover:from-teal-500 hover:to-green-600 text-white w-full"
                >
                  确定
                </Button>
              </div>
            ) : (
              <>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                      <DollarSign className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">
                        可提取: {teamStats.totalEarnings} APEX
                      </h4>
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
                        value={teamWithdrawAmount}
                        onChange={(e) => setTeamWithdrawAmount(e.target.value)}
                        className="flex-1"
                        max={teamStats.totalEarnings}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setTeamWithdrawAmount(
                            teamStats.totalEarnings.toString()
                          )
                        }
                        className="shrink-0"
                      >
                        全部
                      </Button>
                    </div>
                    <div className="text-xs text-gray-500">
                      实际到账:{" "}
                      {teamWithdrawAmount
                        ? (parseFloat(teamWithdrawAmount) * 0.9).toFixed(2)
                        : "0"}{" "}
                      APEX（扣除10%手续费）
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setIsTeamWithdrawModalOpen(false)}
                      className="flex-1"
                      disabled={isWithdrawLoading}
                    >
                      取消
                    </Button>
                    <Button
                      onClick={handleTeamWithdraw}
                      disabled={
                        isWithdrawLoading ||
                        !teamWithdrawAmount ||
                        parseFloat(teamWithdrawAmount) <= 0 ||
                        parseFloat(teamWithdrawAmount) > teamStats.totalEarnings
                      }
                      className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white disabled:opacity-50"
                    >
                      {isWithdrawLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          提取中...
                        </>
                      ) : (
                        "确认提取"
                      )}
                    </Button>
                  </div>
                </div>
              </>
            )}
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

      {/* 分享成功提示 */}
      {shareSuccess && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
            ✅ 分享成功！
          </div>
        </div>
      )}

      {/* 邀请好友弹窗 */}
      <Dialog open={isInviteModalOpen} onOpenChange={setIsInviteModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              邀请好友
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* 团队奖励规则 */}
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <div className="text-sm font-medium text-green-700 mb-3">
                团队奖励机制
              </div>
              <div className="space-y-2 text-sm text-green-700">
                <div className="flex justify-between">
                  <span>• 直推奖:</span>
                  <span className="font-medium">好友质押收益的15%</span>
                </div>
                <div className="flex justify-between">
                  <span>• 层级奖:</span>
                  <span className="font-medium">2-15层用户收益的2%</span>
                </div>
                <div className="flex justify-between">
                  <span>• 管理奖:</span>
                  <span className="font-medium">基于小区算力占比</span>
                </div>
                <div className="flex justify-between">
                  <span>• 加权分红:</span>
                  <span className="font-medium">按7日新增算力分配</span>
                </div>
              </div>
            </div>

            {/* 层级权益说明 */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="text-sm font-medium text-blue-700 mb-2">
                层级权益解锁
              </div>
              <div className="space-y-1 text-xs text-blue-600">
                <div>直推2个有效用户 → 拿4层奖励</div>
                <div>直推3个有效用户 → 拿7层奖励</div>
                <div>直推4个有效用户 → 拿10层奖励</div>
                <div>直推5个有效用户 → 拿15层奖励</div>
                <div className="text-blue-500 mt-2">
                  *有效用户需质押≥10枚APEX
                </div>
              </div>
            </div>

            {/* 封顶机制说明 */}
            <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
              <div className="text-sm font-medium text-orange-700 mb-2">
                收益封顶机制
              </div>
              <div className="text-xs text-orange-600">
                每账号封顶 = (质押量(最大200) + 销毁AD数量) × 4
              </div>
            </div>

            {/* 邀请链接展示 */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="text-sm font-medium text-gray-700 mb-2">
                您的专属邀请链接
              </div>
              <div className="bg-white rounded border p-3 text-sm text-gray-800 break-all">
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
                  setShareSuccess(true);
                  setTimeout(() => setShareSuccess(false), 3000);
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
                    setShareSuccess(true);
                    setTimeout(() => setShareSuccess(false), 3000);
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
  );
}

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
          min={1}
          step={1}
          className="w-full"
        />
      </div>

      <div className="bg-gray-50 rounded-lg p-4 space-y-3">
        <div className="text-sm font-medium text-gray-700 mb-2">预计收益:</div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">直推奖 (15%):</span>
            <span className="font-medium text-green-600">
              {rewards.directBonus.toFixed(2)}{" "}
              <span className="text-xs text-gray-500">APEX</span>
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">层级奖 (2%):</span>
            <span className="font-medium text-green-600">
              {rewards.levelBonus.toFixed(2)}{" "}
              <span className="text-xs text-gray-500">APEX</span>
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">管理奖:</span>
            <span className="font-medium text-green-600">
              {rewards.managementBonus.toFixed(2)}{" "}
              <span className="text-xs text-gray-500">APEX</span>
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">加权分红:</span>
            <span className="font-medium text-green-600">
              {rewards.weightedDividend.toFixed(2)}{" "}
              <span className="text-xs text-gray-500">APEX</span>
            </span>
          </div>
          <div className="border-t pt-2">
            <div className="flex justify-between font-medium">
              <span className="text-gray-900">总收益:</span>
              <span className="text-gray-600">
                {rewards.total.toFixed(2)}{" "}
                <span className="text-xs text-gray-500">APEX</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TeamLevelCard = ({ levels }: { levels: any[] }) => {
  const [showDirectReferrals, setShowDirectReferrals] = useState(false);

  // 获取第1层（直推）数据
  const directLevel = levels.find((level) => level.level === 1);
  const directReferrals =
    directLevel?.referrals?.filter((r: any) => r.isDirect) || [];

  return (
    <Card className="bg-white shadow-sm border border-gray-200">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Users className="w-5 h-5 text-gray-500" />
          <span className="text-lg font-semibold text-gray-800">团队层级</span>
        </div>

        <div className="space-y-4">
          {/* 直推人数 - 带展开功能 */}
          <div className="bg-green-50 rounded-lg border border-green-200 overflow-hidden">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-800">直推人数</div>
                  <div className="text-xs text-gray-500">第1层直接推荐</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-2xl font-bold text-green-600">
                    {directReferrals.length}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowDirectReferrals(!showDirectReferrals)}
                    className="p-1 h-8 w-8 hover:bg-green-100 transition-all duration-200"
                  >
                    {showDirectReferrals ? (
                      <ChevronUp className="w-4 h-4 transition-transform duration-200 text-green-600" />
                    ) : (
                      <ChevronDown className="w-4 h-4 transition-transform duration-200 text-green-600" />
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* 展开的直推地址列表 */}
            <div
              className={`border-t border-green-200 bg-white overflow-hidden transition-all duration-300 ease-in-out ${
                showDirectReferrals
                  ? "max-h-64 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="p-3">
                <div className="space-y-1.5 max-h-48 overflow-y-auto">
                  {directReferrals.map((referral: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2 px-3 bg-gray-50/50 rounded text-sm border border-gray-100 hover:bg-gray-100/80 transition-colors duration-200"
                    >
                      <span className="font-mono text-gray-600">
                        {referral.address}
                      </span>
                      <span className="font-medium text-gray-800">
                        {referral.staked} APEX
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 层级人数统计 */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="mb-3">
              <div className="font-medium text-gray-800">层级人数</div>
              <div className="text-xs text-gray-500">各层级总人数统计</div>
            </div>
            <div className="space-y-2">
              {levels.map((level) => (
                <div
                  key={level.level}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-teal-400 to-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xs">
                        {level.level}
                      </span>
                    </div>
                    <span className="text-sm text-gray-700">
                      第{level.level}层
                    </span>
                  </div>
                  <span className="font-medium text-gray-900">
                    {level.levelCount} 人
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
