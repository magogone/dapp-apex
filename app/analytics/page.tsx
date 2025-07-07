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
const teamLevels = [
  { level: 1, count: 5, totalStaked: 1250, commission: 15 },
  { level: 2, count: 12, totalStaked: 2340, commission: 2 },
  { level: 3, count: 28, totalStaked: 4560, commission: 2 },
  { level: 4, count: 45, totalStaked: 7890, commission: 2 },
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

  const navItems = [
    {
      name: "质押",
      icon: Coins,
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
      icon: TrendingUp,
      href: "/profile",
      isActive: pathname === "/profile",
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
    weeklyGrowth: 12.5,
    teamSize: 158,
    activeLevels: 4,
    totalEarnings: 2365.8,
  };

  const teamData = {
    tvl: "1,250,000",
    growth24h: "+12.5%",
    teamSize: "1,256",
    apr: "9.16%",
  };

  const shareData = () => {
    const content = `APEX DeFi 团队业绩分享

TVL总锁定: $${teamData.tvl}
24h增长: ${teamData.growth24h}
团队规模: ${teamData.teamSize}人
APR收益率: ${teamData.apr}

#APEX #DeFi #TeamPerformance`;

    if (navigator.share) {
      navigator
        .share({
          title: "APEX DeFi 团队业绩",
          text: content,
        })
        .then(() => {
          setShareSuccess(true);
          setTimeout(() => setShareSuccess(false), 3000);
        })
        .catch(() => {
          // 如果原生分享失败，回退到复制
          navigator.clipboard.writeText(content);
          setShareSuccess(true);
          setTimeout(() => setShareSuccess(false), 3000);
        });
    } else {
      // 复制到剪贴板
      navigator.clipboard.writeText(content);
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 3000);
    }
  };

  // 处理团队收益提取
  const handleTeamWithdraw = () => {
    // 这里添加团队提取逻辑，扣10%手续费
    console.log("团队提取", teamWithdrawAmount, "APEX，扣10%手续费");
    setIsTeamWithdrawModalOpen(false);
    setTeamWithdrawAmount("");
  };

  return (
    <div className="min-h-screen bg-white relative">
      {/* 顶部导航栏 */}
      <header className="bg-white shadow-sm border-b relative z-20">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-green-500 rounded-lg flex items-center justify-center">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-xl font-bold text-green-600">APEX</div>
                <div className="text-xs text-gray-500">团队</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200"
                variant="ghost"
                size="icon"
              >
                {isMenuOpen ? (
                  <X className="w-5 h-5 text-gray-700" />
                ) : (
                  <Menu className="w-5 h-5 text-gray-700" />
                )}
              </Button>
            </div>
          </div>
          <div className="mt-2">
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
          <div className="fixed top-20 right-6 z-50 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
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
                <Button className="w-full mx-4 bg-gradient-to-r from-teal-400 to-green-500 hover:from-teal-500 hover:to-green-600 text-white rounded-full">
                  <Wallet className="h-4 w-4 mr-2" />
                  连接钱包
                </Button>
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
                onClick={shareData}
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex gap-4 mb-4">
              {/* 左侧 - TVL总锁定（正方形卡片） */}
              <div className="flex-1 flex flex-col justify-center">
                <div className="w-36 h-36 mx-auto bg-gray-50 rounded-lg flex flex-col items-center justify-center">
                  <div className="text-3xl font-bold text-green-600">
                    $19.3M
                  </div>
                  <div className="text-sm text-gray-600">TVL总锁定</div>
                </div>
              </div>

              {/* 右侧 - 其他三个指标（下划线样式） */}
              <div className="flex-1 grid grid-cols-1 gap-1">
                <div className="text-center py-1.5">
                  <div className="text-base font-bold text-gray-800">
                    {teamStats.teamSize}
                  </div>
                  <div className="text-xs text-gray-600 border-b border-green-400 pb-1">
                    团队规模
                  </div>
                </div>
                <div className="text-center py-1.5">
                  <div className="text-base font-bold text-gray-600">
                    +{tvlData.change}%
                  </div>
                  <div className="text-xs text-gray-600 border-b border-green-400 pb-1">
                    24h增长
                  </div>
                </div>
                <div className="text-center py-1.5">
                  <div className="text-base font-bold text-gray-800">
                    {tvlData.apr}%
                  </div>
                  <div className="text-xs text-gray-600 border-b border-green-400 pb-1">
                    APR收益率
                  </div>
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
          <TabsList className="grid w-full grid-cols-3 bg-white rounded-xl shadow-sm border border-gray-200">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-400 data-[state=active]:to-green-500 data-[state=active]:text-white"
            >
              动态收益
            </TabsTrigger>
            <TabsTrigger
              value="calculator"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-400 data-[state=active]:to-green-500 data-[state=active]:text-white"
            >
              收益计算器
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
                        {dynamicRewardsData.weightedDividend.sevenDayIncrease.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* 收益计算器标签页 */}
          <TabsContent value="calculator" className="space-y-4">
            <RewardCalculator />
          </TabsContent>

          {/* 团队层级标签页 */}
          <TabsContent value="team" className="space-y-4">
            <TeamLevelCard levels={teamLevels} />
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
                      setTeamWithdrawAmount(teamStats.totalEarnings.toString())
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
                >
                  取消
                </Button>
                <Button
                  onClick={handleTeamWithdraw}
                  disabled={
                    !teamWithdrawAmount ||
                    parseFloat(teamWithdrawAmount) <= 0 ||
                    parseFloat(teamWithdrawAmount) > teamStats.totalEarnings
                  }
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                >
                  确认提取
                </Button>
              </div>
            </div>
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
    <Card className="bg-white shadow-sm border border-gray-200">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Calculator className="w-5 h-5 text-gray-500" />
          <span className="text-lg font-semibold text-gray-800">
            收益计算器
          </span>
        </div>

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
            <div className="text-sm font-medium text-gray-700 mb-2">
              预计收益:
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">直推奖 (15%):</span>
                <span className="font-medium text-gray-900">
                  {rewards.directBonus.toFixed(2)} APEX
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">层级奖 (2%):</span>
                <span className="font-medium text-gray-900">
                  {rewards.levelBonus.toFixed(2)} APEX
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">管理奖:</span>
                <span className="font-medium text-gray-900">
                  {rewards.managementBonus.toFixed(2)} APEX
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">加权分红:</span>
                <span className="font-medium text-gray-900">
                  {rewards.weightedDividend.toFixed(2)} APEX
                </span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between font-medium">
                  <span className="text-gray-900">总收益:</span>
                  <span className="text-gray-600">
                    {rewards.total.toFixed(2)} APEX
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const TeamLevelCard = ({ levels }: { levels: any[] }) => (
  <Card className="bg-white shadow-sm border border-gray-200">
    <CardContent className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Users className="w-5 h-5 text-gray-500" />
        <span className="text-lg font-semibold text-gray-800">团队层级</span>
      </div>

      <div className="space-y-4">
        {levels.map((level) => (
          <div
            key={level.level}
            className="border border-gray-200 rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {level.level}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-gray-800">
                    第{level.level}层
                  </div>
                  <div className="text-xs text-gray-500">
                    {level.commission}% 佣金
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-gray-900">{level.count}</div>
                <div className="text-xs text-gray-500">成员</div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">总质押量:</span>
                <span className="font-medium text-gray-900">
                  {level.totalStaked.toLocaleString()} APEX
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);
