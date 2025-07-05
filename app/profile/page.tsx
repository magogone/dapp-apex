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
  apedBalance: 45,
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
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawType, setWithdrawType] = useState<"APEX" | "APED">("APEX");
  const [isLoading, setIsLoading] = useState(false);
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

  const handleDeposit = async () => {
    if (!depositAmount || parseFloat(depositAmount) <= 0) return;
    setIsLoading(true);
    // 模拟充值处理
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    setIsDepositModalOpen(false);
    setDepositAmount("");
  };

  const handleWithdraw = async () => {
    if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) return;
    setIsLoading(true);
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
                <span className="text-white font-bold text-sm">🌿</span>
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
              <div className="mb-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-gray-200">
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-800 mb-2">
                    总资产价值
                  </div>
                  <div className="text-3xl font-bold text-green-900 mb-1">
                    $
                    {(
                      user.apedBalance * 2.89 +
                      user.apexBalance * 0.963 +
                      user.totalEarnings * 0.963 +
                      user.stakingAmount * 0.963
                    ).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </div>
                  <div className="text-xs text-gray-600">
                    APED=${(user.apedBalance * 2.89).toFixed(2)} APEX=$
                    {((user.apexBalance || 4798) * 0.963).toFixed(2)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">
                      {user.apedBalance}
                    </div>
                    <div className="text-xs text-gray-600">APED余额</div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">
                      {user.apexBalance || 4798}
                    </div>
                    <div className="text-xs text-gray-600">APEX余额</div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">
                      {user.totalEarnings}
                    </div>
                    <div className="text-xs text-gray-600">累计收益</div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-800">
                      {user.stakingAmount || 4000}
                    </div>
                    <div className="text-xs text-gray-600">质押中</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 快捷操作按钮 */}
        <div className="grid grid-cols-3 gap-3">
          <Button
            onClick={() => setIsDepositModalOpen(true)}
            className="bg-white hover:bg-gray-50 text-gray-600 border border-gray-200 rounded-xl py-3 h-auto shadow-sm"
          >
            <div className="flex flex-col items-center gap-1">
              <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center shadow-sm">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                  <circle cx="12" cy="12" r="10" strokeWidth={1.5} />
                </svg>
              </div>
              <span className="text-sm font-medium">充值</span>
            </div>
          </Button>
          <Button
            onClick={() => setIsWithdrawModalOpen(true)}
            className="bg-white hover:bg-gray-50 text-gray-600 border border-gray-200 rounded-xl py-3 h-auto shadow-sm"
          >
            <div className="flex flex-col items-center gap-1">
              <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center shadow-sm">
                <svg
                  className="w-4 h-4 text-white"
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
            <Button className="w-full bg-white hover:bg-gray-50 text-gray-600 border border-gray-200 rounded-xl py-3 h-auto shadow-sm">
              <div className="flex flex-col items-center gap-1">
                <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center shadow-sm">
                  <svg
                    className="w-4 h-4 text-white"
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

        {/* 标签页导航 */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white rounded-xl shadow-sm border border-gray-200">
            <TabsTrigger
              value="profile"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-400 data-[state=active]:to-green-500 data-[state=active]:text-white"
            >
              个人
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

          {/* 工作室标签页 */}
          <TabsContent value="studio" className="space-y-4">
            <StudioSection user={user} />
          </TabsContent>
        </Tabs>
      </div>

      {/* 充值弹窗 */}
      <Dialog open={isDepositModalOpen} onOpenChange={setIsDepositModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>💰 充值APEX</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                充值数量 (APEX)
              </label>
              <Input
                type="number"
                placeholder="输入APEX数量"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                className="text-lg"
              />
            </div>

            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>充值数量:</span>
                  <span className="font-medium">
                    {depositAmount || "0"} APEX
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>手续费:</span>
                  <span className="font-medium">0 APEX</span>
                </div>
                <div className="flex justify-between border-t pt-2 mt-2">
                  <span>到账数量:</span>
                  <span className="font-bold text-green-600">
                    {depositAmount || "0"} APEX
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setIsDepositModalOpen(false)}
                className="flex-1"
                disabled={isLoading}
              >
                取消
              </Button>
              <Button
                onClick={handleDeposit}
                className="flex-1 bg-gradient-to-r from-teal-400 to-green-500 hover:from-teal-500 hover:to-green-600 text-white"
                disabled={
                  isLoading || !depositAmount || parseFloat(depositAmount) <= 0
                }
              >
                {isLoading ? "充值中..." : "确认充值"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 提取弹窗 */}
      <Dialog open={isWithdrawModalOpen} onOpenChange={setIsWithdrawModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>💸 提取代币</DialogTitle>
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
                variant={withdrawType === "APED" ? "default" : "outline"}
                onClick={() => setWithdrawType("APED")}
                className={
                  withdrawType === "APED"
                    ? "bg-gradient-to-r from-teal-400 to-green-500 text-white"
                    : ""
                }
              >
                APED
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
                        : user.apedBalance.toString()
                    )
                  }
                  className="text-green-600 border-green-200"
                >
                  全部
                </Button>
              </div>
              <div className="text-xs text-gray-500">
                可提取余额:{" "}
                {withdrawType === "APEX" ? user.apexBalance : user.apedBalance}{" "}
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
                <div className="flex justify-between">
                  <span>手续费 (10%):</span>
                  <span className="font-medium text-red-600">
                    {withdrawAmount
                      ? (parseFloat(withdrawAmount) * 0.1).toFixed(2)
                      : "0"}{" "}
                    {withdrawType}
                  </span>
                </div>
                <div className="flex justify-between border-t pt-2 mt-2">
                  <span>实际到账:</span>
                  <span className="font-bold text-green-600">
                    {withdrawAmount
                      ? (parseFloat(withdrawAmount) * 0.9).toFixed(2)
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
                    (withdrawType === "APEX"
                      ? user.apexBalance
                      : user.apedBalance)
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
            <DialogTitle>💰 申请餐费报销</DialogTitle>
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
                <div className="font-medium mb-1">📱 申请流程：</div>
                <div>1. 点击"确认申请"提交申请</div>
                <div>2. 前往电报群提交素材（讲课/吃饭视频）</div>
                <div>3. 等待客服审核</div>
                <div>4. 审核通过后在App中领取</div>
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
