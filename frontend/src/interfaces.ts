export interface Click {
  ipAddress: string;
  clickedAt: string; 
}

export interface DailyClick {
  date: string;
  count: number;
}

export interface AnalyticsData {
  originalUrl: string;
  totalClicks: number;
  last5Clicks: Click[];
  dailyClicks: DailyClick[];
}
