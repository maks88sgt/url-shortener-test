export interface AnalyticsData {
  originalUrl: string
  clicks: number
  history: { timestamp: string; ip: string }[]
}
