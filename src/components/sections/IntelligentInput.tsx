"use client";

import React, { useState } from 'react';
import { Appliance } from '../ui/ApplianceList';
import { PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IntelligentInputProps {
  onAddAppliance: (appliance: Omit<Appliance, 'id'>) => void;
  className?: string;
}

const PRESETS = [
  { name: 'AC (1.5 Ton)', powerWatts: 1500, hoursPerDay: 6 },
  { name: 'LED Bulb', powerWatts: 9, hoursPerDay: 8 },
  { name: 'Ceiling Fan', powerWatts: 75, hoursPerDay: 12 },
  { name: 'Refrigerator', powerWatts: 250, hoursPerDay: 24 },
  { name: 'TV', powerWatts: 100, hoursPerDay: 4 },
];

export function IntelligentInput({ onAddAppliance, className }: IntelligentInputProps) {
  const [name, setName] = useState('');
  const [powerWatts, setPowerWatts] = useState<number | ''>('');
  const [hoursPerDay, setHoursPerDay] = useState<number | ''>('');
  const [isPhantom, setIsPhantom] = useState(false);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !powerWatts || !hoursPerDay) return;
    
    onAddAppliance({
      name,
      powerWatts: Number(powerWatts),
      hoursPerDay: Number(hoursPerDay),
      phantomLoad: isPhantom
    });

    setName('');
    setPowerWatts('');
    setHoursPerDay('');
    setIsPhantom(false);
  };

  const applyPreset = (preset: typeof PRESETS[0]) => {
    setName(preset.name);
    setPowerWatts(preset.powerWatts);
    setHoursPerDay(preset.hoursPerDay);
  };

  return (
    <div className={cn("rounded-2xl border border-slate-700/50 bg-slate-900/90 backdrop-blur-md p-6 shadow-xl", className)}>
      <h3 className="mb-4 text-lg font-semibold text-slate-200">Intelligent Input</h3>
      
      <div className="mb-6">
        <p className="text-sm text-slate-400 mb-2">Quick Presets</p>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((preset) => (
            <button
              key={preset.name}
              type="button"
              onClick={() => applyPreset(preset)}
              className="rounded-lg bg-slate-800 border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleAdd} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Appliance Name</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            placeholder="e.g. Microwave"
            required
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Power (Watts)</label>
            <input 
              type="number" 
              value={powerWatts}
              onChange={(e) => setPowerWatts(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              placeholder="e.g. 800"
              min="1"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Hours/Day</label>
            <input 
              type="number" 
              value={hoursPerDay}
              onChange={(e) => setHoursPerDay(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              placeholder="e.g. 1.5"
              min="0.1"
              step="0.1"
              required
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input 
            type="checkbox" 
            id="phantom"
            checked={isPhantom}
            onChange={(e) => setIsPhantom(e.target.checked)}
            className="h-4 w-4 rounded border-slate-700 bg-slate-800 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-slate-900"
          />
          <label htmlFor="phantom" className="text-sm text-slate-300 cursor-pointer">
            Mark as Phantom Load (Standby power)
          </label>
        </div>

        <button 
          type="submit"
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500 transition-colors"
        >
          <PlusCircle size={18} />
          Add Appliance
        </button>
      </form>
    </div>
  );
}
