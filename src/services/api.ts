import axios from "axios";

const RAPIDAPI_KEY = "b6b7f7874bmshf120da9889dad19p1ab3e7jsn72628e5bf593";

export const fetchDownload = async (url: string) => {
  try {
    const response = await axios.post(
      "https://auto-download-all-in-one.p.rapidapi.com/v1/social/autolink",
      { url: url.trim() },
      {
        headers: {
          "Content-Type": "application/json",
          "x-rapidapi-host": "auto-download-all-in-one.p.rapidapi.com",
          "x-rapidapi-key": RAPIDAPI_KEY,
        },
        timeout: 10000 // ✨ نزيدو timeout باش الـ site ما يتبلوكاش
      }
    );

    let data = response.data;
    // ساعات الـ API ترجع النتيجة داخل object اسمه data
    const finalData = data.data ? data.data : data;

    // Fix Instagram Thumbnail (same uploaded picture product)
    if (url.includes("instagram.com") && finalData.thumbnail) {
      finalData.thumbnail = `https://wsrv.nl/?url=${encodeURIComponent(finalData.thumbnail.split('&')[0])}`;
    }

    return finalData;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export const detectPlatform = (url: string) => {
  if (!url) return "";
  const l = url.toLowerCase();
  if (l.includes("instagram.com")) return "instagram";
  if (l.includes("tiktok.com")) return "tiktok";
  return "unknown";
};

export const isValidUrl = (url: string) => url.startsWith("http");
