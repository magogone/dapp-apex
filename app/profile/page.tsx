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
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
  dailyNewPerformance: 2800,
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
      <header className="bg-white shadow-sm border-b relative z-20">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-green-500 rounded-lg flex items-center justify-center">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-xl font-bold text-green-600">APEX</div>
                <div className="text-xs text-gray-500">个人中心</div>
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
                {isConnected ? (
                  <div className="mx-4 space-y-2">
                    <div className="flex items-center justify-center gap-2">
                      <div className="text-xs text-gray-600">
                        已连接: {address?.slice(0, 6)}...{address?.slice(-4)}
                      </div>
                      {/* VIP等级标识 */}
                      {user.stakingAmount >= 10000 && (
                        <div className="px-1.5 py-0.5 bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs font-bold rounded-full">
                          VIP2
                        </div>
                      )}
                      {user.stakingAmount >= 1000 &&
                        user.stakingAmount < 10000 && (
                          <div className="px-1.5 py-0.5 bg-gradient-to-r from-green-400 to-green-600 text-white text-xs font-bold rounded-full">
                            VIP1
                          </div>
                        )}
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
                size="icon"
                variant="ghost"
                onClick={copyAddress}
                className="text-gray-500 hover:text-gray-700"
              >
                <Copy className="w-4 h-4" />
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
                    <div className="text-lg font-bold text-gray-900">
                      {user.adBalance}
                    </div>
                    <div className="text-xs text-gray-600">AD余额</div>
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
                    <div className="text-lg font-bold text-gray-900">
                      {user.apexBalance || 4798}
                    </div>
                    <div className="text-xs text-gray-600">APEX余额</div>
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
                    <div className="text-lg font-bold text-green-600">2485</div>
                    <div className="text-xs text-gray-600">USDT</div>
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
                    <div className="text-lg font-bold text-gray-800">
                      {user.stakingAmount || 4000}
                    </div>
                    <div className="text-xs text-gray-600">APEX质押中</div>
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
                  <Link href="/">
                    <Button className="w-full bg-gradient-to-r from-teal-400 to-green-500 hover:from-teal-500 hover:to-green-600 text-white border-0 rounded-xl py-3 h-auto shadow-sm">
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
                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                            <circle cx="12" cy="15" r="1" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium">质押</span>
                      </div>
                    </Button>
                  </Link>
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
    </div>
  );
}

