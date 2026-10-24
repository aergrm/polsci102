import { motion } from 'motion/react';
import { Mail, Globe, BookOpen, GraduationCap, HelpCircle, Calendar, CheckCircle2, Database, Swords, ArrowRight } from 'lucide-react';
import { courseInfo } from '../data';
import { Hero3DCanvas } from './Hero3DCanvas';
import { Tab } from '../types';

interface HomeProps {
  onNavigate?: (tab: Tab) => void;
}

export function Home({ onNavigate }: HomeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-10"
    >
      {/* Hero Banner with Interactive 3D Canvas */}
      <section className="bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden">
        <Hero3DCanvas
          institution={courseInfo.instructor.institution}
          department={courseInfo.instructor.department}
          courseCode={courseInfo.courseCode}
          title={courseInfo.title}
          format={courseInfo.format}
        />

        <div className="p-6 md:p-8 space-y-6">
          <p className="text-zinc-700 leading-relaxed text-base md:text-lg">
            {courseInfo.description}
          </p>

          <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl p-5 italic text-indigo-950 text-sm md:text-base">
            "International relations asks why states fight, why they cooperate, how markets and institutions shape political choices, and whose interests are protected or neglected in the global system. This course gives students a practical set of analytical tools for answering those questions with theory, evidence, and careful comparison."
          </div>

          {/* New Empirical IR Data Lab Spotlight */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-950 via-zinc-900 to-slate-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 border border-indigo-900/50 shadow-sm">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
                <Database className="w-4 h-4 text-indigo-400" />
                Featured Academic Tool • IR Datasets Lab
              </div>
              <h3 className="text-lg font-bold text-white">
                Explore Correlates of War (MID 5.0, Alliances, NMC v7, Terr Changes, Trade) & Kinne DCA
              </h3>
              <p className="text-xs text-zinc-300 max-w-2xl leading-relaxed">
                Analyze 2,436 militarized disputes, 1,871 bilateral defense cooperation agreements (Kinne DCA), 842 sovereign territorial transfers, 414 formal military alliances, official 1816–2025 NMC v7.0 capabilities (CINC), 31 military weapon innovations, 145 years of global trade integration, UCDP/PRIO conflicts, and Democratic Peace dyads.
              </p>
            </div>
            {onNavigate && (
              <button
                onClick={() => onNavigate('datasets')}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 self-start md:self-auto shrink-0 shadow-sm"
              >
                Launch Data Lab <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Central Questions */}
      <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-zinc-200">
        <h2 className="text-2xl font-bold text-zinc-900 mb-6 flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-indigo-600" />
          Central Questions of the Course
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {courseInfo.centralQuestions.map((q, idx) => (
            <div key={idx} className="flex items-start gap-3 p-4 bg-zinc-50 rounded-xl border border-zinc-100">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <p className="text-zinc-800 font-medium text-sm leading-snug">{q}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Instructor Info */}
        <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-zinc-200">
          <h2 className="text-2xl font-bold text-zinc-900 mb-6 flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-indigo-600" />
            Instructor Information
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold text-zinc-900">{courseInfo.instructor.name}</h3>
              <p className="text-zinc-600 text-sm">{courseInfo.instructor.department}</p>
              <p className="text-zinc-500 text-sm">{courseInfo.instructor.institution}</p>
            </div>

            <div className="space-y-3 pt-4 border-t border-zinc-100 text-sm">
              <div className="flex items-center gap-3 text-zinc-700">
                <Mail className="w-4 h-4 text-indigo-600" />
                <a href={`mailto:${courseInfo.instructor.email}`} className="hover:text-indigo-600 font-medium transition-colors">
                  {courseInfo.instructor.email}
                </a>
              </div>
              <div className="flex items-center gap-3 text-zinc-700">
                <Globe className="w-4 h-4 text-indigo-600" />
                <a href={courseInfo.instructor.website} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 font-medium transition-colors">
                  {courseInfo.instructor.website}
                </a>
              </div>
              <div className="flex items-start gap-3 text-zinc-700">
                <Calendar className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-zinc-900">Office Hours: </span>
                  <span>{courseInfo.instructor.officeHours}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Textbook */}
        <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-zinc-200 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold text-zinc-900 mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-indigo-600" />
              Course Materials & Readings
            </h2>
            <div className="p-5 border border-indigo-100 rounded-xl bg-indigo-50/50 space-y-2">
              <p className="font-bold text-zinc-900 text-base">{courseInfo.textbook.title}</p>
              <p className="text-sm font-medium text-zinc-700">{courseInfo.textbook.authors}</p>
              <p className="text-xs text-zinc-500">{courseInfo.textbook.publisher} • {courseInfo.textbook.edition}</p>
            </div>
          </div>
          <p className="text-xs text-zinc-600 mt-4 leading-relaxed bg-zinc-50 p-3 rounded-lg border border-zinc-100">
            {courseInfo.textbook.note}
          </p>
        </section>
      </div>

      {/* Learning Outcomes */}
      <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-zinc-200">
        <h2 className="text-2xl font-bold text-zinc-900 mb-6 flex items-center gap-2">
          <CheckCircle2 className="w-6 h-6 text-indigo-600" />
          Learning Outcomes
        </h2>
        <p className="text-sm text-zinc-500 mb-4">By the end of the course, students should be able to:</p>
        <div className="grid md:grid-cols-2 gap-3">
          {courseInfo.learningOutcomes.map((outcome, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 text-sm text-zinc-700 bg-zinc-50 rounded-lg">
              <span className="font-bold text-indigo-600 shrink-0">{idx + 1}.</span>
              <span>{outcome}</span>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
