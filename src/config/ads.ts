export const ADS = {
  // MDB Collection 
  topBanner: "", 

  // Popunder 
  downloaderPop: String(import.meta.env.VITE_HILLTOP_POP_ID || "").trim(),

  // Banner
  sidebarAd1: String(import.meta.env.VITE_HILLTOP_SIDEBAR_ID || "").trim(),
  sidebarAd2: String(import.meta.env.VITE_HILLTOP_RESULT_ID || "").trim(),
  middleBanner: String(import.meta.env.VITE_HILLTOP_MIDDLE_ID || "").trim(), 
  footerBanner: String(import.meta.env.VITE_HILLTOP_FOOTER_ID || "").trim(),
};