const StudioSection = ({ user }: { user: any }) => {
  const [isReimbursementModalOpen, setIsReimbursementModalOpen] =
    useState(false);

  const studioData = {
    status: "进行中",
    level: "高级版",
    monthlyPerformance: 12500,
    dailyNewPerformance: 2800,
    totalMembers: 45,
    activeMembers: 32,
    monthlyGrowth: 15.2,
    isWorkshop: true, // 是否为工作室
    tools: [
      { name: "高级分析", status: "可用" },
      { name: "团队管理", status: "可用" },
      { name: "自定义报告", status: "可用" },
      { name: "API访问", status: "仅高级版" },
    ],
    reimbursement: {
      todayNewPerformance: 2800, // 今日新增业绩 USDT
      reimbursementRate: 0.05, // 5%
      maxDaily: 200, // 最高200 USDT/天
      availableToday: 140, // 今日可申请金额
      pendingApplications: 1, // 待审核申请
      approvedToday: 60, // 今日已通过
    },
  };

  return (
    <>
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
            <div className="flex justify-between items-center">
              <span className="text-gray-600">工作室等级</span>
              <div className="flex items-center gap-2">
                <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-medium">
                  {studioData.level}
                </span>
                <span className="bg-green-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                  {studioData.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">
                    {studioData.monthlyPerformance.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-600">月业绩</div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">
                    {studioData.dailyNewPerformance.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-600">日新增业绩</div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">总成员数</span>
                <span className="font-medium text-gray-900">
                  {studioData.totalMembers}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">活跃成员</span>
                <span className="font-medium text-gray-900">
                  {studioData.activeMembers}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">月增长率</span>
                <span className="font-medium text-gray-600">
                  +{studioData.monthlyGrowth}%
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 餐费报销申请 */}
      {studioData.isWorkshop && studioData.dailyNewPerformance >= 1000 && (
        <Card className="bg-white shadow-sm border border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-500 rounded-lg flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="font-semibold text-gray-800">餐费报销</div>
                <div className="text-xs text-gray-500">工作室专享</div>
              </div>
            </div>

            <div className="space-y-4">
              {/* 报销统计 */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-green-50 rounded-lg p-3">
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">
                      {studioData.reimbursement.availableToday}
                    </div>
                    <div className="text-xs text-green-600">今日可申请</div>
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-3">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-600">
                      {studioData.reimbursement.todayNewPerformance.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-600">今日新增业绩</div>
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-3">
                  <div className="text-center">
                    <div className="text-lg font-bold text-orange-600">
                      {studioData.reimbursement.pendingApplications}
                    </div>
                    <div className="text-xs text-orange-600">待审核申请</div>
                  </div>
                </div>
              </div>

              {/* 申请按钮 */}
              <Button
                onClick={() => setIsReimbursementModalOpen(true)}
                className="w-full bg-gradient-to-r from-teal-400 to-green-500 hover:from-teal-500 hover:to-green-600 text-white"
                disabled={studioData.reimbursement.availableToday <= 0}
              >
                <DollarSign className="w-4 h-4 mr-2" />
                申请餐费报销
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
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              申请餐费报销
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">今日新增业绩:</span>
                  <span className="font-medium">
                    {studioData.reimbursement.todayNewPerformance.toLocaleString()}{" "}
                    USDT
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">报销比例:</span>
                  <span className="font-medium">
                    {studioData.reimbursement.reimbursementRate * 100}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">可申请金额:</span>
                  <span className="font-medium text-gray-600">
                    {studioData.reimbursement.availableToday} USDT
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-3 border border-green-200">
              <div className="text-xs text-gray-800">
                <div className="font-medium mb-1 flex items-center gap-2">
                  <Smartphone className="w-4 h-4" />
                  申请流程：
                </div>
                <div>1. 提交申请</div>
                <div>2. 电报群提交素材</div>
                <div>3. 等待审核</div>
                <div>4. 审核通过后提取</div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setIsReimbursementModalOpen(false)}
                className="flex-1"
              >
                取消
              </Button>
              <Button
                onClick={() => {
                  // 这里处理申请逻辑
                  setIsReimbursementModalOpen(false);
                  // 可以添加 toast 提示
                }}
                className="flex-1 bg-gradient-to-r from-teal-400 to-green-500 hover:from-teal-500 hover:to-green-600 text-white"
              >
                确认申请
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

const GovernanceSection = ({ user }: { user: any }) => {
  const [selectedProposal, setSelectedProposal] = useState<number | null>(null);
  const [voteModalOpen, setVoteModalOpen] = useState(false);
  const [selectedVote, setSelectedVote] = useState<
    "for" | "against" | "abstain" | null
  >(null);

  // 模拟提案数据
  const proposals = [
    {
      id: 1,
      title: "调整7天质押利率",
      description: "上限调整为1.2%",
      status: "active",
      startTime: "2024-01-15",
      endTime: "2024-01-22",
      votesFor: 12580,
      votesAgainst: 3420,
      totalVotes: 16000,
      myVote: null,
      requiredAD: 10,
    },
    {
      id: 2,
      title: "AD价格增长调整",
      description: "每日增值调整为0.12 USDT",
      status: "active",
      startTime: "2024-01-10",
      endTime: "2024-01-20",
      votesFor: 8900,
      votesAgainst: 5600,
      totalVotes: 14500,
      myVote: "for",
      requiredAD: 5,
    },
    {
      id: 3,
      title: "优化提现手续费",
      description: "降低到8%，增加AD抵扣",
      status: "passed",
      startTime: "2024-01-01",
      endTime: "2024-01-08",
      votesFor: 18500,
      votesAgainst: 2100,
      totalVotes: 20600,
      myVote: "for",
      requiredAD: 15,
    },
    {
      id: 4,
      title: "节点分红条件调整",
      description: "小区业绩要求降至8000 USDT",
      status: "rejected",
      startTime: "2023-12-20",
      endTime: "2023-12-27",
      votesFor: 6200,
      votesAgainst: 11800,
      totalVotes: 18000,
      myVote: "against",
      requiredAD: 20,
    },
  ];

  const handleVote = (
    proposalId: number,
    voteType: "for" | "against" | "abstain"
  ) => {
    setSelectedProposal(proposalId);
    setSelectedVote(voteType);
    setVoteModalOpen(true);
  };

  const confirmVote = () => {
    console.log(`投票提案 ${selectedProposal}:`, selectedVote);
    setVoteModalOpen(false);
    setSelectedProposal(null);
    setSelectedVote(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-600 bg-green-50 border-green-200";
      case "passed":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "rejected":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "进行中";
      case "passed":
        return "已通过";
      case "rejected":
        return "已拒绝";
      default:
        return "未知";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return Clock;
      case "passed":
        return CheckCircle;
      case "rejected":
        return XCircle;
      default:
        return FileText;
    }
  };

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
                  <div className="text-xs text-gray-800">进行中提案</div>
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

          <div className="space-y-4">
            {proposals.map((proposal) => {
              const StatusIcon = getStatusIcon(proposal.status);
              return (
                <div
                  key={proposal.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-gray-800">
                          {proposal.title}
                        </h3>
                        <div
                          className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 border ${getStatusColor(
                            proposal.status
                          )}`}
                        >
                          <StatusIcon className="w-3 h-3" />
                          {getStatusText(proposal.status)}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {proposal.description}
                      </p>
                      <div className="text-xs text-gray-500">
                        需要 {proposal.requiredAD} AD
                      </div>
                    </div>
                  </div>

                  {/* 投票结果 */}
                  <div className="mb-3">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>赞成 {proposal.votesFor.toLocaleString()}</span>
                      <span>反对 {proposal.votesAgainst.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-l-full"
                        style={{
                          width: `${
                            (proposal.votesFor / proposal.totalVotes) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* 投票按钮 */}
                  {proposal.status === "active" &&
                    user.adBalance >= proposal.requiredAD && (
                      <div className="grid grid-cols-3 gap-2">
                        {proposal.myVote ? (
                          <div className="col-span-3 text-sm text-white bg-gradient-to-r from-teal-400 to-green-500 px-3 py-2 rounded-lg text-center">
                            已投票:{" "}
                            {proposal.myVote === "for"
                              ? "赞成"
                              : proposal.myVote === "against"
                              ? "反对"
                              : "弃权"}
                          </div>
                        ) : (
                          <>
                            <Button
                              size="sm"
                              onClick={() => handleVote(proposal.id, "for")}
                              className="bg-gradient-to-r from-teal-400 to-green-500 hover:from-teal-500 hover:to-green-600 text-white"
                            >
                              赞成
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleVote(proposal.id, "against")}
                              className="border-red-200 text-red-600 hover:bg-red-50"
                            >
                              反对
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleVote(proposal.id, "abstain")}
                              className="border-gray-200 text-gray-600 hover:bg-gray-50"
                            >
                              弃权
                            </Button>
                          </>
                        )}
                      </div>
                    )}

                  {proposal.status === "active" &&
                    user.adBalance < proposal.requiredAD && (
                      <div className="text-sm text-orange-600 bg-orange-50 px-3 py-2 rounded-lg">
                        需要 {proposal.requiredAD} AD 参与投票
                      </div>
                    )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* 投票确认弹窗 */}
      <Dialog open={voteModalOpen} onOpenChange={setVoteModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Vote className="w-5 h-5" />
              确认投票
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedProposal && (
              <>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm space-y-2">
                    <div className="font-medium text-gray-800">
                      {proposals.find((p) => p.id === selectedProposal)?.title}
                    </div>
                    <div className="text-gray-600">
                      选择:{" "}
                      <span className="font-medium text-green-600">
                        {selectedVote === "for"
                          ? "赞成"
                          : selectedVote === "against"
                          ? "反对"
                          : "弃权"}
                      </span>
                    </div>
                    <div className="text-gray-600">
                      权重:{" "}
                      <span className="font-medium">{user.adBalance} AD</span>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
                  <div className="text-xs text-yellow-800">
                    <div className="font-medium mb-1 flex items-center gap-2">
                      <TriangleAlert className="w-4 h-4" />
                      投票须知：
                    </div>
                    <div>• 投票提交后无法修改</div>
                    <div>• 权重基于AD数量</div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setVoteModalOpen(false)}
                    className="flex-1"
                  >
                    取消
                  </Button>
                  <Button
                    onClick={confirmVote}
                    className="flex-1 bg-gradient-to-r from-teal-400 to-green-500 hover:from-teal-500 hover:to-green-600 text-white"
                  >
                    确认投票
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
