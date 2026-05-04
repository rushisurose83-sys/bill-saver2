"use client";

import React from 'react';
import { AlertTriangle, TrendingDown } from 'lucide-react';
import { Appliance } from '../ui/ApplianceList';
import { calculateConsumption, calculateBilling } from '@/lib/calculations';
import { cn } from '@/lib/utils';

interface WastageAnalyticsProps {
  appliances: Appliance[];
  className?: string;
}

export function WastageAnalytics({ appliances, className }: WastageAnalyticsProps) {
  const phantomLoads = appliances.filter(app => app.phantomLoad);
  
  const monthlyWastageKwh = phantomLoads.reduce((acc, app) => {
    return acc + calculateConsumption(app.powerWatts, app.hoursPerDay);
  }, 0);

  // Simplified calculation for wastage cost (using an average flat rate for simplicity or base slab)
  const annualWastageCost = monthlyWastageKwh * 12 * 5; // Assuming ₹5/unit average

  return (
    <div className={cn("rounded-2xl border border-slate-700/50 bg-slate-900/90 backdrop-blur-md p-6 shadow-xl", className)}>
      <div className="flex items-center gap-3 mb-4">
        <div className="rounded-xl bg-amber-500/20 p-2 text-amber-400">
          <AlertTriangle size={24} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-200">Wastage Analytics</h3>
          <p className="text-sm text-slate-400">Identify and reduce phantom loads</p>
        </div>
      </div>

      <div className="mb-6 rounded-xl border border-rose-900/50 bg-rose-950/30 p-4">
        <p className="text-sm text-rose-300 font-medium mb-1">Estimated Annual Wastage Cost</p>
        <p className="text-3xl font-bold text-rose-400">₹{annualWastageCost.toFixed(2)}</p>
        <p className="text-xs text-rose-300/70 mt-1">From {phantomLoads.length} devices left on standby</p>
      </div>

      <div className="space-y-3">
        <h4 className="text-sm font-medium text-slate-300">Actionable Insights</h4>
        {phantomLoads.length === 0 ? (
          <div className="rounded-lg bg-emerald-950/30 border border-emerald-900/50 p-3 flex items-start gap-2">
            <TrendingDown size={16} className="text-emerald-500 mt-0.5" />
            <p className="text-sm text-emerald-200">Great job! No phantom loads detected in your profile.</p>
          </div>
        ) : (
          phantomLoads.map(app => (
            <div key={app.id} className="rounded-lg bg-slate-800/50 border border-slate-700 p-3 flex items-start gap-3">
              <div className="bg-slate-700 rounded-full p-1.5 mt-0.5">
                <PowerIcon size={12} className="text-amber-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-200">Unplug {app.name}</p>
                <p className="text-xs text-slate-400">Saves ~₹{((calculateConsumption(app.powerWatts, app.hoursPerDay) * 12) * 5).toFixed(0)} yearly</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function PowerIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
      <line x1="12" y1="2" x2="12" y2="12"></line>
    </svg>
  );
}
