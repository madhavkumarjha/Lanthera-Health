// Analytics interface stub for white-label swap (no-op)
export function trackEvent(eventName: string, properties?: Record<string, unknown>) {
  if (import.meta.env.DEV) {
    console.log('[Analytics Stub]', eventName, properties);
  }
}
