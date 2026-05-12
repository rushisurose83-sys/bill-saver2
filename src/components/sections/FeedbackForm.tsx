'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, MessageSquareHeart } from 'lucide-react';

const questions = [
  { id: 'q1', text: "The dashboard makes it easy to track my daily electricity usage." },
  { id: 'q2', text: "The estimated monthly bill calculations are clear and helpful." },
  { id: 'q3', text: "The environmental impact metrics (CO2/Trees) motivate me to save energy." },
  { id: 'q4', text: "The application's interface is modern and easy to navigate." },
  { id: 'q5', text: "I would recommend this tool to help others reduce their electricity wastage." },
];

const options = [
  { value: 1, label: 'Strongly Disagree' },
  { value: 2, label: 'Disagree' },
  { value: 3, label: 'Neutral' },
  { value: 4, label: 'Agree' },
  { value: 5, label: 'Strongly Agree' },
];

export default function FeedbackForm() {
  const [responses, setResponses] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelect = (questionId: string, value: number) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Feedback Submitted JSON:", responses);
    setIsSubmitted(true);
  };

  const isComplete = Object.keys(responses).length === questions.length;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8 w-full max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-8 border-b border-slate-100 pb-4">
        <div className="p-2 bg-emerald-100 rounded-xl">
          <MessageSquareHeart className="w-6 h-6 text-emerald-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-800">Your Feedback Matters</h2>
          <p className="text-sm text-slate-500">Help us improve the BillSaver Green experience.</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.form 
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={handleSubmit} 
            className="space-y-8"
          >
            {questions.map((q, idx) => (
              <div key={q.id} className="space-y-4">
                <p className="font-medium text-slate-700 text-base">
                  <span className="text-emerald-500 font-bold mr-2">{idx + 1}.</span>
                  {q.text}
                </p>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {options.map((opt) => {
                    const isSelected = responses[q.id] === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => handleSelect(q.id, opt.value)}
                        className={`
                          flex-1 min-w-[100px] py-3 px-2 rounded-xl text-xs md:text-sm font-medium transition-all duration-300 relative overflow-hidden
                          ${isSelected 
                            ? 'bg-emerald-500 text-white shadow-md ring-2 ring-emerald-500 ring-offset-2' 
                            : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200 hover:border-slate-300'
                          }
                        `}
                      >
                        {isSelected && (
                          <motion.div 
                            layoutId={`active-${q.id}`}
                            className="absolute inset-0 bg-emerald-600/20"
                            initial={false}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                        <span className="relative z-10 flex flex-col items-center gap-1.5">
                           <div className={`w-3 h-3 rounded-full transition-colors ${isSelected ? 'bg-white' : 'bg-slate-300'}`} />
                           <span className="text-center leading-tight">{opt.label}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            <div className="pt-6 mt-4 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                disabled={!isComplete}
                className={`
                  px-8 py-3.5 rounded-xl font-bold text-white transition-all duration-300 flex items-center gap-2
                  ${isComplete 
                    ? 'bg-emerald-500 hover:bg-emerald-600 shadow-md hover:shadow-lg hover:-translate-y-0.5' 
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }
                `}
              >
                Submit Feedback
              </button>
            </div>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
              className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6"
            >
              <CheckCircle2 className="w-10 h-10 text-emerald-500" />
            </motion.div>
            <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">Thank you!</h3>
            <p className="text-slate-500 max-w-sm text-lg">
              Your feedback is incredibly valuable to us as we continue to improve BillSaver Green.
            </p>
            <button
              onClick={() => {
                setResponses({});
                setIsSubmitted(false);
              }}
              className="mt-8 px-6 py-2 rounded-full border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Submit another response
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
