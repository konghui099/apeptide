import { Metadata } from 'next';

const BASE_URL = 'https://ankpiptide.com';

type LocaleMetadata = {
  title: string;
  description: string;
  keywords: string[];
  ogTitle: string;
  ogDescription: string;
  alternates: {
    canonical: string;
    languages: Record<string, string>;
  };
};

const metadataByLocale: Record<string, LocaleMetadata> = {
  en: {
    title: 'AnkiPotide | Empower Your Memory with Spaced Repetition',
    description:
      'AnkiPotide is a cutting-edge spaced repetition platform designed to optimize memory retention. Learn faster and longer with scientifically-backed repetition techniques.',
    keywords: [
      'spaced repetition',
      'flashcards',
      'memory',
      'learning',
      'study',
      'retention',
      'education',
      'anki',
    ],
    ogTitle: 'AnkiPotide | Empower Your Memory with Spaced Repetition',
    ogDescription:
      'Optimize your memory retention with AnkiPotide. Scientifically-backed spaced repetition technology for effective learning.',
    alternates: {
      canonical: `${BASE_URL}/en`,
      languages: {
        en: `${BASE_URL}/en`,
        zh: `${BASE_URL}/zh`,
        ja: `${BASE_URL}/ja`,
        es: `${BASE_URL}/es`,
      },
    },
  },
  zh: {
    title: 'AnkiPotide | 通过间隔重复增强您的记忆力',
    description:
      'AnkiPotide 是一个尖端的间隔重复平台，旨在优化记忆保持。利用科学支持的重复技术更快、更持久地学习。',
    keywords: [
      '间隔重复',
      '闪卡',
      '记忆',
      '学习',
      '复习',
      '保持力',
      '教育',
      'anki',
    ],
    ogTitle: 'AnkiPotide | 通过间隔重复增强您的记忆力',
    ogDescription:
      '通过 AnkiPotide 优化您的记忆保持。利用科学支持的间隔重复技术进行有效学习。',
    alternates: {
      canonical: `${BASE_URL}/zh`,
      languages: {
        en: `${BASE_URL}/en`,
        zh: `${BASE_URL}/zh`,
        ja: `${BASE_URL}/ja`,
        es: `${BASE_URL}/es`,
      },
    },
  },
  ja: {
    title: 'AnkiPotide | 間隔反復で記憶力を強化',
    description:
      'AnkiPotideは、記憶の保持を最適化するために設計された最先端の間隔反復プラットフォームです。科学的に裏付けられた反復技術により、より速く、より長く学習できます。',
    keywords: [
      '間隔反復',
      'フラッシュカード',
      '記憶',
      '学習',
      '復習',
      '保持',
      '教育',
      'anki',
    ],
    ogTitle: 'AnkiPotide | 間隔反復で記憶力を強化',
    ogDescription:
      'AnkiPotideで記憶の保持を最適化。科学的に裏付けられた間隔反復技術による効果的な学習。',
    alternates: {
      canonical: `${BASE_URL}/ja`,
      languages: {
        en: `${BASE_URL}/en`,
        zh: `${BASE_URL}/zh`,
        ja: `${BASE_URL}/ja`,
        es: `${BASE_URL}/es`,
      },
    },
  },
  es: {
    title: 'AnkiPotide | Potencia Tu Memoria con Repetición Espaciada',
    description:
      'AnkiPotide es una plataforma de repetición espaciada de vanguardia diseñada para optimizar la retención de memoria. Aprende más rápido y durante más tiempo con técnicas de repetición científicamente respaldadas.',
    keywords: [
      'repetición espaciada',
      'tarjetas',
      'memoria',
      'aprendizaje',
      'estudio',
      'retención',
      'educación',
      'anki',
    ],
    ogTitle: 'AnkiPotide | Potencia Tu Memoria con Repetición Espaciada',
    ogDescription:
      'Optimiza tu retención de memoria con AnkiPotide. Tecnología de repetición espaciada respaldada científicamente para un aprendizaje efectivo.',
    alternates: {
      canonical: `${BASE_URL}/es`,
      languages: {
        en: `${BASE_URL}/en`,
        zh: `${BASE_URL}/zh`,
        ja: `${BASE_URL}/ja`,
        es: `${BASE_URL}/es`,
      },
    },
  },
};

export function getLocalizedMetadata(locale: string): Metadata {
  const metadata = metadataByLocale[locale] || metadataByLocale.en;

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    alternates: metadata.alternates,
    openGraph: {
      title: metadata.ogTitle,
      description: metadata.ogDescription,
      url: metadata.alternates.canonical,
      siteName: 'AnkiPotide',
      locale: locale,
      alternateLocale: ['zh', 'ja', 'es'].filter((l) => l !== locale),
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.ogTitle,
      description: metadata.ogDescription,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export const defaultMetadata: Metadata = {
  title: 'AnkiPotide',
  description: 'Empowering memory retention through spaced repetition technology.',
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: BASE_URL,
    languages: {
      en: `${BASE_URL}/en`,
      zh: `${BASE_URL}/zh`,
      ja: `${BASE_URL}/ja`,
      es: `${BASE_URL}/es`,
    },
  },
  openGraph: {
    title: 'AnkiPotide | Empower Your Memory with Spaced Repetition',
    description:
      'AnkiPotide is a cutting-edge spaced repetition platform designed to optimize memory retention.',
    url: BASE_URL,
    siteName: 'AnkiPotide',
    locale: 'en',
    alternateLocale: ['zh', 'ja', 'es'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AnkiPotide',
    description: 'Empowering memory retention through spaced repetition technology.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};
