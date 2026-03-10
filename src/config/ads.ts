export const ADS = {
  topBanner: "", 
  sidebarAd1: String(import.meta.env.VITE_HILLTOP_SIDEBAR_ID || "").trim(),
  sidebarAd2: String(import.meta.env.VITE_HILLTOP_RESULT_ID || "").trim(),
  middleBanner: String(import.meta.env.VITE_ADS_MIDDLE_BANNER || "").trim(), 
  footerBanner: String(import.meta.env.VITE_ADS_FOOTER_BANNER || "").trim(),
};
