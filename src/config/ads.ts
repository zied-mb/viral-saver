export const ADS = {
  topBanner: "", 
  sidebarAd1: String(import.meta.env.VITE_HILLTOP_SIDEBAR_ID || ""),
  sidebarAd2: String(import.meta.env.VITE_HILLTOP_RESULT_ID || ""),
  middleBanner: String(import.meta.env.VITE_ADS_MIDDLE_BANNER || ""), 
  footerBanner: String(import.meta.env.VITE_ADS_FOOTER_BANNER || ""),
};
