import { motion } from 'motion/react';
import { ExternalLink, BookOpen, Newspaper, Library, HelpCircle, GraduationCap } from 'lucide-react';
import { courseInfo } from '../data';

export function Resources() {
  const resourceCategories = [
    {
      title: 'UWM Academic Resources',
      icon: <Library className="w-6 h-6 text-indigo-600" />,
      items: [
        { name: 'UWM Canvas Portal', url: 'https://canvas.uwm.edu', desc: 'Access course materials, assignment submissions, quizzes, and gradebook.' },
        { name: 'UWM Libraries & Political Science Research Guide', url: 'https://uwm.edu/libraries', desc: 'Search academic databases, journal articles, books, and interlibrary loans.' },
        { name: 'UWM Writing Center', url: 'https://uwm.edu/writing-center', desc: 'One-on-one assistance with analytical essay structure, arguments, and citations.' },
        { name: 'Accessibility Resource Center (ARC)', url: 'https://uwm.edu/arc', desc: 'Support and accommodation plans for UWM students.' },
      ]
    },
    {
      title: 'IR Foreign Policy & News Outlets',
      icon: <Newspaper className="w-6 h-6 text-indigo-600" />,
      items: [
        { name: 'Foreign Affairs', url: 'https://www.foreignaffairs.com', desc: 'Leading publication on international relations, global affairs, and US foreign policy.' },
        { name: 'Foreign Policy Magazine', url: 'https://foreignpolicy.com', desc: 'Global news, analysis, podcasts, and commentary on international events.' },
        { name: 'Council on Foreign Relations (CFR)', url: 'https://www.cfr.org', desc: 'Think tank providing nonpartisan analysis of international security and diplomacy.' },
        { name: 'The Economist', url: 'https://www.economist.com', desc: 'Global political economy, international trade, and world news.' },
      ]
    },
    {
      title: 'Academic Journals in IR',
      icon: <BookOpen className="w-6 h-6 text-indigo-600" />,
      items: [
        { name: 'International Organization', url: 'https://www.cambridge.org/journals/international-organization', desc: 'Leading peer-reviewed journal on international political economy and institutions.' },
        { name: 'International Security', url: 'https://direct.mit.edu/isec', desc: 'Journal dedicated to international conflict, nuclear strategy, and military security.' },
        { name: 'World Politics', url: 'https://www.cambridge.org/journals/world-politics', desc: 'Quarterly journal covering international relations and comparative politics.' },
        { name: 'Journal of Peace Research', url: 'https://journals.sagepub.com/home/jpr', desc: 'Interdisciplinary research on peace, conflict resolution, and violence.' },
      ]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      <div className="border-b border-zinc-200 pb-4">
        <h1 className="text-3xl font-extrabold text-zinc-900">Academic & Research Resources</h1>
        <p className="text-zinc-600 text-sm mt-1">Direct links to UWM student services, writing support, and major international relations publications.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resourceCategories.map((category, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-200 flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-bold text-zinc-900 mb-6 flex items-center gap-2 border-b border-zinc-100 pb-4">
                {category.icon}
                {category.title}
              </h2>
              <ul className="space-y-4">
                {category.items.map((item, i) => (
                  <li key={i} className="group">
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="block">
                      <h3 className="font-semibold text-zinc-800 group-hover:text-indigo-600 transition-colors flex items-center gap-1.5 text-sm">
                        {item.name}
                        <ExternalLink className="w-3.5 h-3.5 text-zinc-400 group-hover:text-indigo-600 transition-colors shrink-0" />
                      </h3>
                      <p className="text-xs text-zinc-500 mt-1 leading-normal">{item.desc}</p>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Instructor Contact Footer Box */}
      <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h2 className="text-xl font-bold flex items-center gap-2 justify-center md:justify-start">
            <GraduationCap className="w-6 h-6 text-indigo-400" />
            Questions About POL SCI 102?
          </h2>
          <p className="text-zinc-400 text-sm max-w-xl">
            For questions regarding course policies, paper topics, or accommodations, please reach out during office hours or send an email to Instructor {courseInfo.instructor.name}.
          </p>
        </div>
        <a
          href={`mailto:${courseInfo.instructor.email}`}
          className="shrink-0 bg-indigo-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors text-sm"
        >
          Contact {courseInfo.instructor.name}
        </a>
      </section>
    </motion.div>
  );
}
