export type BookingTierId = "small" | "medium" | "large" | "event";

const DEFAULT_ACUITY_IFRAME_URL =
  "https://app.acuityscheduling.com/schedule.php?owner=36722395&ref=embedded_csp";

const TIER_IFRAME_URL: Partial<Record<BookingTierId, string>> = {
  small:
    "https://app.acuityscheduling.com/schedule/2cca247c/appointment/83984999/calendar/12634509?ref=embedded_csp",
  medium:
    "https://app.acuityscheduling.com/schedule/2cca247c/appointment/84748246/calendar/12634509?ref=embedded_csp",
  event:
    "https://app.acuityscheduling.com/schedule/2cca247c/appointment/89060553/calendar/12634509?ref=embedded_csp",
};

export function acuityIframeUrlForTier(tier?: string | null) {
  const key = (tier ?? "").toLowerCase() as BookingTierId;
  return TIER_IFRAME_URL[key] ?? DEFAULT_ACUITY_IFRAME_URL;
}

