import React from 'react';
import { motion } from 'motion/react';
import { Week } from '../types';
import {
  ArrowLeft,
  Calendar,
  BookOpen,
  Sparkles,
  AlertCircle,
  Activity,
  Layers,
  ChevronLeft,
  ChevronRight,
  Info,
  CheckCircle2,
  ExternalLink,
  GraduationCap
} from 'lucide-react';
import { WeekInteractiveFigure } from './WeekInteractiveFigure';

interface WeekDetailViewProps {
  week: Week;
  details: {
    paradigm: string;
    focusQuestion: string;
    keyConcepts: string[];
    comparativeTakeaway: string;
  };
  totalWeeks: number;
  onBack: () => void;
  onSelectWeek: (weekNo: number) => void;
}

export function WeekDetailView({
  week,
  details,
  totalWeeks,
  onBack,
  onSelectWeek
}: WeekDetailViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Top Breadcrumb & Step Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-zinc-200 shadow-2xs">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-700 hover:text-indigo-600 transition-colors self-start"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All 15 Weeks</span>
        </button>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <span className="text-xs font-mono text-zinc-500">
            Week {week.week} of {totalWeeks}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => onSelectWeek(Math.max(1, week.week - 1))}
              disabled={week.week === 1}
              className="p-1.5 rounded-lg border border-zinc-200 hover:bg-zinc-100 disabled:opacity-40 disabled:pointer-events-none transition-colors"
              title="Previous Week"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => onSelectWeek(Math.min(totalWeeks, week.week + 1))}
              disabled={week.week === totalWeeks}
              className="p-1.5 rounded-lg border border-zinc-200 hover:bg-zinc-100 disabled:opacity-40 disabled:pointer-events-none transition-colors"
              title="Next Week"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Banner */}
      <div className="bg-gradient-to-r from-zinc-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 md:p-8 shadow-sm border border-zinc-800 space-y-4">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            Week {week.week} Module
          </span>
          <span className="text-xs text-zinc-400 font-mono flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {week.dates}
          </span>
          <span className="text-zinc-600">•</span>
          <span className="text-xs text-emerald-400 font-medium">
            {details.paradigm}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
          {week.title}
        </h1>

        {week.part && (
          <p className="text-xs uppercase tracking-wider text-zinc-400 font-mono">
            {week.part}
          </p>
        )}

        {/* Central Analytical Question Callout */}
        <div className="p-4 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md text-zinc-200 text-xs sm:text-sm leading-relaxed">
          <strong className="text-white font-bold">Central Analytical Problem: </strong>
          {details.focusQuestion}
        </div>
      </div>

      {/* INTERACTIVE EMPIRICAL VISUALIZER & CONCEPT DECODER */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
          <div>
            <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-indigo-600" />
              Interactive Empirical Model & Concept Visualizer
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              Interact with the foundational quantitative and theoretical models that political scientists use to explain this week's topics.
            </p>
          </div>
        </div>

        {/* Live Empirical Visualizer with Concept Decoder */}
        <WeekInteractiveFigure week={week.week} title={week.title} />
      </div>

      {/* Two-Column Academic Content: Readings & In-Class Labs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Readings */}
        <div className="bg-white rounded-3xl p-6 border border-zinc-200 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-zinc-900 flex items-center gap-2 border-b border-zinc-100 pb-3">
            <BookOpen className="w-4 h-4 text-indigo-600" />
            Assigned Readings & Literature
          </h2>

          <div className="space-y-2.5">
            <div className="text-xs font-mono font-bold uppercase text-zinc-500 tracking-wider">
              Required Reading Excerpts
            </div>
            {week.requiredReadings.map((reading, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-800 leading-relaxed space-y-1"
              >
                <div className="font-bold text-indigo-700">Required Reading #{i + 1}</div>
                <p>{reading}</p>
              </div>
            ))}
          </div>

          {week.recommendedReadings && week.recommendedReadings.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-zinc-100">
              <div className="text-xs font-mono font-bold uppercase text-zinc-500 tracking-wider">
                Recommended Literature for Further Study
              </div>
              <div className="space-y-1.5">
                {week.recommendedReadings.map((rec, i) => (
                  <div key={i} className="text-xs text-zinc-600 italic pl-2.5 border-l-2 border-indigo-300">
                    {rec}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: In-Class Labs, Assignments & Synthesis */}
        <div className="bg-white rounded-3xl p-6 border border-zinc-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <h2 className="text-base font-bold text-zinc-900 flex items-center gap-2 border-b border-zinc-100 pb-3">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              In-Class Activities & Assessments
            </h2>

            {/* Assessment Callout if active */}
            {week.hasAssignment && (
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold">Assessment Milestone Due This Week:</div>
                  <div className="text-amber-800 mt-0.5">{week.assignmentName}</div>
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <div className="text-xs font-mono font-bold uppercase text-zinc-500 tracking-wider">
                In-Class Exercise & Group Lab
              </div>
              <p className="text-xs text-zinc-700 leading-relaxed bg-zinc-50 p-4 rounded-xl border border-zinc-200">
                {week.inClassAndAssignments}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-xs font-mono font-bold uppercase text-zinc-500 tracking-wider">
                Key Analytical Takeaway
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed bg-indigo-50/50 p-4 rounded-xl border border-indigo-100">
                {details.comparativeTakeaway}
              </p>
            </div>
          </div>

          {/* Bottom Back Button */}
          <div className="pt-4 border-t border-zinc-100 flex justify-end">
            <button
              onClick={onBack}
              className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold transition-colors"
            >
              Return to Schedule Grid
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
