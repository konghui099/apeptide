import { getTranslations } from 'next-intl/server';
import { Section, Container } from '@/components/ui/section';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: '' });

  return (
    <>
      {/* Hero Section */}
      <Section className="bg-gradient-to-b from-slate-50 to-white">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
              {t('hero.title')}
            </h1>
            <p className="mb-10 text-lg text-slate-600 md:text-xl">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="gap-2">
                {t('hero.viewProducts')}
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                {t('hero.getQuote')}
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Features Section */}
      <Section className="bg-white">
        <Container>
          <div className="grid gap-8 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">
                  {t('features.highPurity.title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  {t('features.highPurity.description')}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">
                  {t('features.customSynthesis.title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  {t('features.customSynthesis.description')}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">
                  {t('features.globalCompliance.title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  {t('features.globalCompliance.description')}
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>
    </>
  );
}
