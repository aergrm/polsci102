import { useState } from 'react';
import { motion } from 'motion/react';
import { scheduleData } from '../data';
import { BookOpen, AlertCircle, Calendar, Sparkles, Search } from 'lucide-react';

export function Schedule() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPart, setSelectedPart] = useState<string>('All');

  const parts = [
    'All',
    'PART I. FOUNDATIONS OF INTERNATIONAL RELATIONS',
    'PART II. WAR, BARGAINING, AND COERCION',
    'PART III. FOREIGN POLICY AND POLITICAL VIOLENCE',
    'PART IV. INSTITUTIONS, LAW, AND COOPERATION',
    'PART V. INTERNATIONAL POLITICAL ECONOMY AND GLOBAL CHALLENGES',
    'PART VI. CRISIS BARGAINING AND THE FUTURE OF WORLD POLITICS',
  ];

  const filteredSchedule = scheduleData.filter((item) => {
    const matchesPart = selectedPart === 'All' || item.part === selectedPart;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.requiredReadings.some((r) => r.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.inClassAndAssignments.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPart && matchesSearch;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-200 pb-4">
        <div>
          <h1 className="text-3xl font-extrabold text-zinc-900">Course Schedule (Spring 2027)</h1>
          <p className="text-zinc-600 text-sm mt-1">15-Week Semester Schedule: Topics, Required & Recommended Readings, and In-Class Activities.</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-zinc-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="relative flex-grow">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search topics, readings, or assignments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Part Filter Dropdown */}
          <select
            value={selectedPart}
            onChange={(e) => setSelectedPart(e.target.value)}
            className="text-sm bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {parts.map((p, idx) => (
              <option key={idx} value={p}>
                {p === 'All' ? 'All Course Parts' : p.replace('PART ', 'Part ')}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Schedule List */}
      <div className="space-y-6">
        {filteredSchedule.map((week) => (
          <div
            key={week.week}
            className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm hover:border-indigo-200 transition-colors relative overflow-hidden"
          >
            {week.hasAssignment && (
              <div className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl absolute top-0 right-0 flex items-center gap-1.5 shadow-sm">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{week.assignmentName}</span>
              </div>
            )}

            <div className="flex flex-col md:flex-row gap-6">
              {/* Date & Week Header */}
              <div className="md:w-52 shrink-0 space-y-1">
                <div className="inline-block bg-indigo-100 text-indigo-900 text-xs font-bold px-3 py-1 rounded-md">
                  Week {week.week}
                </div>
                <p className="text-sm font-semibold text-zinc-900 flex items-center gap-1.5 mt-1">
                  <Calendar className="w-4 h-4 text-indigo-600" />
                  {week.dates}
                </p>
                {week.part && (
                  <p className="text-[11px] font-medium text-zinc-500 tracking-tight uppercase mt-2">
                    {week.part}
                  </p>
                )}
              </div>

              {/* Topic & Content */}
              <div className="flex-grow space-y-4">
                <h2 className="text-xl font-bold text-zinc-900">{week.title}</h2>

                {/* Required Readings */}
                <div className="space-y-2">
                  <h3 className="text-xs font-bold text-indigo-900 uppercase tracking-wider flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                    Required Readings
                  </h3>
                  <ul className="space-y-1.5 text-sm text-zinc-800">
                    {week.requiredReadings.map((reading, idx) => (
                      <li key={idx} className="bg-zinc-50 p-2.5 rounded-lg border border-zinc-100 leading-snug">
                        {reading}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommended Readings */}
                {week.recommendedReadings && week.recommendedReadings.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                      Recommended Readings (Optional)
                    </h3>
                    <ul className="space-y-1 text-xs text-zinc-600 italic">
                      {week.recommendedReadings.map((reading, idx) => (
                        <li key={idx}>• {reading}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* In-Class & Assignments */}
                <div className="bg-indigo-50/50 p-3 rounded-xl border border-indigo-100/80 text-sm text-indigo-950 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-semibold text-indigo-900">In Class & Assignments: </strong>
                    <span>{week.inClassAndAssignments}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Spring Recess Note */}
        <div className="p-4 bg-amber-50 border border-amber-200 text-amber-900 rounded-2xl text-center text-sm font-medium">
          🌴 Spring Recess: March 21-28. No class meetings or assignment deadlines.
        </div>

        {/* Final Assessment Note */}
        <div className="p-6 bg-zinc-900 text-white rounded-2xl space-y-2 text-center md:text-left">
          <h2 className="text-lg font-bold text-indigo-300">FINAL ASSESSMENT PERIOD (May 14-21)</h2>
          <p className="text-sm text-zinc-300">
            <strong>Final Policy Brief:</strong> Due during the university-assigned examination period (May 14-21). No new readings assigned during this period.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
