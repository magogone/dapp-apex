"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Menu,
  X,
  Home,
  Coins,
  ArrowUpDown,
  Users,
  User,
  Settings,
  Copy,
  Shield,
  Star,
  TrendingUp,
  BarChart3,
  DollarSign,
  Building,
  Calculator,
  Award,
  Wallet,
  Plus,
  Crown,
  Zap,
  Lock,
  Mail,
  Check,
  AlertCircle,
  FileText,
  Users2,
  CheckCircle,
  XCircle,
  Clock,
  Vote,
  Leaf,
  Download,
  Smartphone,
  TriangleAlert,
  ChevronDown,
  Gem,
  Gift,
  Share2,
  Hash,
  HelpCircle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useLanguage } from "@/contexts/language-context";
import { useWallet } from "@/contexts/wallet-context";
import LanguageSwitcher from "@/components/language-switcher";
import Link from "next/link";
import { usePathname } from "next/navigation";

const user = {
  address: "0x1234...fEa3",
  adBalance: 45,
  apexBalance: 4798,
  teamPerformance: 45280,
  isNode: true,
  nodeType: "VIP 1",
  isStudio: true,
  studioPerformance: 12500,
  dailyNewPerformance: 2000,
  totalEarnings: 2485.6,
  stakingAmount: 4000,
  dynamicQuota: 12800, // 已使用的动态收益额度
  dynamicCap: 16000, // 动态收益封顶：(质押量200 + 销毁量50) × 4
  securitySettings: {
    tradingPassword: true,
    emailVerified: false,
  },
};

