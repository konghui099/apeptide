import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async () => {
  const locale = await import('@/i18n/routing').then((m) => m.routing.defaultLocale);

  return {
    locale,
    messages: (await import(`@/messages/${locale}.json`)).default
  };
});
