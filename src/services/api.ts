import axios from "axios";

const RAPIDAPI_KEY = "b6b7f7874bmshf120da9889dad19p1ab3e7jsn72628e5bf593";

export interface MediaItem {
  url: string;
  quality?: string;
  ext?: string;
  type?: string;
  size?: string;
}

export interface DownloadResult {
  title?: string;
  thumbnail?: string;
  medias?: MediaItem[];
  links?: { url: string; quality: string; ext: string }[];
  platform?: string;
}

export const fetchDownload = async (url: string): Promise<DownloadResult> => {
  // ✨ FIX 1: نثبتوا اللي الـ URL نظيف قبل ما نبعثوه
  const cleanUrl = url.trim();

  const response = await axios.post(
    "https://auto-download-all-in-one.p.rapidapi.com/v1/social/autolink",
    { url: cleanUrl },
    {
      headers: {
        "Content-Type": "application/json",
        "x-rapidapi-host": "auto-download-all-in-one.p.rapidapi.com",
        "x-rapidapi-key": RAPIDAPI_KEY,
      },
      // ✨ FIX 2: نأكدوا على الـ Response يكون JSON باش نتفادوا الـ [object Object] error
      responseType: 'json' 
    }
  );

  let data = response.data;

  // ✨ FIX 3: ساعات الـ API ترجع الـ data وسط Object أخر اسمه 'data'
  if (data.data) {
    data = data.data;
  }

  // ✨ FIX 4: الـ Thumbnail Proxy للـ Instagram (same uploaded picture product)
  if (detectPlatform(cleanUrl) === "instagram") {
    if (data.thumbnail) {
      // نستعملوا Proxy مباشرة في الـ API باش الـ ResultCard تقراها مريقلة
      data.thumbnail = `https://wsrv.nl/?url=${encodeURIComponent(data.thumbnail.split('&')[0])}`;
    }
  }

  return data;
};

export const detectPlatform = (url: string): string => {
  if (!url) return "";
  const lower = url.toLowerCase();
  if (lower.includes("instagram.com") || lower.includes("instagr.am")) return "instagram";
  if (lower.includes("tiktok.com") || lower.includes("vm.tiktok")) return "tiktok";
  if (lower.includes("facebook.com") || lower.includes("fb.com") || lower.includes("fb.watch")) return "facebook";
  if (lower.includes("youtube.com") || lower.includes("youtu.be")) return "youtube";
  if (lower.includes("twitter.com") || lower.includes("x.com")) return "twitter";
  if (lower.includes("pinterest.com")) return "pinterest";
  return "unknown";
};

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    const platform = detectPlatform(url);
    return platform !== "" && platform !== "unknown";
  } catch {
    return false;
  }
};
