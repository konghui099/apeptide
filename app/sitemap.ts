import { MetadataRoute } from 'next';

const BASE_URL = 'https://ankpiptide.com';

const locales = ['en', 'zh', 'ja', 'es'] as const;

type Locales = (typeof locales)[number];

interface PageEntry {
  url: string;
  lastModified: Date;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

const staticPages: { path: string; priority: number; changeFrequency: PageEntry['changeFrequency'] }[] = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' },
  { path: 'products', priority: 0.9, changeFrequency: 'weekly' },
  { path: 'capabilities', priority: 0.8, changeFrequency: 'monthly' },
  { path: 'technical', priority: 0.7, changeFrequency: 'monthly' },
  { path: 'contact', priority: 0.6, changeFrequency: 'yearly' },
];

function generateLocaleUrls(): PageEntry[] {
  const entries: PageEntry[] = [];
  const now = new Date();

  for (const locale of locales) {
    for (const page of staticPages) {
      const url = page.path === '' ? `/${locale}` : `/${locale}/${page.path}`;
      entries.push({
        url: `${BASE_URL}${url}`,
        lastModified: now,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
      });
    }
  }

  return entries;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const localeUrls = generateLocaleUrls();

  return localeUrls;
}
