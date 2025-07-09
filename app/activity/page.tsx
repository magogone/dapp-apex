"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Menu,
  X,
  Home,
  User,
  BarChart3,
  Gift,
  ArrowUpDown,
  Calculator,
  Wallet,
  Target,
  Star,
  Users,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";

export default function ActivityPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("活动列表");
  const [isCalculatorModalOpen, setIsCalculatorModalOpen] = useState(false);
  const pathname = usePathname();

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

  // 快捷菜单 - DApp活动统计数据
  const quickMenuItems = [
    {
      icon: Gift,
      title: "空投活动",
      count: 12,
      status: "已参与",
      value: "850 APEX",
      color: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      icon: Users,
      title: "推荐奖励",
      count: 8,
      status: "已获得",
      value: "1,200 APEX",
      color: "bg-green-100",
      iconColor: "text-green-700",
    },
    {
      icon: Target,
      title: "质押挖矿",
      count: 3,
      status: "进行中",
      value: "800 APEX",
      color: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      icon: Star,
      title: "限时活动",
      count: 5,
      status: "已完成",
      value: "总计: 28个",
      color: "bg-teal-50",
      iconColor: "text-teal-600",
    },
  ];

  // 活动数据
  const activities = [
    {
      id: 1,
      title: "APEX空投大放送",
      subtitle: "完成任务即可获得APEX代币奖励！",
      status: "活动进行中",
      date: "12月18日至12月25日",
      bgColor: "bg-gradient-to-r from-cyan-100 to-blue-100",
      icon: Gift,
      buttonText: "立即参与",
      image: "/apex-airdrop.png",
    },
    {
      id: 2,
      title: "邀请好友享双重奖励",
      subtitle: "邀请好友质押，双方都能获得额外收益！",
      status: "活动进行中",
      date: "12月15日至12月31日",
      bgColor: "bg-gradient-to-r from-blue-100 to-purple-100",
      icon: Users,
      buttonText: "邀请好友",
      image: "/invite-friends.png",
    },

    {
      id: 4,
      title: "社区治理投票奖励",
      subtitle: "参与社区治理投票，获得治理代币奖励！",
      status: "活动进行中",
      date: "长期有效",
      bgColor: "bg-gradient-to-r from-blue-100 to-cyan-100",
      icon: Target,
      buttonText: "参与投票",
      image: "/community-governance.png",
    },
  ];

  const tabs = ["活动列表", "参与记录"];

  // 参与记录数据
  const participationRecords = [
    {
      id: 1,
      activityName: "APEX空投大放送",
      participateDate: "2024-12-20",
      rewardAmount: "250 APEX",
      status: "已获得",
      description: "完成每日签到任务",
    },
    {
      id: 2,
      activityName: "邀请好友享双重奖励",
      participateDate: "2024-12-18",
      rewardAmount: "180 APEX",
      status: "已获得",
      description: "成功邀请3位好友",
    },
    {
      id: 3,
      activityName: "社区治理投票奖励",
      participateDate: "2024-12-15",
      rewardAmount: "120 APEX",
      status: "已获得",
      description: "参与社区提案投票",
    },
    {
      id: 4,
      activityName: "APEX空投大放送",
      participateDate: "2024-12-19",
      rewardAmount: "200 APEX",
      status: "待发放",
      description: "完成质押任务",
    },
    {
      id: 5,
      activityName: "邀请好友享双重奖励",
      participateDate: "2024-12-17",
      rewardAmount: "150 APEX",
      status: "已获得",
      description: "好友完成首次质押",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
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
                <div className="text-xs text-gray-500">活动中心</div>
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
            <p className="text-sm text-gray-600">发现精彩活动，参与赢取奖励</p>
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
        {/* 快捷菜单 - 融合活动统计数据 */}
        <div className="grid grid-cols-4 gap-3">
          {quickMenuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center mb-1.5 relative shadow-sm`}
                >
                  <Icon className={`w-5 h-5 ${item.iconColor}`} />
                </div>
                <span
                  className="text-xs font-medium text-gray-800 text-center mb-0.5 leading-tight whitespace-nowrap"
                  style={{ fontSize: "9px" }}
                >
                  {item.title}
                </span>
                <span
                  className="text-xs text-gray-500 text-center leading-tight whitespace-nowrap"
                  style={{ fontSize: "8px" }}
                >
                  {item.status}
                </span>
                <span
                  className="text-xs font-medium text-green-600 text-center mt-0.5 leading-tight whitespace-nowrap"
                  style={{ fontSize: "9px" }}
                >
                  {item.value}
                </span>
              </div>
            );
          })}
        </div>

        {/* 活动分类标签 */}
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500/20 ${
                activeTab === tab
                  ? "bg-gradient-to-r from-teal-400 to-green-500 text-white hover:from-teal-500 hover:to-green-600 shadow-md"
                  : "bg-white text-green-600 border border-green-500 hover:bg-green-50 hover:shadow-sm"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 活动列表 */}
        <div className="space-y-4">
          {activeTab === "活动列表"
            ? // 活动列表
              activities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="space-y-0">
                    {/* 融合的活动卡片 */}
                    <Card className="bg-white/90 backdrop-blur-sm border border-gray-200 shadow-sm rounded-2xl overflow-hidden">
                      {/* 上半部分 - 彩色背景 */}
                      <div
                        className={`${activity.bgColor} p-3 relative overflow-hidden`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="mr-3 flex-shrink-0 relative -my-2">
                            <div className="w-24 h-24 flex items-center justify-center">
                              <Image
                                src={activity.image}
                                alt={activity.title}
                                width={96}
                                height={96}
                                className="w-full h-full object-contain drop-shadow-sm scale-125"
                                priority
                              />
                            </div>
                          </div>
                          <div className="flex-1 group">
                            <h3 className="text-sm font-bold mb-1 tracking-wide transform hover:scale-105 transition-all duration-300 cursor-pointer relative">
                              <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                {activity.title}
                              </span>
                              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-300 group-hover:w-full"></div>
                            </h3>
                            <div className="mb-1">
                              <span className="text-xs text-gray-700 bg-white/80 px-2 py-0.5 rounded">
                                {activity.subtitle}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 下半部分 - 半透明玻璃效果 */}
                      <CardContent className="p-3 bg-white/90 backdrop-blur-sm border-t border-white/50 shadow-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-3 text-xs mb-1.5">
                              <span className="text-orange-500">
                                {activity.status}
                              </span>
                              <span className="text-gray-600">
                                {activity.date}
                              </span>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-xs text-gray-600 border-gray-300 hover:bg-gray-50 h-6 px-2"
                              onClick={() => alert("活动规则：等待更新")}
                            >
                              活动规则
                            </Button>
                          </div>
                          <Button className="bg-gradient-to-r from-teal-400 to-green-500 hover:from-teal-500 hover:to-green-600 text-white px-3 py-1.5 rounded-full text-xs font-medium">
                            {activity.buttonText}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                );
              })
            : // 参与记录列表
              participationRecords.map((record) => (
                <Card
                  key={record.id}
                  className="bg-white/90 backdrop-blur-sm border border-gray-200 shadow-sm rounded-2xl overflow-hidden"
                >
                  <CardContent className="p-3 bg-white/90 backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-sm font-bold text-gray-900 mb-1">
                          {record.activityName}
                        </h3>
                        <p className="text-xs text-gray-600 mb-1.5">
                          {record.description}
                        </p>
                        <div className="flex items-center gap-3 text-xs">
                          <span className="text-gray-500">
                            参与时间: {record.participateDate}
                          </span>
                          <span
                            className={`px-1.5 py-0.5 rounded text-xs ${
                              record.status === "已获得"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {record.status}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-green-600">
                          {record.rewardAmount}
                        </div>
                        <div className="text-xs text-gray-500">奖励</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
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
              <span className="text-green-600">
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
