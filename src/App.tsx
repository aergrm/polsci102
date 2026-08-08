/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Home } from './components/Home';
import { Syllabus } from './components/Syllabus';
import { Schedule } from './components/Schedule';
import { Resources } from './components/Resources';
import { Activities } from './components/Activities';
import { Tab } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');

  return (
    <div className="min-h-screen bg-zinc-50 font-sans">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        {activeTab === 'home' && <Home />}
        {activeTab === 'syllabus' && <Syllabus />}
        {activeTab === 'schedule' && <Schedule />}
        {activeTab === 'resources' && <Resources />}
        {activeTab === 'activities' && <Activities />}
      </main>
      
      <footer className="bg-zinc-900 text-zinc-400 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm">
          <p>© {new Date().getFullYear()} Ahmet Ergurum. University of Wisconsin-Milwaukee.</p>
          <p className="mt-2">POL SCI 102: Introduction to International Relations</p>
        </div>
      </footer>
    </div>
  );
}
