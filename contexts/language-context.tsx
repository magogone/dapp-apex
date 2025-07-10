"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "zh";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Header
    "header.welcomeBack": "Welcome Back",
    "header.today": "Today",

    // Splash Screen
    "splash.initializing": "Initializing Interface...",
    "splash.connecting": "Connecting to Blockchain Network...",
    "splash.loading": "Loading Staking Protocols...",
    "splash.securing": "Securing Connection...",
    "splash.title": "APEX Finance",
    "splash.subtitle": "Your Gateway to DeFi Staking",
    "splash.skip": "Skip",

    // Home Dashboard
    "home.totalStaking": "Your Total Staking Value",
    "home.adGenerated": "AD Generated",
    "home.dailyInterest": "Daily Interest",
    "home.dynamicRewards": "Dynamic Rewards",
    "home.stakingPools": "Staking Pools",
    "home.mostPopular": "Most Popular",
    "home.sevenDayStaking": "7-Day Flexible Staking",
    "home.threeSixtyDayStaking": "360-Day Governance Stake",
    "home.apy": "APY",
    "home.duration": "Duration",
    "home.interest": "Interest",
    "home.cycle": "Cycle",
    "home.compound": "Comp.",
    "home.aped": "AD",
    "home.fixed": "Fixed",
    "home.days": "Days",
    "home.daily": "Daily",
    "home.on": "On",
    "home.yes": "Yes",
    "home.ad": "AD",

    // Analytics
    "analytics.title": "Analytics",
    "analytics.earnings": "Earnings",
    "analytics.dynamicRewards": "Dynamic Rewards Breakdown",
    "analytics.directReferrals": "Direct Referrals",
    "analytics.managementBonus": "Management Bonus",
    "analytics.teamSize": "Team Size",
    "analytics.weightedDividend": "Weighted Dividend",
    "analytics.users": "Users",

    // My Stakes
    "myStakes.title": "My Stakes",
    "myStakes.search": "Search stakes...",
    "myStakes.all": "All",
    "myStakes.active": "Active",
    "myStakes.expired": "Expired",

    // Profile
    "profile.title": "Profile",
    "profile.walletAddress": "Wallet Address",
    "profile.node": "Node",
    "profile.studio": "Studio",
    "profile.studioDashboard": "Studio Dashboard",
    "profile.teamPerformance": "Total Team Performance",
    "profile.applyReimbursement": "Apply for Meal Reimbursement",
    "profile.reimbursementNote":
      "Daily reimbursement: 5% of new performance, up to 200 USDT.",
    "profile.disconnectWallet": "Disconnect Wallet",

    // Staking
    "staking.sevenDay": "7-Day Staking",
    "staking.threeSixtyDay": "360-Day Staking",
    "staking.amount": "Amount",
    "staking.interest": "Interest Rate",
    "staking.compound": "Auto Compound",
    "staking.stake": "Stake",
    "staking.unstake": "Unstake",
    "staking.withdraw": "Withdraw",
    "staking.fee": "Fee",
    "staking.adDeduction": "Use AD for Fee",

    // AD
    "ad.title": "AD Token",
    "ad.price": "Current Price",
    "ad.dailyIncrease": "Daily Increase: +0.1 USDT",
    "ad.uses": "Uses",
    "ad.feeDeduction": "Fee Deduction",
    "ad.governance": "Governance Voting",
    "ad.ecosystem": "Ecosystem Applications",

    // Dynamic Rewards
    "dynamic.directBonus": "Direct Bonus",
    "dynamic.levelBonus": "Level Bonus",
    "dynamic.managementBonus": "Management Bonus",
    "dynamic.weightedDividend": "Weighted Dividend",
    "dynamic.available": "Available",
    "dynamic.cap": "Cap",
    "dynamic.calculator": "Reward Calculator",

    // Nodes
    "nodes.title": "Node Recruitment",
    "nodes.vip1": "VIP 1 Node",
    "nodes.vip2": "VIP 2 Node",
    "nodes.price": "Price",
    "nodes.limited": "Limited",
    "nodes.benefits": "Benefits",
    "nodes.simulator": "Revenue Simulator",

    // Withdrawal
    "withdraw.title": "Withdraw",
    "withdraw.range": "Range: 1-2000 APEX",
    "withdraw.auto": "Auto Process",
    "withdraw.manual": "Manual Review",
    "withdraw.fee": "10% Service Fee",
    "withdraw.records": "Withdrawal Records",

    // Navigation
    "nav.home": "Home",
    "nav.myStakes": "Stakes",
    "nav.stake": "Swap",
    "nav.analytics": "Team",
    "nav.profile": "Profile",

    // Activity
    "activity.title": "Activity Center",
    "activity.subtitle":
      "Discover exciting activities and participate to win rewards",
    "activity.activityList": "Activity List",
    "activity.participationRecords": "Participation Records",

    // Common
    "common.loading": "Loading...",
    "common.error": "Error",
    "common.success": "Success",
  },
  zh: {
    // Header
    "header.welcomeBack": "欢迎回来",
    "header.today": "今天",

    // Splash Screen
    "splash.initializing": "正在初始化界面...",
    "splash.connecting": "正在连接区块链网络...",
    "splash.loading": "正在加载质押协议...",
    "splash.securing": "正在保护连接...",
    "splash.title": "APEX Finance",
    "splash.subtitle": "您的DeFi质押门户",
    "splash.skip": "跳过",

    // Home Dashboard
    "home.totalStaking": "您的总质押价值",
    "home.adGenerated": "已生成",
    "home.dailyInterest": "每日利息",
    "home.dynamicRewards": "动态奖励",
    "home.stakingPools": "质押池",
    "home.mostPopular": "最受欢迎",
    "home.sevenDayStaking": "7天灵活质押",
    "home.threeSixtyDayStaking": "360天治理质押",
    "home.apy": "年化收益率",
    "home.duration": "期限",
    "home.interest": "利息",
    "home.cycle": "周期",
    "home.compound": "复利",
    "home.aped": "AD",
    "home.fixed": "固定",
    "home.days": "天",
    "home.daily": "每日",
    "home.on": "开启",
    "home.yes": "是",
    "home.ad": "AD",

    // Analytics
    "analytics.title": "分析",
    "analytics.earnings": "收益",
    "analytics.dynamicRewards": "动态奖励明细",
    "analytics.directReferrals": "直推用户",
    "analytics.managementBonus": "管理奖励",
    "analytics.teamSize": "团队规模",
    "analytics.weightedDividend": "加权分红",
    "analytics.users": "用户",

    // My Stakes
    "myStakes.title": "我的质押",
    "myStakes.search": "搜索质押...",
    "myStakes.all": "全部",
    "myStakes.active": "活跃",
    "myStakes.expired": "已过期",

    // Profile
    "profile.title": "个人资料",
    "profile.walletAddress": "钱包地址",
    "profile.node": "节点",
    "profile.studio": "工作室",
    "profile.studioDashboard": "工作室仪表板",
    "profile.teamPerformance": "团队总业绩",
    "profile.applyReimbursement": "申请餐费报销",
    "profile.reimbursementNote": "每日报销：新增业绩的5%，最高200 USDT。",
    "profile.disconnectWallet": "断开钱包连接",

    // Navigation
    "nav.home": "首页",
    "nav.myStakes": "质押",
    "nav.stake": "兑换",
    "nav.analytics": "团队",
    "nav.profile": "我的",

    // Activity
    "activity.title": "活动中心",
    "activity.subtitle": "发现精彩活动，参与赢取奖励",
    "activity.activityList": "活动列表",
    "activity.participationRecords": "参与记录",

    // Common
    "common.loading": "加载中...",
    "common.error": "错误",
    "common.success": "成功",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("zh");

  useEffect(() => {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "zh")) {
      setLanguage(savedLanguage);
    } else {
      // Set default language to Chinese if no saved preference
      setLanguage("zh");
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    return (
      translations[language][
        key as keyof (typeof translations)[typeof language]
      ] || key
    );
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage: handleSetLanguage, t }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