export default function ProfilePage() {
  const { t } = useLanguage();
  const {
    isConnected,
    address,
    connectWallet,
    disconnectWallet,
    isConnecting,
  } = useWallet();
  const [activeTab, setActiveTab] = useState("profile");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawType, setWithdrawType] = useState<"APEX" | "USDT">("APEX");
  const [isLoading, setIsLoading] = useState(false);
  const [isAssetsExpanded, setIsAssetsExpanded] = useState(false);
  const [isRecordsModalOpen, setIsRecordsModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isRulesExpanded, setIsRulesExpanded] = useState(false);
  const [isFlashSwapModalOpen, setIsFlashSwapModalOpen] = useState(false);
  const [adAmount, setAdAmount] = useState("");
  const [isTeamPerformanceModalOpen, setIsTeamPerformanceModalOpen] =
    useState(false);
  const [isClaimSuccessModalOpen, setIsClaimSuccessModalOpen] = useState(false);
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

  const handleWithdraw = async () => {
    if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) return;
    setIsLoading(true);

    // 个人页面提取需要销毁AD抵扣手续费
    if (withdrawType === "APEX") {
      const feeInAD = (parseFloat(withdrawAmount) * 0.1 * 0.963) / 2.89; // 10%手续费转换为AD
      console.log(
        "个人提取",
        withdrawAmount,
        "APEX，销毁",
        feeInAD.toFixed(4),
        "AD抵扣手续费"
      );
    } else {
      console.log("个人提取", withdrawAmount, withdrawType);
    }

    // 模拟提取处理
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    setIsWithdrawModalOpen(false);
    setWithdrawAmount("");
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(user.address);
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
                <div className="text-xs text-gray-500">个人中心</div>
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
            <p className="text-sm text-gray-600">账户设置和信息</p>
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
        {/* 用户信息卡片 */}
        <Card className="bg-gradient-to-br from-green-400/20 via-emerald-500/15 to-green-600/20 backdrop-blur-md shadow-lg border border-green-400/30 hover:from-green-400/25 hover:via-emerald-500/20 hover:to-green-600/25 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 via-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                <User className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <div className="font-semibold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    钱包地址
                  </div>
                  {/* VIP等级标识 - 基于360天质押 */}
                  {user.stakingAmount >= 10000 && (
                    <div className="px-2 py-1 bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs font-bold rounded-full">
                      VIP2
                    </div>
                  )}
                  {user.stakingAmount >= 1000 && user.stakingAmount < 10000 && (
                    <div className="px-2 py-1 bg-gradient-to-r from-green-400 to-green-600 text-white text-xs font-bold rounded-full">
                      VIP1
                    </div>
                  )}
                </div>
                <div className="text-sm text-gray-600 font-mono">
                  {user.address}
                </div>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsRecordsModalOpen(true)}
                className="text-gray-500 hover:text-gray-700 px-3"
              >
                <FileText className="w-4 h-4 mr-1" />
                <span className="text-xs">记录</span>
              </Button>
            </div>

            {/* 个人资产 */}
            <div className="border-t border-gray-100 pt-4">
              {/* 总资产价值 */}
              <div className="mb-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-gray-200 relative">
                {/* 展开/收起按钮 - 右上角 */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsAssetsExpanded(!isAssetsExpanded)}
                  className="absolute top-3 right-3 w-7 h-7 bg-white/80 hover:bg-white text-gray-500 hover:text-gray-700 rounded-full shadow-sm border border-gray-200"
                >
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isAssetsExpanded ? "rotate-180" : ""
                    }`}
                  />
                </Button>

                <div className="text-center">
                  <div className="text-sm font-medium text-gray-800 mb-2">
                    总资产价值
                  </div>
                  <div className="text-3xl font-bold text-green-900 mb-1">
                    $
                    {(
                      user.adBalance * 2.89 +
                      user.apexBalance * 0.963 +
                      user.totalEarnings * 0.963 +
                      user.stakingAmount * 0.963
                    ).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </div>
                  <div className="text-xs text-gray-600">
                    AD=${(user.adBalance * 2.89).toFixed(2)} APEX=$
                    {((user.apexBalance || 4798) * 0.963).toFixed(2)}
                  </div>
                </div>
              </div>

              <div
                className={`grid grid-cols-2 gap-3 overflow-hidden transition-all duration-500 ease-in-out ${
                  isAssetsExpanded
                    ? "max-h-96 opacity-100 transform translate-y-0"
                    : "max-h-0 opacity-0 transform -translate-y-4"
                }`}
              >
                <div
                  className={`bg-gray-50 rounded-lg p-3 transition-all duration-500 ease-in-out delay-75 ${
                    isAssetsExpanded
                      ? "opacity-100 transform translate-y-0"
                      : "opacity-0 transform -translate-y-2"
                  }`}
                >
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">4000</div>
                    <div className="text-xs text-gray-600">APEX质押中</div>
                  </div>
                </div>
                <div
                  className={`bg-gray-50 rounded-lg p-3 transition-all duration-500 ease-in-out delay-100 ${
                    isAssetsExpanded
                      ? "opacity-100 transform translate-y-0"
                      : "opacity-0 transform -translate-y-2"
                  }`}
                >
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">280</div>
                    <div className="text-xs text-gray-600">APEX产出</div>
                  </div>
                </div>
                <div
                  className={`bg-gray-50 rounded-lg p-3 transition-all duration-500 ease-in-out delay-150 ${
                    isAssetsExpanded
                      ? "opacity-100 transform translate-y-0"
                      : "opacity-0 transform -translate-y-2"
                  }`}
                >
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">4798</div>
                    <div className="text-xs text-gray-600">APEX余额</div>
                  </div>
                </div>
                <div
                  className={`bg-gray-50 rounded-lg p-3 transition-all duration-500 ease-in-out delay-200 ${
                    isAssetsExpanded
                      ? "opacity-100 transform translate-y-0"
                      : "opacity-0 transform -translate-y-2"
                  }`}
                >
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">45</div>
                    <div className="text-xs text-gray-600">AD数量</div>
                  </div>
                </div>
              </div>

              {/* 快捷操作按钮 */}
              <div className="border-t border-gray-100 pt-4 mt-4">
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={() => setIsWithdrawModalOpen(true)}
                    className="bg-gradient-to-r from-teal-400 to-green-500 hover:from-teal-500 hover:to-green-600 text-white border-0 rounded-xl py-3 h-auto shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-white/20 rounded-lg flex items-center justify-center shadow-sm">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                          />
                        </svg>
                      </div>
                      <span className="text-sm font-medium">提取</span>
                    </div>
                  </Button>
                  <Button
                    onClick={() => setIsFlashSwapModalOpen(true)}
                    className="w-full bg-gradient-to-r from-teal-400 to-green-500 hover:from-teal-500 hover:to-green-600 text-white border-0 rounded-xl py-3 h-auto shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-white/20 rounded-lg flex items-center justify-center shadow-sm">
                        <ArrowUpDown className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-sm font-medium">闪兑</span>
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 标签页导航 */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white rounded-xl shadow-sm border border-gray-200">
            <TabsTrigger
              value="profile"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-400 data-[state=active]:to-green-500 data-[state=active]:text-white"
            >
              个人
            </TabsTrigger>
            <TabsTrigger
              value="governance"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-400 data-[state=active]:to-green-500 data-[state=active]:text-white"
            >
              治理
            </TabsTrigger>
            <TabsTrigger
              value="studio"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-400 data-[state=active]:to-green-500 data-[state=active]:text-white"
            >
              工作室
            </TabsTrigger>
          </TabsList>

          {/* 个人标签页 */}
          <TabsContent value="profile" className="space-y-4">
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">安全设置</div>
                    <div className="text-xs text-gray-500">账户保护</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">交易密码</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {user.securitySettings.tradingPassword ? (
                        <Check className="w-4 h-4 text-gray-500" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-red-500" />
                      )}
                      <span
                        className={`text-sm font-medium ${
                          user.securitySettings.tradingPassword
                            ? "text-gray-600"
                            : "text-red-600"
                        }`}
                      >
                        {user.securitySettings.tradingPassword
                          ? "已设置"
                          : "未设置"}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">邮箱验证</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {user.securitySettings.emailVerified ? (
                        <Check className="w-4 h-4 text-gray-500" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-yellow-500" />
                      )}
                      <span
                        className={`text-sm font-medium ${
                          user.securitySettings.emailVerified
                            ? "text-gray-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {user.securitySettings.emailVerified
                          ? "已验证"
                          : "待验证"}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 治理标签页 */}
          <TabsContent value="governance" className="space-y-4">
            <GovernanceSection user={user} />
          </TabsContent>

          {/* 工作室标签页 */}
          <TabsContent value="studio" className="space-y-4">
            <StudioSection user={user} />
          </TabsContent>
        </Tabs>
      </div>

      {/* 提取弹窗 */}
      <Dialog open={isWithdrawModalOpen} onOpenChange={setIsWithdrawModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Download className="w-5 h-5" />
              提取代币
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* 代币类型选择 */}
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={withdrawType === "APEX" ? "default" : "outline"}
                onClick={() => setWithdrawType("APEX")}
                className={
                  withdrawType === "APEX"
                    ? "bg-gradient-to-r from-teal-400 to-green-500 text-white"
                    : ""
                }
              >
                APEX
              </Button>
              <Button
                variant={withdrawType === "USDT" ? "default" : "outline"}
                onClick={() => setWithdrawType("USDT")}
                className={
                  withdrawType === "USDT"
                    ? "bg-gradient-to-r from-teal-400 to-green-500 text-white"
                    : ""
                }
              >
                USDT
              </Button>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                提取数量 ({withdrawType})
              </label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  placeholder={`输入${withdrawType}数量`}
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="flex-1 text-lg"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setWithdrawAmount(
                      withdrawType === "APEX"
                        ? user.apexBalance.toString()
                        : "2485"
                    )
                  }
                  className="text-green-600 border-green-200"
                >
                  全部
                </Button>
              </div>
              <div className="text-xs text-gray-500">
                可提取余额:{" "}
                {withdrawType === "APEX" ? user.apexBalance : "2485"}{" "}
                {withdrawType}
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>提取数量:</span>
                  <span className="font-medium">
                    {withdrawAmount || "0"} {withdrawType}
                  </span>
                </div>
                {withdrawType === "APEX" ? (
                  <div className="flex justify-between">
                    <span>销毁AD:</span>
                    <span className="font-medium text-orange-600">
                      {withdrawAmount
                        ? (
                            (parseFloat(withdrawAmount) * 0.1 * 0.963) /
                            2.89
                          ).toFixed(4)
                        : "0"}{" "}
                      AD
                    </span>
                  </div>
                ) : (
                  <div className="flex justify-between">
                    <span>手续费 (10%):</span>
                    <span className="font-medium text-red-600">
                      {withdrawAmount
                        ? (parseFloat(withdrawAmount) * 0.1).toFixed(2)
                        : "0"}{" "}
                      {withdrawType}
                    </span>
                  </div>
                )}
                <div className="flex justify-between border-t pt-2 mt-2">
                  <span>实际到账:</span>
                  <span className="font-bold text-green-600">
                    {withdrawAmount
                      ? withdrawType === "APEX"
                        ? withdrawAmount
                        : (parseFloat(withdrawAmount) * 0.9).toFixed(2)
                      : "0"}{" "}
                    {withdrawType}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setIsWithdrawModalOpen(false)}
                className="flex-1"
                disabled={isLoading}
              >
                取消
              </Button>
              <Button
                onClick={handleWithdraw}
                className="flex-1 bg-gradient-to-r from-teal-400 to-green-500 hover:from-teal-500 hover:to-green-600 text-white"
                disabled={
                  isLoading ||
                  !withdrawAmount ||
                  parseFloat(withdrawAmount) <= 0 ||
                  parseFloat(withdrawAmount) >
                    (withdrawType === "APEX" ? user.apexBalance : 2485)
                }
              >
                {isLoading ? "提取中..." : "确认提取"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 资金记录弹窗 */}
      <Dialog open={isRecordsModalOpen} onOpenChange={setIsRecordsModalOpen}>
        <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              资金记录
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* 记录类型标签页 */}
            <Tabs defaultValue="withdraw" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-100">
                <TabsTrigger value="withdraw">提取记录</TabsTrigger>
                <TabsTrigger value="income">生息记录</TabsTrigger>
              </TabsList>

              {/* 提取记录 */}
              <TabsContent value="withdraw" className="space-y-3 mt-4">
                <div className="space-y-2">
                  <div className="bg-white border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="font-medium text-gray-800">
                          APEX提取
                        </span>
                      </div>
                      <span className="text-xs text-green-600">已完成</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>提取数量:</span>
                        <span className="font-medium">500 APEX</span>
                      </div>
                      <div className="flex justify-between">
                        <span>销毁AD:</span>
                        <span className="text-orange-600">16.67 AD</span>
                      </div>
                      <div className="flex justify-between">
                        <span>时间:</span>
                        <span>2024-12-20 14:30</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="font-medium text-gray-800">
                          AD提取
                        </span>
                      </div>
                      <span className="text-xs text-green-600">已完成</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>提取数量:</span>
                        <span className="font-medium">25 AD</span>
                      </div>
                      <div className="flex justify-between">
                        <span>手续费:</span>
                        <span className="text-red-600">免费</span>
                      </div>
                      <div className="flex justify-between">
                        <span>时间:</span>
                        <span>2024-12-19 16:45</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span className="font-medium text-gray-800">
                          APEX提取
                        </span>
                      </div>
                      <span className="text-xs text-yellow-600">处理中</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>提取数量:</span>
                        <span className="font-medium">1200 APEX</span>
                      </div>
                      <div className="flex justify-between">
                        <span>销毁AD:</span>
                        <span className="text-orange-600">40.01 AD</span>
                      </div>
                      <div className="flex justify-between">
                        <span>时间:</span>
                        <span>2024-12-20 10:15</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* 生息记录 */}
              <TabsContent value="income" className="space-y-3 mt-4">
                <div className="space-y-2">
                  <div className="bg-white border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="font-medium text-gray-800">
                          质押收益
                        </span>
                      </div>
                      <span className="text-xs text-green-600">+24 APEX</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>来源:</span>
                        <span>360天质押合约</span>
                      </div>
                      <div className="flex justify-between">
                        <span>时间:</span>
                        <span>2024-12-20 00:00</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="font-medium text-gray-800">
                          质押收益
                        </span>
                      </div>
                      <span className="text-xs text-green-600">+16 APEX</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>来源:</span>
                        <span>7天质押合约</span>
                      </div>
                      <div className="flex justify-between">
                        <span>时间:</span>
                        <span>2024-12-20 00:00</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="font-medium text-gray-800">
                          AD生成
                        </span>
                      </div>
                      <span className="text-xs text-blue-600">+2.4 AD</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>来源:</span>
                        <span>360天质押利息</span>
                      </div>
                      <div className="flex justify-between">
                        <span>时间:</span>
                        <span>2024-12-20 00:00</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="font-medium text-gray-800">
                          质押收益
                        </span>
                      </div>
                      <span className="text-xs text-green-600">+24 APEX</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>来源:</span>
                        <span>360天质押合约</span>
                      </div>
                      <div className="flex justify-between">
                        <span>时间:</span>
                        <span>2024-12-19 00:00</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="font-medium text-gray-800">
                          质押收益
                        </span>
                      </div>
                      <span className="text-xs text-green-600">+15.5 APEX</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>来源:</span>
                        <span>7天质押合约</span>
                      </div>
                      <div className="flex justify-between">
                        <span>时间:</span>
                        <span>2024-12-19 00:00</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-center pt-2">
              <Button
                variant="outline"
                onClick={() => setIsRecordsModalOpen(false)}
                className="px-8"
              >
                关闭
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 闪兑AD弹窗 */}
      <Dialog
        open={isFlashSwapModalOpen}
        onOpenChange={setIsFlashSwapModalOpen}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ArrowUpDown className="w-5 h-5" />
              闪兑AD
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* AD价格信息 */}
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <Zap className="w-3 h-3 text-white" />
                </div>
                <span className="font-medium text-green-800">
                  闪兑价格: $0.86 USDT
                </span>
              </div>
              <div className="text-xs text-green-700">
                系统定价70%，即时到账
              </div>
            </div>

            {/* 闪兑数量输入 */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                闪兑数量
              </label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  placeholder="输入闪兑数量"
                  value={adAmount}
                  onChange={(e) => setAdAmount(e.target.value)}
                  className="flex-1 text-lg"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setAdAmount(user.adBalance.toString())}
                  className="text-green-600 border-green-200 whitespace-nowrap"
                >
                  全部
                </Button>
              </div>
              <div className="text-xs text-gray-500">
                可闪兑余额: {user.adBalance} AD
              </div>
            </div>

            {/* 预计收到 */}
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">预计收到:</span>
                <span className="font-bold text-gray-900">
                  $
                  {adAmount ? (parseFloat(adAmount) * 0.86).toFixed(2) : "0.00"}{" "}
                  USDT
                </span>
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setIsFlashSwapModalOpen(false)}
                className="flex-1"
              >
                取消
              </Button>
              <Button
                onClick={() => {
                  // 这里处理闪兑逻辑
                  setIsFlashSwapModalOpen(false);
                  setAdAmount("");
                  // 可以添加 toast 提示
                }}
                className="flex-1 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white"
                disabled={
                  !adAmount ||
                  parseFloat(adAmount) <= 0 ||
                  parseFloat(adAmount) > user.adBalance
                }
              >
                确认闪兑
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const StudioSection = ({ user }: { user: any }) => {
  const [isReimbursementModalOpen, setIsReimbursementModalOpen] =
    useState(false);
  const [isReimbursementSuccessModalOpen, setIsReimbursementSuccessModalOpen] =
    useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isRulesExpanded, setIsRulesExpanded] = useState(false);
  const [isTeamPerformanceModalOpen, setIsTeamPerformanceModalOpen] =
    useState(false);
  const [isClaimSuccessModalOpen, setIsClaimSuccessModalOpen] = useState(false);

  const studioData = {
    monthlyPerformance: 12500,
    fifteenDayPerformance: 18750, // 15日新增业绩
    dailyNewPerformance: 2000,
    totalMembers: 45,
    activeMembers: 32,
    monthlyGrowth: 15.2,
    isWorkshop: true, // 是否为工作室
    tools: [
      { name: "高级分析", status: "可用" },
      { name: "团队管理", status: "可用" },
      { name: "自定义报告", status: "可用" },
      { name: "API访问", status: "可用" },
    ],
    reimbursement: {
      todayNewPerformance: 2000, // 今日新增业绩 USDT
      availableToday: 100, // 可申请餐补 100 USDT
    },
  };

  return (
    <>
      {/* 团队业绩卡片 */}
      <Card className="bg-white shadow-sm border border-gray-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
              <Building className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="font-semibold text-gray-800">工作室概览</div>
              <div className="text-xs text-gray-500">管理仪表板</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-800">45,280</div>
                <div className="text-sm text-gray-500">总业绩 USDT</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">总成员数</span>
                <span className="font-medium text-gray-900">45</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">15天新增业绩</span>
                <span className="font-medium text-gray-900">5,778 USDT</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">可领取补贴</span>
                <span className="font-medium text-green-600">288.9 USDT</span>
              </div>
            </div>

            {/* 按钮组 */}
            <div className="mt-4">
              {/* 领取补贴按钮 */}
              <Button
                onClick={() => {
                  // 显示领取成功弹窗
                  setIsClaimSuccessModalOpen(true);
                }}
                className="w-full bg-gradient-to-r from-teal-400 to-green-500 hover:from-teal-500 hover:to-green-600 text-white"
              >
                <Award className="w-4 h-4 mr-2" />
                领取补贴
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 餐费报销申请 */}
      {studioData.isWorkshop && studioData.dailyNewPerformance >= 1000 && (
        <Card className="bg-white shadow-sm border border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-500 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-4 w-4 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-800">餐费报销</div>
                  <div className="text-xs text-gray-500">工作室专享</div>
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
                    <DialogTitle className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5" />
                      餐费申请规则
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                      <h4 className="font-semibold mb-2 text-green-800">
                        💰 餐补标准
                      </h4>
                      <div className="text-green-700 text-sm space-y-1">
                        <p>• 餐补 = 日新增业绩 × 5%</p>
                        <p>• 4000U以上封顶200U</p>
                        <p>• 仅限工作室成员申请</p>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <h4 className="font-semibold mb-2 text-blue-800">
                        📋 申请条件
                      </h4>
                      <div className="text-blue-700 text-sm space-y-1">
                        <p>• 必须是认证工作室</p>
                        <p>• 日新增业绩 ≥ 1000 USDT</p>
                        <p>• 当日可申请一次</p>
                      </div>
                    </div>

                    <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                      <h4 className="font-semibold mb-2 text-orange-800">
                        ⚡ 申请流程
                      </h4>
                      <div className="text-orange-700 text-sm space-y-1">
                        <p>1. 提交餐费申请</p>
                        <p>2. 电报群提交用餐素材</p>
                        <p>3. 等待管理员审核</p>
                        <p>4. 审核通过后可提取</p>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-4">
              {/* 今日新增业绩 - 中心显示 */}
              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-800">
                    {studioData.reimbursement.todayNewPerformance.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">今日新增业绩 USDT</div>
                </div>
              </div>

              {/* 可申请餐补 */}
              <div className="flex justify-between items-center">
                <span className="text-gray-600">可申请餐补</span>
                <span className="font-medium text-green-600">
                  {studioData.reimbursement.availableToday} USDT
                </span>
              </div>

              {/* 申请按钮 */}
              <Button
                onClick={() => setIsReimbursementSuccessModalOpen(true)}
                className="w-full bg-gradient-to-r from-teal-400 to-green-500 hover:from-teal-500 hover:to-green-600 text-white"
                disabled={studioData.reimbursement.availableToday <= 0}
              >
                <DollarSign className="w-4 h-4 mr-2" />
                申请报销
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 报销申请弹窗 */}
      <Dialog
        open={isReimbursementModalOpen}
        onOpenChange={setIsReimbursementModalOpen}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              申请餐费报销
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-4 gap-4">
            {/* 今日新增业绩 */}
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">
                  {studioData.reimbursement.todayNewPerformance.toLocaleString()}
                </div>
                <div className="text-sm text-green-700">今日新增业绩</div>
                <div className="text-xs text-gray-500">USDT</div>
              </div>
            </div>

            {/* 可申请餐补 */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">
                  {studioData.reimbursement.availableToday}
                </div>
                <div className="text-sm text-blue-700">可申请餐补</div>
                <div className="text-xs text-gray-500">USDT</div>
              </div>
            </div>

            {/* 餐补规则 */}
            <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
              <div className="text-orange-800 text-xs">
                <div className="font-medium mb-2">餐补规则</div>
                <div>• 日业绩 × 5%</div>
                <div>• 4000U以上200U封顶</div>
                <div>• 工作室专享</div>
              </div>
            </div>

            {/* 申请流程 */}
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <div className="text-purple-800 text-xs">
                <div className="font-medium mb-2">申请流程</div>
                <div>1. 提交申请</div>
                <div>2. 电报群提交素材</div>
                <div>3. 等待审核</div>
                <div>4. 审核通过后提取</div>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <Button
              variant="outline"
              onClick={() => setIsReimbursementModalOpen(false)}
              className="flex-1"
            >
              取消
            </Button>
            <Button
              onClick={() => {
                // 关闭申请弹窗，显示成功弹窗
                setIsReimbursementModalOpen(false);
                setIsReimbursementSuccessModalOpen(true);
              }}
              className="flex-1 bg-gradient-to-r from-teal-400 to-green-500 hover:from-teal-500 hover:to-green-600 text-white"
            >
              确认申请
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 团队业绩详情弹窗 */}
      <Dialog
        open={isTeamPerformanceModalOpen}
        onOpenChange={setIsTeamPerformanceModalOpen}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              团队业绩
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* 团队业绩概览 */}
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-800">动态奖励概览</span>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-800 mb-1">
                    $19.3M
                  </div>
                  <div className="text-sm text-green-600">TVL总锁定</div>
                </div>
              </div>
            </div>

            {/* 业绩数据 */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white border border-gray-200 rounded-lg p-3">
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">158</div>
                  <div className="text-xs text-gray-600">团队人数</div>
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-3">
                <div className="text-center">
                  <div className="text-xl font-bold text-green-600">+2,340</div>
                  <div className="text-xs text-gray-600">7日增长 APEX</div>
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-3">
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">158,000</div>
                  <div className="text-xs text-gray-600">全网小业绩</div>
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-3">
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">15,420</div>
                  <div className="text-xs text-gray-600">小区业绩</div>
                </div>
              </div>
            </div>

            {/* 总收益 */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">总收益:</span>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-gray-900">
                    2365.8 APEX
                  </span>
                  <Button
                    size="sm"
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 text-xs"
                  >
                    提取
                  </Button>
                </div>
              </div>
            </div>

            {/* 动态可用额度 */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">动态可用额度:</span>
                <span className="text-xl font-bold text-gray-900">
                  200 USDT
                </span>
              </div>
            </div>

            {/* 规则展开按钮 */}
            <div className="border-t pt-4">
              <Button
                variant="ghost"
                onClick={() => setIsRulesExpanded(!isRulesExpanded)}
                className="w-full flex items-center justify-between text-gray-600 hover:text-gray-800"
              >
                <span className="text-sm font-medium">动态收益规则</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isRulesExpanded ? "rotate-180" : ""
                  }`}
                />
              </Button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isRulesExpanded
                    ? "max-h-96 opacity-100 mt-3"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="space-y-3 text-xs">
                  <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                    <div className="font-medium text-blue-800 mb-2 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      直推奖 (15%)
                    </div>
                    <div className="text-blue-700 space-y-1">
                      <div>• 获得直推用户质押收益的15%</div>
                      <div>• 有效账户条件：直推账户质押≥5枚APEX</div>
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                    <div className="font-medium text-green-800 mb-2 flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      层级奖 (2%)
                    </div>
                    <div className="text-green-700 space-y-1">
                      <div>• 2-15层用户质押收益的2%</div>
                      <div>• 直推2个：拿4层 | 直推3个：拿7层</div>
                      <div>• 直推4个：拿10层 | 直推5个：拿15层</div>
                    </div>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                    <div className="font-medium text-purple-800 mb-2 flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      管理奖
                    </div>
                    <div className="text-purple-700 space-y-1">
                      <div>• 个人小区质押算力/全网小区质押算力</div>
                      <div>• × 全网静态质押产出的60%</div>
                      <div>• 小区定义：除最大区外的所有区之和</div>
                    </div>
                  </div>

                  <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
                    <div className="font-medium text-orange-800 mb-2 flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      加权分红
                    </div>
                    <div className="text-orange-700 space-y-1">
                      <div>• 按7日内小区新增算力分配</div>
                      <div>• 全网质押收益的10%</div>
                      <div>• 7日内个人小区新增算力/全网7日内新增算力</div>
                    </div>
                  </div>

                  <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                    <div className="font-medium text-red-800 mb-2 flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      封顶机制
                    </div>
                    <div className="text-red-700 space-y-1">
                      <div>
                        • (账号质押量(最大200枚) + 该账户销毁的)APEX × 4
                      </div>
                      <div>
                        • 当前封顶：{user.dynamicCap.toLocaleString()} USDT
                      </div>
                      <div>
                        • 已使用：{user.dynamicQuota.toLocaleString()} USDT
                      </div>
                      <div>
                        • 可用额度：
                        {(
                          user.dynamicCap - user.dynamicQuota
                        ).toLocaleString()}{" "}
                        USDT
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-2">
              <Button
                variant="outline"
                onClick={() => setIsTeamPerformanceModalOpen(false)}
                className="px-8"
              >
                关闭
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 领取成功弹窗 */}
      <Dialog
        open={isClaimSuccessModalOpen}
        onOpenChange={setIsClaimSuccessModalOpen}
      >
        <DialogContent className="max-w-sm">
          <div className="flex flex-col items-center py-6 space-y-6">
            {/* 第一行：领取成功！ */}
            <div className="text-lg font-semibold text-gray-900">
              领取成功！
            </div>

            {/* 第二行：288.9 USDT */}
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">288.9</div>
              <div className="text-sm text-gray-500">USDT</div>
            </div>

            {/* 第三行：确定按钮 */}
            <Button
              onClick={() => setIsClaimSuccessModalOpen(false)}
              className="bg-gradient-to-r from-teal-400 to-green-500 hover:from-teal-500 hover:to-green-600 text-white w-full"
            >
              确定
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 餐费申请成功弹窗 */}
      <Dialog
        open={isReimbursementSuccessModalOpen}
        onOpenChange={setIsReimbursementSuccessModalOpen}
      >
        <DialogContent className="max-w-sm">
          <div className="flex flex-col items-center py-6 space-y-6">
            {/* 第一行：申请提交成功！ */}
            <div className="text-lg font-semibold text-gray-900">
              申请提交成功！
            </div>

            {/* 第二行：请等待审核通过 */}
            <div className="text-center">
              <div className="text-base text-gray-600">请等待审核通过</div>
            </div>

            {/* 第三行：确定按钮 */}
            <Button
              onClick={() => setIsReimbursementSuccessModalOpen(false)}
              className="bg-gradient-to-r from-teal-400 to-green-500 hover:from-teal-500 hover:to-green-600 text-white w-full"
            >
              确定
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

const GovernanceSection = ({ user }: { user: any }) => {
  return (
    <>
      {/* 治理概览 */}
      <Card className="bg-white shadow-sm border border-gray-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
              <Vote className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="font-semibold text-gray-800">治理概览</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-green-50 rounded-lg p-3">
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">
                    {user.adBalance}
                  </div>
                  <div className="text-xs text-gray-800">投票权重</div>
                </div>
              </div>
              <div className="bg-green-50 rounded-lg p-3">
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">3</div>
                  <div className="text-xs text-gray-800">已参与投票</div>
                </div>
              </div>
              <div className="bg-green-50 rounded-lg p-3">
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">2</div>
                  <div className="text-xs text-gray-800">活跃提案</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-sm text-gray-600">
                <div className="flex justify-between items-center mb-2">
                  <span>投票参与率</span>
                  <span className="font-medium">75%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full"
                    style={{ width: "75%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 提案列表 */}
      <Card className="bg-white shadow-sm border border-gray-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="font-semibold text-gray-800">治理提案</div>
            </div>
          </div>

          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
              <div className="text-gray-500 text-lg font-medium">
                内容待更新
              </div>
              <div className="text-gray-400 text-sm mt-2">
                治理提案功能正在开发中，敬请期待
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
