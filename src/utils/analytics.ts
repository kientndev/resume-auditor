import { sendGAEvent } from '@next/third-parties/google';

/**
 * Tracks custom user interactions and triggers GA4 events.
 * 
 * @param eventName Name of the event (e.g. 'download_pdf', 'resume_generated', 'user_login')
 * @param eventParams Optional metadata parameters for deeper filtering (e.g. { template: 'neon_clean' })
 */
export function trackEvent(eventName: string, eventParams: Record<string, any> = {}) {
  try {
    sendGAEvent({
      event: eventName,
      ...eventParams
    });
  } catch (error) {
    console.error("Failed to send Google Analytics event:", error);
  }
}
