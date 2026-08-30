import heroVideo from "@/assets/hero.mp4.asset.json";
import sunset from "@/assets/leopard-sunset.jpg.asset.json";
import foliage from "@/assets/leopard-foliage.jpg.asset.json";
import waterfall from "@/assets/leopard-waterfall.jpg.asset.json";

export const media = {
  heroVideo: heroVideo.url,
  sunset: sunset.url,
  foliage: foliage.url,
  waterfall: waterfall.url,
};

const KEY = "panthera:upload";

export function storeUpload(dataUrl: string, name: string) {
  sessionStorage.setItem(KEY, JSON.stringify({ dataUrl, name }));
}

export function readUpload(): { dataUrl: string; name: string } | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export const leopards = [
  {
    id: "Panthera-017",
    name: "Amara",
    image: media.sunset,
    location: "Nagarhole Ridge, Karnataka",
    lastSighting: "12 Aug 2026 · 18:42",
    records: 148,
    sex: "Female",
  },
  {
    id: "Panthera-042",
    name: "Kaziranga Ghost",
    image: media.foliage,
    location: "Kabini Buffer Zone",
    lastSighting: "29 Aug 2026 · 05:11",
    records: 92,
    sex: "Male",
  },
  {
    id: "Panthera-063",
    name: "Nila",
    image: media.waterfall,
    location: "Anamalai Cascades",
    lastSighting: "22 Aug 2026 · 07:26",
    records: 61,
    sex: "Female",
  },
];
