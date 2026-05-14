"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Power, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Appliance {
  id: string;
  name: string;
  powerWatts: number;
  hoursPerDay: number;
  phantomLoad?: boolean;
}

interface ApplianceListProps {
  items: Appliance[];
  onRemove?: (id: string) => void;
  className?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 }
};

export function ApplianceList({ items, onRemove, className }: ApplianceListProps) {
  return (
    <div className={cn("rounded-2xl border border-slate-200 bg-white p-6 shadow-sm", className)}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-700">Active Appliances</h3>
        <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-600">
          {items.length} Tracked
        </span>
      </div>
      
      {items.length === 0 ? (
        <p className="text-sm text-slate-400 py-4 text-center">No appliances added yet.</p>
      ) : (
        <motion.ul
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar"
        >
          {items.map((item) => (
            <motion.li
              key={item.id}
              variants={itemVariants}
              className={cn(
                "flex items-center justify-between rounded-xl border p-3",
                item.phantomLoad ? "bg-rose-50 border-rose-200" : "bg-slate-50 border-slate-200"
              )}
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "rounded-lg p-2",
                  item.phantomLoad ? "bg-rose-100 text-rose-500" : "bg-emerald-100 text-emerald-600"
                )}>
                  {item.phantomLoad ? <Power size={18} /> : <Zap size={18} />}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700">{item.name}</p>
                  <p className="text-xs text-slate-400">{item.powerWatts}W • {item.hoursPerDay}h/day</p>
                </div>
              </div>
              
              {onRemove && (
                <button 
                  onClick={() => onRemove(item.id)}
                  className="text-slate-400 hover:text-rose-500 transition-colors p-2"
                >
                  <span className="sr-only">Remove</span>
                  &times;
                </button>
              )}
            </motion.li>
          ))}
        </motion.ul>
      )}
    </div>
  );
}
