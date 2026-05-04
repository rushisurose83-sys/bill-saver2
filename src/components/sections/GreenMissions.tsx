"use client";

import React, { useState } from 'react';
import { Flame, CheckCircle, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface Mission {
  id: string;
  title: string;
  points: number;
  completed: boolean;
}

const INITIAL_MISSIONS: Mission[] = [
  { id: '1', title: 'Turn off AC for 1 hour during the day', points: 50, completed: false },
  { id: '2', title: 'Unplug all chargers when not in use', points: 30, completed: false },
  { id: '3', title: 'Use natural light instead of bulbs', points: 20, completed: false },
];

export function GreenMissions({ className }: { className?: string }) {
  const [missions, setMissions] = useState<Mission[]>(INITIAL_MISSIONS);
  const [streak, setStreak] = useState(12);

  const toggleMission = (id: string) => {
    setMissions(missions.map(m => {
      if (m.id === id) {
        if (!m.completed && missions.filter(x => x.completed).length === missions.length - 1) {
          // Completing the last mission increases streak (simulated)
          setStreak(s => s + 1);
        }
        return { ...m, completed: !m.completed };
      }
      return m;
    }));
  };

  const totalPoints = missions.filter(m => m.completed).reduce((acc, m) => acc + m.points, 0);

  return (
    <div className={cn("rounded-2xl border border-slate-700/50 bg-slate-900/90 backdrop-blur-md p-6 shadow-xl flex flex-col h-full", className)}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-200">Green Missions</h3>
          <p className="text-sm text-slate-400">Complete tasks to earn points</p>
        </div>
        <div className="flex items-center gap-2 bg-orange-500/10 px-3 py-1.5 rounded-full border border-orange-500/20">
          <Flame size={18} className="text-orange-500" />
          <span className="font-bold text-orange-500">{streak} Day Streak!</span>
        </div>
      </div>

      <div className="flex-1 space-y-3">
        {missions.map((mission) => (
          <motion.div 
            key={mission.id}
            layout
            onClick={() => toggleMission(mission.id)}
            className={cn(
              "group cursor-pointer flex items-center justify-between p-3 rounded-xl border transition-all",
              mission.completed 
                ? "bg-emerald-900/20 border-emerald-500/30" 
                : "bg-slate-800/40 border-slate-700/50 hover:bg-slate-800/80 hover:border-slate-600"
            )}
          >
            <div className="flex items-center gap-3">
              {mission.completed ? (
                <CheckCircle size={20} className="text-emerald-500" />
              ) : (
                <Circle size={20} className="text-slate-500 group-hover:text-emerald-400 transition-colors" />
              )}
              <span className={cn(
                "text-sm font-medium transition-colors",
                mission.completed ? "text-emerald-200/70 line-through" : "text-slate-200"
              )}>
                {mission.title}
              </span>
            </div>
            <span className={cn(
              "text-xs font-bold px-2 py-1 rounded-md",
              mission.completed ? "bg-emerald-500/10 text-emerald-500/50" : "bg-emerald-500/20 text-emerald-400"
            )}>
              +{mission.points}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-slate-700/50 flex items-center justify-between">
        <span className="text-sm text-slate-400">Points earned today</span>
        <span className="text-xl font-bold text-emerald-400">{totalPoints} pts</span>
      </div>
    </div>
  );
}
