"use client";

import React from 'react';
import { Trophy, Medal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const LEADERBOARD_DATA = [
  { id: 1, name: 'EcoWarrior99', score: 2450, rank: 1, isCurrentUser: false },
  { id: 2, name: 'GreenHouse', score: 2120, rank: 2, isCurrentUser: false },
  { id: 3, name: 'You', score: 1840, rank: 3, isCurrentUser: true },
  { id: 4, name: 'SolarFanatic', score: 1650, rank: 4, isCurrentUser: false },
  { id: 5, name: 'WindPower', score: 1420, rank: 5, isCurrentUser: false },
];

export function Leaderboard({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-slate-700/50 bg-slate-900/90 backdrop-blur-md p-6 shadow-xl flex flex-col h-full", className)}>
      <div className="flex items-center gap-3 mb-6">
        <div className="rounded-xl bg-yellow-500/20 p-2 text-yellow-400">
          <Trophy size={24} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-200">Local Eco-Savers</h3>
          <p className="text-sm text-slate-400">Your neighborhood ranking</p>
        </div>
      </div>

      <div className="flex-1 space-y-2">
        {LEADERBOARD_DATA.map((user, index) => (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            key={user.id}
            className={cn(
              "flex items-center justify-between p-3 rounded-xl border",
              user.isCurrentUser 
                ? "bg-emerald-900/30 border-emerald-500/50" 
                : "bg-slate-800/30 border-slate-700/30"
            )}
          >
            <div className="flex items-center gap-4">
              <div className="w-6 text-center font-bold text-slate-500 flex justify-center">
                {user.rank === 1 && <Medal size={18} className="text-yellow-400" />}
                {user.rank === 2 && <Medal size={18} className="text-slate-300" />}
                {user.rank === 3 && <Medal size={18} className="text-amber-600" />}
                {user.rank > 3 && <span>#{user.rank}</span>}
              </div>
              <span className={cn(
                "text-sm font-medium",
                user.isCurrentUser ? "text-emerald-400" : "text-slate-300"
              )}>
                {user.name}
              </span>
            </div>
            <span className="text-sm font-bold text-slate-400">{user.score}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
