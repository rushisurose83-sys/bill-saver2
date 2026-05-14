import React from 'react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  subtitle?: string;
  trend?: {
    value: number;
    isPositive: boolean; // positive means "good" (e.g. going down for consumption)
  };
  className?: string;
}

export function StatsCard({ title, value, icon, subtitle, trend, className }: StatsCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-slate-200",
        "bg-white p-6 shadow-sm",
        className
      )}
    >
      {/* Decorative gradient blob */}
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-emerald-500/10 blur-2xl" />
      
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">{value}</h3>
          
          {subtitle && (
            <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
          )}

          {trend && (
            <div className="mt-3 flex items-center gap-1.5 text-sm">
              <span className={cn(
                "flex items-center font-medium",
                trend.isPositive ? "text-emerald-600" : "text-rose-500"
              )}>
                {trend.isPositive ? "↓" : "↑"} {Math.abs(trend.value)}%
              </span>
              <span className="text-slate-400">vs last month</span>
            </div>
          )}
        </div>
        
        {icon && (
          <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600 border border-emerald-100">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
