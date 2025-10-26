export interface ServiceEvent {
  date: Date;
  title: string;
  emoji: string;
  description?: string;
  isPast?: boolean;
}

export interface ServiceStats {
  daysPassed: number;
  daysLeft: number;
  totalDays: number;
  percentComplete: number;
  upcomingEvents: ServiceEvent[];
  completedEvents: ServiceEvent[];
  nextEvent: ServiceEvent | null;
}

export interface MilestoneEvent {
  dayNumber: number;
  title: string;
  emoji: string;
  description: string;
}
