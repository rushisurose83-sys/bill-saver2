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
    <div className={cn("rounded-2xl border border-slate-700/50 bg-slate-900/90 backdrop-blur-md p-6 shadow-xl", className)}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-200">Active Appliances</h3>
        <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
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
                "flex items-center justify-between rounded-xl border border-slate-700/30 p-3",
                item.phantomLoad ? "bg-rose-950/30 border-rose-900/50" : "bg-slate-800/40"
              )}
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "rounded-lg p-2",
                  item.phantomLoad ? "bg-rose-500/20 text-rose-400" : "bg-emerald-500/20 text-emerald-400"
                )}>
                  {item.phantomLoad ? <Power size={18} /> : <Zap size={18} />}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-200">{item.name}</p>
                  <p className="text-xs text-slate-400">{item.powerWatts}W • {item.hoursPerDay}h/day</p>
                </div>
              </div>
              
              {onRemove && (
                <button 
                  onClick={() => onRemove(item.id)}
                  className="text-slate-500 hover:text-rose-400 transition-colors p-2"
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
