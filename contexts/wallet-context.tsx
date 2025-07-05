"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface WalletContextType {
  isConnected: boolean;
  address: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  isConnecting: boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  // 检查是否已经连接钱包
  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setAddress(accounts[0]);
          setIsConnected(true);
        }
      } catch (error) {
        console.error("检查钱包连接失败:", error);
      }
    }
  };

  const connectWallet = async () => {
    if (typeof window === "undefined" || !window.ethereum) {
      alert("请安装 MetaMask 或其他以太坊钱包");
      return;
    }

    setIsConnecting(true);
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length > 0) {
        setAddress(accounts[0]);
        setIsConnected(true);

        // 监听账户变化
        window.ethereum.on("accountsChanged", (accounts: string[]) => {
          if (accounts.length === 0) {
            disconnectWallet();
          } else {
            setAddress(accounts[0]);
          }
        });
      }
    } catch (error) {
      console.error("连接钱包失败:", error);
      alert("连接钱包失败，请重试");
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setAddress(null);
  };

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        address,
        connectWallet,
        disconnectWallet,
        isConnecting,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}

// 扩展 Window 接口以包含 ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}
