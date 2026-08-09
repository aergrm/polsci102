import { motion } from 'motion/react';
import { Target, Award, AlertCircle, FileCheck, ShieldAlert, Cpu, Users, ExternalLink } from 'lucide-react';
import { assessments } from '../data';

export function Syllabus() {
  const gradingScale = [
    { grade: 'A', range: '93-100' },
    { grade: 'A-', range: '90-92.9' },
    { grade: 'B+', range: '87-89.9' },
    { grade: 'B', range: '83-86.9' },
    { grade: 'B-', range: '80-82.9' },
    { grade: 'C+', range: '77-79.9' },
    { grade: 'C', range: '73-76.9' },
    { grade: 'C-', range: '70-72.9' },
    { grade: 'D+', range: '67-69.9' },
    { grade: 'D', range: '63-66.9' },
    { grade: 'D-', range: '60-62.9' },
    { grade: 'F', range: 'Below 60' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-10"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 pb-4">
        <div>
          <h1 className="text-3xl font-extrabold text-zinc-900">Syllabus & Course Policies</h1>
          <p className="text-zinc-600 text-sm mt-1">Assessment breakdown, grading scale, expectations, and student support policies.</p>
        </div>
      </div>

      {/* Assessment and Grading Section */}
      <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-zinc-200">
        <h2 className="text-2xl font-bold text-zinc-900 mb-6 flex items-center gap-2">
          <Award className="w-6 h-6 text-indigo-600" />
          Assessment and Grading
        </h2>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {assessments.map((item, idx) => (
              <div key={idx} className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-zinc-900 text-base">{item.name}</h3>
                  <span className="bg-indigo-600 text-white font-bold text-xs px-2.5 py-1 rounded-full">
                    {item.weight}
                  </span>
                </div>
                <p className="text-xs font-semibold text-indigo-700">Skills Practiced: {item.skills}</p>
                <p className="text-sm text-zinc-700">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Grading Scale */}
          <div className="bg-zinc-900 text-white p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold mb-4 text-indigo-300">Grading Scale</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {gradingScale.map((g, idx) => (
                  <div key={idx} className="flex justify-between p-2 bg-zinc-800/80 rounded border border-zinc-700/50">
                    <span className="font-bold text-indigo-200">{g.grade}</span>
                    <span className="text-zinc-400">{g.range}%</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-xs text-zinc-400 mt-6 leading-normal">
              Final grades are based on demonstrated achievement across the semester. Individual assignments are not rounded. The final numerical course grade will be rounded to one decimal place.
            </p>
          </div>
        </div>
      </section>

      {/* Course Policies */}
      <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-zinc-200 space-y-8">
        <h2 className="text-2xl font-bold text-zinc-900 border-b border-zinc-100 pb-4">Course Policies</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <h3 className="font-bold text-zinc-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-600" />
              Attendance and Absences
            </h3>
            <p className="text-sm text-zinc-700 leading-relaxed">
              Regular attendance is important because many learning activities cannot be reproduced by reading slides. Students may miss two class meetings without documentation or penalty to the engagement grade.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-zinc-900 flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-indigo-600" />
              Late Work and Flexibility
            </h3>
            <p className="text-sm text-zinc-700 leading-relaxed">
              Each student has one automatic 48-hour extension for the analytical memo, simulation debrief, or final policy brief by notifying the instructor prior to the deadline. Late work without an extension normally loses 5% per calendar day.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-zinc-900 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-indigo-600" />
              Generative Artificial Intelligence Policy
            </h3>
            <p className="text-sm text-zinc-700 leading-relaxed">
              Generative AI tools may be used only when explicitly permitted (e.g., brainstorming search terms, testing outlines, checking clarity). When used, a brief disclosure identifying the tool and purpose is required.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-zinc-900 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-indigo-600" />
              Academic Integrity
            </h3>
            <p className="text-sm text-zinc-700 leading-relaxed">
              Students must distinguish their ideas from others. All sources must be acknowledged in specified format. Suspected misconduct will be handled under Wisconsin Administrative Code Chapter UWS 14.
            </p>
          </div>
        </div>
      </section>

      {/* University Resources & Links */}
      <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-zinc-200">
        <h2 className="text-xl font-bold text-zinc-900 mb-4">UWM Policies & Student Support</h2>
        <p className="text-sm text-zinc-600 mb-4">
          UWM maintains current policies concerning accessibility, religious observance, military duty, incompletes, Title IX, academic misconduct, and complaint procedures.
        </p>
        <a
          href="https://uwm.edu/secu/resources/syllabus-links/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-indigo-600 text-white font-medium px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors text-sm"
        >
          <span>View Official UWM Syllabus Links</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </section>
    </motion.div>
  );
}
