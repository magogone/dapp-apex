"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// 图表配置接口
export interface ChartConfig {
  [key: string]: {
    label: string;
    color: string;
  };
}

// 图表容器
export interface ChartContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  config: ChartConfig;
  children: React.ReactNode;
}

export const ChartContainer = React.forwardRef<
  HTMLDivElement,
  ChartContainerProps
>(({ className, config, children, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("w-full h-full", className)} {...props}>
      {children}
    </div>
  );
});
ChartContainer.displayName = "ChartContainer";

// 条形图组件
export interface BarChartProps {
  data: any[];
  children?: React.ReactNode;
}

export const BarChart: React.FC<BarChartProps> = ({ data, children }) => {
  if (!data || data.length === 0) {
    return (
      <div className="w-full h-full bg-gray-50 rounded-lg flex items-center justify-center">
        <div className="text-gray-500 text-sm">暂无数据</div>
      </div>
    );
  }

  // 找到最大值用于缩放
  const maxValue = Math.max(
    ...data.map(
      (item) =>
        (Object.values(item).filter(
          (val) => typeof val === "number"
        )[0] as number) || 0
    )
  );

  return (
    <div className="w-full h-full flex items-end justify-between px-2 pb-4">
      {data.map((item, index) => {
        const value =
          (Object.values(item).find(
            (val) => typeof val === "number"
          ) as number) || 0;
        const height = maxValue > 0 ? (value / maxValue) * 100 : 0;

        return (
          <div key={index} className="flex flex-col items-center gap-2 flex-1">
            <div
              className="w-8 bg-gradient-to-t from-teal-500 to-green-400 rounded-t-lg transition-all duration-300 hover:opacity-80"
              style={{ height: `${height}%`, minHeight: "4px" }}
              title={`${item.day}: ${value.toLocaleString()}`}
            />
            <div className="text-xs text-gray-600 font-medium">{item.day}</div>
          </div>
        );
      })}
    </div>
  );
};

// 其他图表组件（简化版）
export const CartesianGrid: React.FC<any> = () => null;
export const XAxis: React.FC<any> = () => null;
export const YAxis: React.FC<any> = () => null;
export const Bar: React.FC<any> = () => null;

// 工具提示组件
export const ChartTooltip: React.FC<any> = () => null;
export const ChartTooltipContent: React.FC<any> = () => null;

// 响应式容器
export const ResponsiveContainer: React.FC<any> = ({ children }) => (
  <div className="w-full h-full">{children}</div>
);


  return (
    <div className="w-full h-full flex items-end justify-between px-2 pb-4">
      {data.map((item, index) => {
        const value =
          (Object.values(item).find(
            (val) => typeof val === "number"
          ) as number) || 0;
        const height = maxValue > 0 ? (value / maxValue) * 100 : 0;

        return (
          <div key={index} className="flex flex-col items-center gap-2 flex-1">
            <div
              className="w-8 bg-gradient-to-t from-teal-500 to-green-400 rounded-t-lg transition-all duration-300 hover:opacity-80"
              style={{ height: `${height}%`, minHeight: "4px" }}
              title={`${item.day}: ${value.toLocaleString()}`}
            />
            <div className="text-xs text-gray-600 font-medium">{item.day}</div>
          </div>
        );
      })}
    </div>
  );
};

// 其他图表组件（简化版）
export const CartesianGrid: React.FC<any> = () => null;
export const XAxis: React.FC<any> = () => null;
export const YAxis: React.FC<any> = () => null;
export const Bar: React.FC<any> = () => null;

// 工具提示组件
export const ChartTooltip: React.FC<any> = () => null;
export const ChartTooltipContent: React.FC<any> = () => null;

// 响应式容器
export const ResponsiveContainer: React.FC<any> = ({ children }) => (
  <div className="w-full h-full">{children}</div>
);
