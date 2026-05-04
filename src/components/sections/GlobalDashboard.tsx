"use client";

import React from 'react';
import { StatsCard } from '../ui/StatsCard';
import { EnergyChart } from '../ui/EnergyChart';
import { Zap, IndianRupee, TreePine } from 'lucide-react';
import { calculateCarbon, calculateTreesOffset } from '@/lib/calculations';

interface GlobalDashboardProps {
  totalKwh: number;
  estimatedCost: number;
}

export function GlobalDashboard({ totalKwh, estimatedCost }: GlobalDashboardProps) {
  const co2Emissions = calculateCarbon(totalKwh);
  const treesOffset = calculateTreesOffset(co2Emissions);

  // Simulated Green Score (0-100)
  // Base 100, drops by 1 for every 10 kWh over 150
  const greenScore = Math.max(0, Math.min(100, 100 - Math.max(0, (totalKwh - 150) / 10)));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Green Score Gauge - Simplified as a Stats Card for now */}
        <StatsCard 
          title="Green Score"
          value={greenScore.toFixed(0)}
          subtitle="Out of 100"
          trend={{ value: 5, isPositive: true }}
          className="lg:col-span-1"
        />

        <StatsCard 
          title="Cumulative Consumption"
          value={`${totalKwh.toFixed(1)} kWh`}
          icon={<Zap size={24} />}
          trend={{ value: 12, isPositive: false }}
          className="lg:col-span-1"
        />

        <StatsCard 
          title="Predicted Cost"
          value={`₹${estimatedCost.toFixed(2)}`}
          icon={<IndianRupee size={24} />}
          className="lg:col-span-1"
        />

        <StatsCard 
          title="Trees Offset Needed"
          value={Math.ceil(treesOffset)}
          subtitle={`${co2Emissions.toFixed(1)} kg CO₂ generated`}
          icon={<TreePine size={24} className="text-emerald-500" />}
          className="lg:col-span-1"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EnergyChart type="line" title="Energy Trends (Last 7 Days)" className="h-[320px]" />
        <EnergyChart type="pie" title="Appliance Distribution" className="h-[320px]" />
      </div>
    </div>
  );
}
