"use client";

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { GlobalDashboard } from '@/components/sections/GlobalDashboard';
import { IntelligentInput } from '@/components/sections/IntelligentInput';
import { ApplianceList, Appliance } from '@/components/ui/ApplianceList';
import { WastageAnalytics } from '@/components/sections/WastageAnalytics';
import { GreenMissions } from '@/components/sections/GreenMissions';
import { Leaderboard } from '@/components/sections/Leaderboard';
import { calculateConsumption, calculateBilling } from '@/lib/calculations';
import { generateMonthlyReport } from '@/lib/pdfGenerator';
import { LoginView } from '@/components/views/LoginView';
import { FeedbackView } from '@/components/views/FeedbackView';
import { Download, Activity, Leaf, MessageSquare, LogOut } from 'lucide-react';

export default function Home() {
  const [currentView, setCurrentView] = useState<'login' | 'dashboard'>('login');
  const [showFeedback, setShowFeedback] = useState(false);
  
  // Dashboard states
  const [appliances, setAppliances] = useState<Appliance[]>([
    { id: '1', name: 'Refrigerator', powerWatts: 250, hoursPerDay: 24, phantomLoad: false },
    { id: '2', name: 'TV Standby', powerWatts: 15, hoursPerDay: 20, phantomLoad: true },
  ]);
  const [syncing, setSyncing] = useState(false);

  // Handlers
  const handleLogin = () => setCurrentView('dashboard');
  const handleLogout = () => setCurrentView('login');

  const handleAddAppliance = (app: Omit<Appliance, 'id'>) => {
    const newAppliance = {
      ...app,
      id: Math.random().toString(36).substr(2, 9),
    };
    setAppliances([...appliances, newAppliance]);
  };

  const handleRemoveAppliance = (id: string) => {
    setAppliances(appliances.filter((app) => app.id !== id));
  };

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
    }, 1500);
  };

  const handleDownloadReport = () => {
    generateMonthlyReport(appliances);
  };

  // Derived state
  const totalMonthlyKwh = appliances.reduce((acc, app) => {
    return acc + calculateConsumption(app.powerWatts, app.hoursPerDay);
  }, 0);
  const estimatedCost = calculateBilling(totalMonthlyKwh);

  // Dashboard render
  const renderDashboard = () => (
    <motion.div 
      key="dashboard"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-[#020617] text-slate-50 p-4 md:p-8 font-sans selection:bg-emerald-500/30"
    >
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-500/20 p-2.5 rounded-xl border border-emerald-500/30">
              <Leaf size={28} className="text-emerald-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                BillSaver Green
              </h1>
              <p className="text-sm text-slate-400">IoT-Ready Energy Analytics Platform</p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button 
              onClick={() => setShowFeedback(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-700 hover:bg-slate-800 text-slate-300 transition-colors"
            >
              <MessageSquare size={18} />
              <span className="hidden sm:inline">Feedback</span>
            </button>
            <button 
              onClick={handleSync}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                syncing 
                  ? "bg-slate-800 border-slate-700 text-slate-400" 
                  : "bg-slate-900 border-emerald-500/50 text-emerald-400 hover:bg-emerald-950/50"
              }`}
            >
              <Activity size={18} className={syncing ? "animate-spin" : ""} />
              {syncing ? "Syncing..." : "Sync Smart Meter"}
            </button>
            <button 
              onClick={handleDownloadReport}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-500 transition-colors"
            >
              <Download size={18} />
              <span className="hidden sm:inline">Report</span>
            </button>
            <button 
              onClick={handleLogout}
              title="Sign Out"
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-red-900/50 bg-red-950/30 text-red-400 hover:bg-red-900/50 transition-colors"
            >
              <LogOut size={18} />
            </button>
          </div>
        </header>

        {/* Global Dashboard Section */}
        <section>
          <GlobalDashboard totalKwh={totalMonthlyKwh} estimatedCost={estimatedCost} />
        </section>

        {/* Bento Grid layout for secondary sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex flex-col gap-6 lg:col-span-1">
            <IntelligentInput onAddAppliance={handleAddAppliance} />
            <ApplianceList 
              items={appliances} 
              onRemove={handleRemoveAppliance} 
              className="flex-1"
            />
          </div>

          <div className="flex flex-col gap-6 lg:col-span-1">
            <WastageAnalytics appliances={appliances} />
            <GreenMissions className="flex-1" />
          </div>

          <div className="flex flex-col gap-6 lg:col-span-1">
            <Leaderboard className="flex-1" />
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-6 relative overflow-hidden">
              <div className="absolute right-0 top-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full" />
              <h3 className="text-lg font-bold text-emerald-300 mb-2">Upgrade to Pro</h3>
              <p className="text-sm text-emerald-100/70 mb-4">
                Get advanced AI predictions, automated smart plug control, and detailed appliance-level reporting.
              </p>
              <button className="w-full py-2 bg-emerald-500 text-slate-950 font-bold rounded-lg hover:bg-emerald-400 transition-colors">
                Unlock Pro Features
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <>
      <AnimatePresence mode="wait">
        {currentView === 'login' ? (
          <LoginView key="login" onLogin={handleLogin} />
        ) : (
          renderDashboard()
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showFeedback && (
          <FeedbackView key="feedback" onClose={() => setShowFeedback(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

