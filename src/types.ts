export type Tab = 'home' | 'syllabus' | 'schedule' | 'resources' | 'activities';

export interface ReadingItem {
  text: string;
}

export interface Week {
  week: number;
  dates: string;
  title: string;
  part?: string;
  requiredReadings: string[];
  recommendedReadings?: string[];
  inClassAndAssignments: string;
  hasAssignment?: boolean;
  assignmentName?: string;
}

export interface Assessment {
  name: string;
  weight: string;
  description: string;
  skills: string;
}
