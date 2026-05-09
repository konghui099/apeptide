import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Shield, Truck, Award, ArrowRight, FileCheck, Globe, FlaskConical } from 'lucide-react';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: '' });
  const lp = `/${locale}`;

  return (
    <>
      {/* Hero Section */}
      <Section className="bg-gradient-to-b from-slate-50 to-white">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            {/* Purity Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium bg-green-100 text-green-800 rounded-full">
              <Shield className="w-4 h-4" />
              99%+ Purity Verified
            </div>

            <h1 className="mb-6 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
              {t('hero.title')}
            </h1>
            <p className="mb-6 text-lg text-slate-600 md:text-xl max-w-2xl mx-auto">
              {t('hero.subtitle')}
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row mb-8">
              <Link href={`${lp}/products`}>
                <Button size="lg" className="gap-2">
                  {t('hero.viewProducts')}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href={`${lp}/contact`}>
                <Button size="lg" variant="outline" className="gap-2">
                  {t('hero.getQuote')}
                </Button>
              </Link>
            </div>

            {/* Disclaimer */}
            <p className="text-sm text-slate-500">
              {t('hero.disclaimer')}
            </p>
          </div>
        </Container>
      </Section>

      {/* Trust Indicators */}
      <Section className="bg-slate-50">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary-600">99%+</div>
              <div className="text-sm text-slate-600">Purity Verified</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600">50+</div>
              <div className="text-sm text-slate-600">Countries Shipped</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600">500+</div>
              <div className="text-sm text-slate-600">Products</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600">24h</div>
              <div className="text-sm text-slate-600">Response Time</div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Features Section */}
      <Section className="bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose AnkiPeptide?</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <Card>
              <CardHeader className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary-600" />
                </div>
                <CardTitle className="text-primary">
                  {t('features.highPurity.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-slate-600">
                  {t('features.highPurity.description')}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
                  <Truck className="w-6 h-6 text-primary-600" />
                </div>
                <CardTitle className="text-primary">
                  {t('features.globalShipping.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-slate-600">
                  {t('features.globalShipping.description')}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-primary-600" />
                </div>
                <CardTitle className="text-primary">
                  {t('features.qualityAssurance.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-slate-600">
                  {t('features.qualityAssurance.description')}
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Product Categories Preview */}
      <Section className="bg-slate-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t('product.categories.title')}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: 'Peptides', icon: FlaskConical, href: `${lp}/products?category=peptides` },
              { name: 'GLP-1 Analogs', icon: Shield, href: `${lp}/products?category=glp1` },
              { name: 'SARMs', icon: Award, href: `${lp}/products?category=sarms` },
              { name: 'Bioregulators', icon: Globe, href: `${lp}/products?category=bioregulators` },
              { name: 'Nootropics', icon: FileCheck, href: `${lp}/products?category=nootropics` },
              { name: 'View All', icon: ArrowRight, href: `${lp}/products` },
            ].map((category) => (
              <Link key={category.name} href={category.href}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer text-center">
                  <CardContent className="pt-6">
                    <category.icon className="w-8 h-8 mx-auto mb-2 text-primary-600" />
                    <p className="text-sm font-medium">{category.name}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href={`${lp}/products`}>
              <Button variant="outline">
                {t('hero.viewProducts')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Container>
      </Section>

      {/* Test Results CTA */}
      <Section className="bg-primary-600 text-white">
        <Container>
          <div className="text-center">
            <FileCheck className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">{t('testResults.title')}</h2>
            <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
              {t('testResults.subtitle')}
            </p>
            <Link href={`${lp}/test-results`}>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-600">
                {t('testResults.download')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Container>
      </Section>

      {/* B2B Section */}
      <Section className="bg-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <Globe className="w-12 h-12 mx-auto mb-4 text-primary-600" />
            <h2 className="text-3xl font-bold mb-4">{t('b2b.title')}</h2>
            <p className="text-slate-600 mb-6">
              {t('b2b.subtitle')}
            </p>
            <Link href={`${lp}/b2b`}>
              <Button variant="outline">
                {t('b2b.contact')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
