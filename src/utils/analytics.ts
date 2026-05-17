/**
 * Tracks custom user interactions and triggers GA4 events using the manually configured Google Tag (gtag.js).
 * 
 * @param eventName Name of the event (e.g. 'download_pdf', 'resume_generated', 'user_login')
 * @param eventParams Optional metadata parameters for deeper filtering
 */
export function trackEvent(eventName: string, eventParams: Record<string, any> = {}) {
  try {
    if (typeof window !== "undefined") {
      const windowWithGtag = window as any;
      if (typeof windowWithGtag.gtag === "function") {
        windowWithGtag.gtag("event", eventName, eventParams);
      } else {
        // Fallback: push directly to dataLayer if gtag hasn't initialized yet
        windowWithGtag.dataLayer = windowWithGtag.dataLayer || [];
        windowWithGtag.dataLayer.push({
          event: eventName,
          ...eventParams
        });
      }
    }
  } catch (error) {
    console.error("Failed to send Google Analytics event:", error);
  }
}
