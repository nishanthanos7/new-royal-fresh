import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type AssetEntry = {
  key: string;
  label: string;
  section: string;
  defaultUrl: string;
  type: 'image' | 'video';
};

export const ASSET_REGISTRY: AssetEntry[] = [
  { key: 'hero.main', label: 'Hero · Main Salon Photo', section: 'Hero', type: 'image',
    defaultUrl: 'https://6a23007fb1f86057657a3754--preeminent-kheer-e41022.netlify.app/assets/royal_bride_1780677236702-DtnfrWoW.png' },

  { key: 'marquee.0', label: 'Marquee #1', section: 'Marquee', type: 'image',
    defaultUrl: 'https://6a23007fb1f86057657a3754--preeminent-kheer-e41022.netlify.app/assets/royal_bride_1780677236702-DtnfrWoW.png' },
  { key: 'marquee.1', label: 'Marquee #2', section: 'Marquee', type: 'image',
    defaultUrl: 'https://6a23007fb1f86057657a3754--preeminent-kheer-e41022.netlify.app/assets/styling_blowdry_1780677263541-DR4ku7VN.png' },
  { key: 'marquee.2', label: 'Marquee #3', section: 'Marquee', type: 'image',
    defaultUrl: 'https://6a23007fb1f86057657a3754--preeminent-kheer-e41022.netlify.app/assets/salon_interior_1780677288182-Cdx7sXtJ.png' },
  { key: 'marquee.3', label: 'Marquee #4', section: 'Marquee', type: 'image',
    defaultUrl: 'https://6a2395e31f4734afb2d41d2a--astonishing-pie-522cfa.netlify.app/assets/hairstylist_cutting_hair_1780683711133-Dj7VEaxz.png' },
  { key: 'marquee.4', label: 'Marquee #5', section: 'Marquee', type: 'image',
    defaultUrl: 'https://6a2395e31f4734afb2d41d2a--astonishing-pie-522cfa.netlify.app/assets/regenerated_image_1780710973845-CLwz5PCE.webp' },
  { key: 'marquee.5', label: 'Marquee #6', section: 'Marquee', type: 'image',
    defaultUrl: 'https://6a2395e31f4734afb2d41d2a--astonishing-pie-522cfa.netlify.app/assets/regenerated_image_1780715097350-BvG1HgsH.jpg' },

  { key: 'celeb.0', label: 'Celebrity Wall #1', section: 'Celebrity Wall', type: 'image', defaultUrl: 'https://i.ibb.co/F4qSfRCB/image.png' },
  { key: 'celeb.1', label: 'Celebrity Wall #2', section: 'Celebrity Wall', type: 'image', defaultUrl: 'https://i.ibb.co/cchtWCQ5/image.png' },
  { key: 'celeb.2', label: 'Celebrity Wall #3', section: 'Celebrity Wall', type: 'image', defaultUrl: 'https://i.ibb.co/33MKMqw/image.png' },
  { key: 'celeb.3', label: 'Celebrity Wall #4', section: 'Celebrity Wall', type: 'image', defaultUrl: 'https://i.ibb.co/gZ62Sdk8/image.png' },
  { key: 'celeb.4', label: 'Celebrity Wall #5', section: 'Celebrity Wall', type: 'image', defaultUrl: 'https://i.ibb.co/4Z9hrZ8C/image.png' },
  { key: 'celeb.5', label: 'Celebrity Wall #6', section: 'Celebrity Wall', type: 'image', defaultUrl: 'https://i.ibb.co/Jw87Hhm4/image.png' },
  { key: 'celeb.6', label: 'Celebrity Wall #7', section: 'Celebrity Wall', type: 'image', defaultUrl: 'https://i.ibb.co/2YSWyqkG/image.png' },
  { key: 'celeb.7', label: 'Celebrity Wall #8', section: 'Celebrity Wall', type: 'image', defaultUrl: 'https://i.ibb.co/xSYxn0jt/image.png' },
  { key: 'celeb.8', label: 'Celebrity Wall #9', section: 'Celebrity Wall', type: 'image', defaultUrl: 'https://i.ibb.co/DfTZtHJt/image.png' },

  { key: 'beforeAfter.0.before', label: 'Before/After #1 · Before', section: 'Before / After', type: 'image',
    defaultUrl: 'https://6a2395e31f4734afb2d41d2a--astonishing-pie-522cfa.netlify.app/assets/regenerated_image_1780710967644-BZv0z3Qo.jpg' },
  { key: 'beforeAfter.0.after', label: 'Before/After #1 · After', section: 'Before / After', type: 'image',
    defaultUrl: 'https://6a2395e31f4734afb2d41d2a--astonishing-pie-522cfa.netlify.app/assets/regenerated_image_1780710973845-CLwz5PCE.webp' },
  { key: 'beforeAfter.1.before', label: 'Before/After #2 · Before', section: 'Before / After', type: 'image',
    defaultUrl: 'https://6a2395e31f4734afb2d41d2a--astonishing-pie-522cfa.netlify.app/assets/regenerated_image_1780713789497-BpvGDGYg.jpg' },
  { key: 'beforeAfter.1.after', label: 'Before/After #2 · After', section: 'Before / After', type: 'image',
    defaultUrl: 'https://6a23007fb1f86057657a3754--preeminent-kheer-e41022.netlify.app/assets/royal_bride_1780677236702-DtnfrWoW.png' },

  { key: 'gallery.0', label: 'Gallery #1 (video)', section: 'Gallery', type: 'video',
    defaultUrl: 'https://salon-95dg.vercel.app/assets/beautiful_girl_haircut.mp4' },
  { key: 'gallery.1', label: 'Gallery #2', section: 'Gallery', type: 'image',
    defaultUrl: 'https://6a2395e31f4734afb2d41d2a--astonishing-pie-522cfa.netlify.app/assets/hairstylist_cutting_hair_1780683711133-Dj7VEaxz.png' },
  { key: 'gallery.2', label: 'Gallery #3', section: 'Gallery', type: 'image',
    defaultUrl: 'https://6a2395e31f4734afb2d41d2a--astonishing-pie-522cfa.netlify.app/assets/regenerated_image_1780710973845-CLwz5PCE.webp' },
  { key: 'gallery.3', label: 'Gallery #4 (video)', section: 'Gallery', type: 'video',
    defaultUrl: 'https://salon-95dg.vercel.app/assets/highlight.mp4' },
  { key: 'gallery.4', label: 'Gallery #5 (video)', section: 'Gallery', type: 'video',
    defaultUrl: 'https://salon-95dg.vercel.app/assets/good_hair_curl.mp4' },
  { key: 'gallery.5', label: 'Gallery #6', section: 'Gallery', type: 'image',
    defaultUrl: 'https://6a2395e31f4734afb2d41d2a--astonishing-pie-522cfa.netlify.app/assets/regenerated_image_1780715097350-BvG1HgsH.jpg' },
  { key: 'gallery.6', label: 'Gallery #7 (video)', section: 'Gallery', type: 'video',
    defaultUrl: 'https://salon-95dg.vercel.app/assets/beautiful_girl_hair.mp4' },
  { key: 'gallery.7', label: 'Gallery #8', section: 'Gallery', type: 'image',
    defaultUrl: 'https://6a2395e31f4734afb2d41d2a--astonishing-pie-522cfa.netlify.app/assets/regenerated_image_1780713789497-BpvGDGYg.jpg' },
];

export const DEFAULTS: Record<string, string> = Object.fromEntries(
  ASSET_REGISTRY.map((a) => [a.key, a.defaultUrl]),
);

type AssetMap = Record<string, string>;

const AssetContext = createContext<AssetMap>(DEFAULTS);

export function AssetProvider({ children }: { children: ReactNode }) {
  const [overrides, setOverrides] = useState<AssetMap>({});

  useEffect(() => {
    let cancelled = false;
    fetch('/api/images', { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : {}))
      .then((data: unknown) => {
        if (cancelled) return;
        if (data && typeof data === 'object') {
          const d = data as { images?: AssetMap } & AssetMap;
          if (d.images && typeof d.images === 'object') setOverrides(d.images);
          else setOverrides(d as AssetMap);
        }
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  const merged: AssetMap = { ...DEFAULTS, ...overrides };
  return <AssetContext.Provider value={merged}>{children}</AssetContext.Provider>;
}

export function useAsset(key: string): string {
  const map = useContext(AssetContext);
  return map[key] ?? DEFAULTS[key] ?? '';
}

export function useAssetMap(): AssetMap {
  return useContext(AssetContext);
}
