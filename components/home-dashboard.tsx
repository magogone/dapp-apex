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

import {
  Bell,
  Wallet,
  Plus,
  Zap,
  Flame,
  BarChart,
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
  Gift,
  HelpCircle,
  AlertCircle,
} from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { useWallet } from "@/contexts/wallet-context";
import LanguageSwitcher from "@/components/language-switcher";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Mock Data
const userData = {
  name: "Wallet 0x12...fEa3",
  totalStaked: 4798,
  apedGenerated: 108,
  cap: 8000,
  apedBalance: 45,
  totalAssets: {
    usdt: 719.67,
    apex: 0, // 设置为0来测试兑换APEX功能
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
  const [sevenDaysAmount, setSevenDaysAmount] = useState("");
  const [threeSixtyDaysAmount, setThreeSixtyDaysAmount] = useState("");
  const [stakeSuccess, setStakeSuccess] = useState(false);

  const pathname = usePathname();

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

  const handleStakeClick = (type: "7days" | "360days") => {
    setStakeType(type);
    // 根据质押类型设置对应的金额
    const amount = type === "7days" ? sevenDaysAmount : threeSixtyDaysAmount;
    setStakeAmount(amount);
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
    if (!stakeAmount || parseFloat(stakeAmount) <= 0) return;

    setIsStakeLoading(true);
    try {
      // 模拟质押操作
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log(
        `质押成功: ${stakeAmount} ${
          userData.totalAssets.apex > 0 ? "APEX" : "USDT"
        }`
      );

      // 显示成功状态
      setStakeSuccess(true);

      // 2秒后关闭弹窗并重置状态
      setTimeout(() => {
        setIsStakeModalOpen(false);
        setStakeSuccess(false);
        setStakeAmount("");
        // 清空对应的输入框
        if (stakeType === "7days") {
          setSevenDaysAmount("");
        } else {
          setThreeSixtyDaysAmount("");
        }
      }, 2000);
    } catch (error) {
      console.error("质押失败:", error);
    } finally {
      setIsStakeLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* 顶部导航栏 */}
      <header className="bg-white shadow-sm border-b border-gray-200 relative z-20">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">🌿</span>
              </div>
              <div>
                <div className="text-xl font-bold text-gray-800">APEX</div>
                <div className="text-xs text-gray-500">流动性质押</div>
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
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="fixed top-20 right-6 z-50 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="py-2">
              <Link href="/" onClick={() => setIsMenuOpen(false)}>
                <div className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors bg-green-50 text-green-600">
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
                            ? "bg-green-50 text-green-600"
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
              <div className="border-t border-green-500/30 mt-2 pt-2">
                {isConnected ? (
                  <div className="mx-4 space-y-2">
                    <div className="text-xs text-gray-600 text-center">
                      已连接: {address?.slice(0, 6)}...{address?.slice(-4)}
                    </div>
                    <Button
                      onClick={disconnectWallet}
                      className="w-full bg-gray-500 hover:bg-gray-600 text-white rounded-full"
                    >
                      <Wallet className="h-4 w-4 mr-2" />
                      断开连接
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={connectWallet}
                    disabled={isConnecting}
                    className="w-full mx-4 bg-gradient-to-r from-teal-400 to-green-500 hover:from-teal-500 hover:to-green-600 text-white rounded-full disabled:opacity-50"
                  >
                    <Wallet className="h-4 w-4 mr-2" />
                    {isConnecting ? "连接中..." : "连接钱包"}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      <div className="max-w-md mx-auto px-6 py-6 space-y-6">
        {/* 全网数据 */}
        <Card className="bg-white/40 backdrop-blur-sm shadow-lg border border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-green-500 rounded-lg flex items-center justify-center">
                <BarChart className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="font-semibold text-gray-800">全网数据</div>
                <div className="text-xs text-gray-600">生态系统概览</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    $19.25M
                  </div>
                  <div className="text-xs text-gray-600">总锁定价值</div>
                  <div className="text-xs text-green-600 mt-1">+12.5%</div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">9.16%</div>
                  <div className="text-xs text-gray-600">平均收益率</div>
                  <div className="text-xs text-blue-600 mt-1">稳定</div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">8,456</div>
                  <div className="text-xs text-gray-600">活跃用户</div>
                  <div className="text-xs text-green-600 mt-1">+5.2%</div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">$2.89</div>
                  <div className="text-xs text-gray-600">APED价格</div>
                  <div className="text-xs text-yellow-600 mt-1">+$0.10</div>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">总销毁量</span>
                <span className="text-sm font-bold text-orange-600">
                  124,580 APEX
                </span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-600">节点总数</span>
                <span className="text-sm font-bold text-purple-600">
                  1,156 个
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 代币余额区域 */}
        <Card className="bg-white shadow-sm border border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">🪙</span>
                </div>
                <span className="font-medium text-gray-700">APEX</span>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-gray-900">
                  {userData.totalAssets.apex}
                </div>
                <div className="text-sm text-gray-500">持有数量</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 质押功能区域 */}
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 shadow-sm border border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                  <Lock className="w-4 h-4 text-gray-700" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-800">
                    静态质押
                  </h3>
                  <p className="text-sm text-green-600">选择质押方案</p>
                </div>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <HelpCircle className="h-4 w-4 text-gray-500" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>🔒 静态质押规则说明</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 text-sm">
                    <div>
                      <h4 className="font-semibold mb-2">📋 基本规则</h4>
                      <p className="text-gray-600">
                        • 利息发放：以币本位实时结算
                        <br />
                        • APED 生成：钱包中利息按金本位每天 1.2%
                        <br />
                        • 解押：无需服务费
                        <br />• 提现：收取 10% 服务费（可用 APED 抵扣）
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">⏰ 7天质押合约</h4>
                      <p className="text-gray-600">
                        • 每轮 0.05% 间隔（支持一键复利）
                        <br />
                        • 第一轮：0.7%/天
                        <br />
                        • 第二轮：0.75%/天
                        <br />
                        • 第三轮：0.8%/天
                        <br />• 利息递增，最高封顶 1.2%/天
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">🏆 360天质押合约</h4>
                      <p className="text-gray-600">
                        • 固定利息：1.2%/天
                        <br />
                        • 治理代币奖励：按利息金本位发放 APED
                        <br />• 长期收益更稳定
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">💸 提现规则</h4>
                      <p className="text-gray-600">
                        • 单次提币：1-2000 枚 APEX
                        <br />
                        • ≤2000 枚：智能合约即时执行
                        <br />• &gt;2000 枚：需人工审核
                      </p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <Tabs defaultValue="7days" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-green-100">
                <TabsTrigger value="7days" className="text-sm">
                  7天质押
                </TabsTrigger>
                <TabsTrigger value="360days" className="text-sm">
                  360天质押
                </TabsTrigger>
              </TabsList>

              <TabsContent value="7days" className="space-y-4 mt-4">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold text-blue-800">
                        7天质押
                      </span>
                    </div>
                    <div className="text-sm text-blue-600 font-medium">
                      0.7% → 1.2%/天
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-blue-700">
                      💡 递增收益，支持复利
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        质押数量
                      </span>
                      <span className="text-sm text-gray-600">
                        余额: {userData.totalAssets.apex} APEX
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Input
                        type="number"
                        placeholder="输入质押数量"
                        className="flex-1 text-lg font-semibold bg-white border-gray-300"
                        value={sevenDaysAmount}
                        onChange={(e) => setSevenDaysAmount(e.target.value)}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-blue-600 border-blue-200 hover:bg-blue-50"
                        onClick={() =>
                          setSevenDaysAmount(
                            userData.totalAssets.apex.toString()
                          )
                        }
                      >
                        最大
                      </Button>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 font-semibold"
                    onClick={() => handleStakeClick("7days")}
                  >
                    开始7天质押
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="360days" className="space-y-4 mt-4">
                <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Lock className="w-5 h-5 text-emerald-600" />
                      <span className="font-semibold text-emerald-800">
                        360天质押
                      </span>
                    </div>
                    <div className="text-sm text-emerald-600 font-medium">
                      1.2%/天 + APED
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-emerald-700">
                      🎁 稳定收益 + 治理代币
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        质押数量
                      </span>
                      <span className="text-sm text-gray-600">
                        余额: {userData.totalAssets.apex} APEX
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Input
                        type="number"
                        placeholder="输入质押数量"
                        className="flex-1 text-lg font-semibold bg-white border-gray-300"
                        value={threeSixtyDaysAmount}
                        onChange={(e) =>
                          setThreeSixtyDaysAmount(e.target.value)
                        }
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-emerald-600 border-emerald-200 hover:bg-emerald-50"
                        onClick={() =>
                          setThreeSixtyDaysAmount(
                            userData.totalAssets.apex.toString()
                          )
                        }
                      >
                        最大
                      </Button>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white py-3 font-semibold"
                    onClick={() => handleStakeClick("360days")}
                  >
                    开始360天质押
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
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
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">💵</span>
                </div>
                <div>
                  <h4 className="font-semibold text-orange-800">
                    1 USDT = 1.038 APEX
                  </h4>
                  <p className="text-sm text-orange-600">
                    输入USDT数量兑换APEX
                  </p>
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
                  <ArrowRight className="w-4 h-4 text-gray-400 mx-auto" />
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
              <div className="text-center">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">✓</span>
                    </div>
                    <span className="text-green-800 font-semibold">
                      兑换成功！
                    </span>
                  </div>
                  <p className="text-sm text-green-600">
                    已成功兑换 {usdtAmount} USDT → {apexAmount} APEX
                  </p>
                </div>
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
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white disabled:opacity-50"
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
              <div className="text-center">
                <div className="bg-green-50 p-6 rounded-lg border border-green-200 mb-4">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xl">✓</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-green-800 mb-2">
                    质押成功！
                  </h3>
                  <p className="text-sm text-green-600 mb-4">
                    已成功质押 {stakeAmount} APEX
                  </p>
                  <div className="bg-white p-3 rounded-lg border border-green-200">
                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="flex justify-between">
                        <span>质押期限:</span>
                        <span className="font-medium">
                          {stakeType === "7days" ? "7天" : "360天"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>预期日收益:</span>
                        <span className="font-medium text-green-600">
                          {stakeType === "7days" ? "0.7%" : "1.2%"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {!stakeSuccess && (
              <>
                {/* 支付方式说明 */}
                <div
                  className={`p-4 rounded-lg border ${
                    userData.totalAssets.apex >= parseFloat(stakeAmount || "0")
                      ? "bg-green-50 border-green-200"
                      : "bg-blue-50 border-blue-200"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        userData.totalAssets.apex >=
                        parseFloat(stakeAmount || "0")
                          ? "bg-green-500"
                          : "bg-blue-500"
                      }`}
                    >
                      <span className="text-white font-bold text-sm">
                        {userData.totalAssets.apex >=
                        parseFloat(stakeAmount || "0")
                          ? "🌿"
                          : "💵"}
                      </span>
                    </div>
                    <div>
                      <h4
                        className={`font-semibold ${
                          userData.totalAssets.apex >=
                          parseFloat(stakeAmount || "0")
                            ? "text-green-800"
                            : "text-blue-800"
                        }`}
                      >
                        {userData.totalAssets.apex >=
                        parseFloat(stakeAmount || "0")
                          ? "APEX直接质押"
                          : "USDT购买质押"}
                      </h4>
                      <p
                        className={`text-sm ${
                          userData.totalAssets.apex >=
                          parseFloat(stakeAmount || "0")
                            ? "text-green-600"
                            : "text-blue-600"
                        }`}
                      >
                        {userData.totalAssets.apex >=
                        parseFloat(stakeAmount || "0")
                          ? `可用余额: ${userData.totalAssets.apex.toFixed(
                              2
                            )} APEX`
                          : `可用余额: ${userData.totalAssets.usdt.toFixed(
                              2
                            )} USDT`}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 支付金额显示 */}
                {stakeAmount ? (
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      {userData.totalAssets.apex >= parseFloat(stakeAmount)
                        ? "质押数量"
                        : "需要支付"}
                    </label>
                    <div
                      className={`p-4 rounded-lg border ${
                        userData.totalAssets.apex >= parseFloat(stakeAmount)
                          ? "bg-green-50 border-green-200"
                          : "bg-blue-50 border-blue-200"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-2xl font-bold ${
                            userData.totalAssets.apex >= parseFloat(stakeAmount)
                              ? "text-green-800"
                              : "text-blue-800"
                          }`}
                        >
                          {userData.totalAssets.apex >= parseFloat(stakeAmount)
                            ? `${stakeAmount} APEX`
                            : `${(parseFloat(stakeAmount) / 1.038).toFixed(
                                2
                              )} USDT`}
                        </span>
                        <span
                          className={`text-sm ${
                            userData.totalAssets.apex >= parseFloat(stakeAmount)
                              ? "text-green-600"
                              : "text-blue-600"
                          }`}
                        >
                          {userData.totalAssets.apex >= parseFloat(stakeAmount)
                            ? "直接质押"
                            : "支付金额"}
                        </span>
                      </div>
                      {userData.totalAssets.apex < parseFloat(stakeAmount) && (
                        <div className="text-xs text-blue-600 mt-2 flex justify-between">
                          <span>质押数量: {stakeAmount} APEX</span>
                          <span>汇率: 1 USDT = 1.038 APEX</span>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-center">
                    <p className="text-gray-500 mb-2">💡 请先输入质押数量</p>
                    <p className="text-xs text-gray-400">
                      在静态质押页面输入要质押的APEX数量
                    </p>
                  </div>
                )}

                {/* 收益预览 */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 space-y-2">
                    <div className="flex justify-between">
                      <span>质押期限:</span>
                      <span className="font-medium">
                        {stakeType === "7days" ? "7天" : "360天"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>预期日收益:</span>
                      <span className="font-medium text-green-600">
                        {stakeType === "7days" ? "0.7%" : "1.2%"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>APED生成:</span>
                      <span className="font-medium text-purple-600">
                        {stakeType === "7days" ? "0.7%" : "1.2%"} 每日
                      </span>
                    </div>
                    {stakeAmount && parseFloat(stakeAmount) > 0 && (
                      <div className="pt-2 border-t border-gray-200">
                        <div className="flex justify-between">
                          <span className="font-medium">预计日收益:</span>
                          <span className="font-bold text-green-600">
                            {(
                              parseFloat(stakeAmount) *
                              (stakeType === "7days" ? 0.007 : 0.012)
                            ).toFixed(2)}{" "}
                            APEX
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 操作按钮 */}
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsStakeModalOpen(false);
                      setStakeAmount("");
                    }}
                    className="flex-1"
                    disabled={isStakeLoading}
                  >
                    取消
                  </Button>
                  <Button
                    onClick={handleStakeConfirm}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white disabled:opacity-50"
                    disabled={
                      isStakeLoading ||
                      !stakeAmount ||
                      parseFloat(stakeAmount) <= 0 ||
                      (userData.totalAssets.apex >= parseFloat(stakeAmount)
                        ? parseFloat(stakeAmount) > userData.totalAssets.apex
                        : parseFloat(stakeAmount) / 1.038 >
                          userData.totalAssets.usdt)
                    }
                  >
                    {isStakeLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        {userData.totalAssets.apex >=
                        parseFloat(stakeAmount || "0")
                          ? "质押中..."
                          : "购买质押中..."}
                      </>
                    ) : (
                      <>
                        {userData.totalAssets.apex >=
                        parseFloat(stakeAmount || "0")
                          ? "确认质押"
                          : "支付USDT质押"}
                      </>
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
        <DialogContent className="bg-white/95 backdrop-blur-sm shadow-xl">
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
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
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
    </div>
  );
}
