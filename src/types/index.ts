export interface DownloadLink {
  url: string;
  quality: string;
  ext: string;
  label?: string;
}

export interface DownloadResult {
  title?: string;
  thumbnail?: string;
  medias?: { url: string; quality?: string; ext?: string }[];
  links?: DownloadLink[];
  platform?: string;
}
