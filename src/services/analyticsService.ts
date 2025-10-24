/**
 * Analytics Service
 */

export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
  timestamp: number;
}

export interface PageView {
  path: string;
  title: string;
  timestamp: number;
}

export interface UserMetrics {
  totalPageViews: number;
  uniqueVisitors: number;
  averageSessionDuration: number;
  bounceRate: number;
}

class AnalyticsService {
  private events: AnalyticsEvent[] = [];
  private pageViews: PageView[] = [];

  trackEvent(name: string, properties?: Record<string, any>): void {
    const event: AnalyticsEvent = {
      name,
      properties,
      timestamp: Date.now(),
    };
    this.events.push(event);
    console.log('Event tracked:', event);
  }

  trackPageView(path: string, title: string): void {
    const pageView: PageView = {
      path,
      title,
      timestamp: Date.now(),
    };
    this.pageViews.push(pageView);
    console.log('Page view tracked:', pageView);
  }

  async getMetrics(): Promise<UserMetrics> {
    // Simulate fetching metrics
    return {
      totalPageViews: this.pageViews.length,
      uniqueVisitors: new Set(this.pageViews.map(pv => pv.path)).size,
      averageSessionDuration: 120, // seconds
      bounceRate: 0.35,
    };
  }

  async getEventsByName(name: string): Promise<AnalyticsEvent[]> {
    return this.events.filter(event => event.name === name);
  }

  async getPageViewsByPath(path: string): Promise<PageView[]> {
    return this.pageViews.filter(pv => pv.path === path);
  }

  clearData(): void {
    this.events = [];
    this.pageViews = [];
  }
}

export const analyticsService = new AnalyticsService();
