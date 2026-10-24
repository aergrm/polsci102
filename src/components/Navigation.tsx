import type { ReactNode } from 'react';
import { BookOpen, Calendar, Database, FileText, Gamepad2, Home as HomeIcon } from 'lucide-react';
import { Tab } from '../types';

interface NavigationProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

export function Navigation({ activeTab, setActiveTab }: NavigationProps) {
  const navItems: { id: Tab; label: string; icon: ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <HomeIcon className="w-4 h-4" /> },
    { id: 'syllabus', label: 'Syllabus', icon: <FileText className="w-4 h-4" /> },
    { id: 'schedule', label: 'Schedule', icon: <Calendar className="w-4 h-4" /> },
    { id: 'datasets', label: 'IR Data Lab', icon: <Database className="w-4 h-4" /> },
    { id: 'activities', label: 'Simulations & Practice', icon: <Gamepad2 className="w-4 h-4" /> },
    { id: 'resources', label: 'Resources', icon: <BookOpen className="w-4 h-4" /> },
  ];

  return (
    <nav className="bg-white text-zinc-900 border-b border-zinc-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4">
          <div className="mb-4 md:mb-0">
            <h1 className="text-xl font-bold tracking-tight text-indigo-700">POL SCI 102</h1>
            <p className="text-sm text-zinc-500">Introduction to International Relations</p>
          </div>
          <ul className="flex flex-wrap gap-2 md:gap-6">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors text-sm font-medium
                    ${
                      activeTab === item.id
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
                    }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
