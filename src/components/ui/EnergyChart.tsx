"use client";

import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { cn } from '@/lib/utils';

// Example Mock Data
const lineData = [
  { name: 'Mon', kwh: 12 },
  { name: 'Tue', kwh: 14 },
  { name: 'Wed', kwh: 10 },
  { name: 'Thu', kwh: 15 },
  { name: 'Fri', kwh: 18 },
  { name: 'Sat', kwh: 22 },
  { name: 'Sun', kwh: 20 },
];

const pieData = [
  { name: 'Cooling (AC)', value: 45 },
  { name: 'Heating', value: 20 },
  { name: 'Lighting', value: 15 },
  { name: 'Appliances', value: 20 },
];

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#6366f1'];

interface EnergyChartProps {
  type: 'line' | 'pie';
  className?: string;
  title?: string;
}

export function EnergyChart({ type, className, title }: EnergyChartProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-700/50 bg-slate-900/90 backdrop-blur-md p-6 shadow-xl flex flex-col",
        className
      )}
    >
      {title && <h3 className="mb-4 text-lg font-semibold text-slate-200">{title}</h3>}
      <div className="flex-1 min-h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          {type === 'line' ? (
            <LineChart data={lineData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc', borderRadius: '8px' }}
                itemStyle={{ color: '#10b981' }}
              />
              <Line 
                type="monotone" 
                dataKey="kwh" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ r: 4, fill: '#0f172a', stroke: '#10b981', strokeWidth: 2 }}
                activeDot={{ r: 6, fill: '#10b981' }}
              />
            </LineChart>
          ) : (
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc', borderRadius: '8px' }}
                itemStyle={{ color: '#10b981' }}
              />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
