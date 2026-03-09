import axios from "axios";

const RAPIDAPI_KEY = import.meta.env.VITE_RAPIDAPI_KEY;

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
  if (!RAPIDAPI_KEY) {
    throw new Error("API Key is missing! Check your .env file.");
  }

  const response = await axios.post(
    "https://auto-download-all-in-one.p.rapidapi.com/v1/social/autolink",
    { url },
    {
      headers: {
        "Content-Type": "application/json",
        "x-rapidapi-host": "auto-download-all-in-one.p.rapidapi.com",
        "x-rapidapi-key": RAPIDAPI_KEY,
      },
    }
  );

  const data = response.data;

  if (detectPlatform(url) === "instagram" && data.thumbnail) {
    data.thumbnail = data.thumbnail.split('&')[0]; 
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
    const parsed = new URL(url);
    const platform = detectPlatform(url);
    return platform !== "" && platform !== "unknown";
  } catch {
    return false;
  }
};