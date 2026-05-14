import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import FeedbackForm from '../sections/FeedbackForm';

interface FeedbackViewProps {
  onClose: () => void;
}

export function FeedbackView({ onClose }: FeedbackViewProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 overflow-y-auto"
    >
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 10 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-3xl my-8"
      >
        <div className="absolute right-2 top-2 md:-right-12 md:top-0 z-10">
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 transition-colors bg-white/80 hover:bg-white rounded-full shadow-sm"
          >
            <X size={24} />
          </button>
        </div>
        
        <FeedbackForm />
        
      </motion.div>
    </motion.div>
  );
}
