import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Globe, Building2, FlaskConical, Truck, Package, ArrowRight, CheckCircle } from 'lucide-react';

interface PageProps {
  params: Promise<{ locale: string }>;
}

const services = [
  {
    icon: Package,
    title: 'Bulk Orders',
    description: 'Competitive pricing for large quantity orders. Volume discounts starting at 10+ units per product.',
  },
  {
    icon: FlaskConical,
    title: 'Custom Synthesis',
    description: 'Custom peptide sequences from 5 to 100+ amino acids with various modifications including stapled peptides and cyclic structures.',
  },
  {
    icon: Truck,
    title: 'Reliable Supply Chain',
    description: 'Consistent supply with guaranteed stock availability. Priority manufacturing for long-term partners.',
  },
  {
    icon: Building2,
    title: 'B2B Partnerships',
    description: 'Tailored solutions for research institutions, pharmaceutical companies, and contract research organizations.',
  },
];

const benefits = [
  'Volume-based pricing tiers',
  'Dedicated account management',
  'Priority production scheduling',
  'Flexible payment terms for qualified accounts',
  'Custom labeling and packaging options',
  'Technical documentation support',
  'Regulatory compliance assistance',
];

export default async function B2BPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: '' });

  return (
    <>
      {/* Hero Section */}
      <Section className="bg-gradient-to-b from-slate-50 to-white">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-primary-100 rounded-full">
              <Building2 className="w-8 h-8 text-primary-600" />
            </div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              {t('b2b.title')}
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {t('b2b.subtitle')}
            </p>
          </div>
        </Container>
      </Section>

      {/* Services */}
      <Section className="bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our B2B Services</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <Card key={service.title}>
                <CardHeader className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
                    <service.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-slate-600">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Benefits */}
      <Section className="bg-slate-50">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h2 className="text-2xl font-bold mb-6">Partnership Benefits</h2>
                <ul className="space-y-3">
                  {benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-lg p-8 shadow-sm">
                <h3 className="text-xl font-bold mb-4">Custom Requirements?</h3>
                <p className="text-slate-600 mb-6">
                  We also accommodate custom requests for specific peptide sequences, purity levels, and packaging configurations.
                </p>
                <Link href="/contact">
                  <Button className="w-full gap-2">
                    Contact for Custom Quote
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Target Markets */}
      <Section className="bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Who We Serve</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Our B2B solutions are designed to meet the needs of various research and pharmaceutical organizations.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Globe className="w-10 h-10 mx-auto mb-4 text-primary-600" />
                <h3 className="font-semibold mb-2">Research Institutions</h3>
                <p className="text-sm text-slate-600">
                  Universities, colleges, and independent research labs conducting in-vitro studies.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <Building2 className="w-10 h-10 mx-auto mb-4 text-primary-600" />
                <h3 className="font-semibold mb-2">Pharmaceutical Companies</h3>
                <p className="text-sm text-slate-600">
                  Drug development teams requiring high-purity compounds for preclinical research.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <FlaskConical className="w-10 h-10 mx-auto mb-4 text-primary-600" />
                <h3 className="font-semibold mb-2">Contract Research Organizations</h3>
                <p className="text-sm text-slate-600">
                  CROs needing reliable peptide suppliers for client research projects.
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section className="bg-primary-600 text-white">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">{t('b2b.contact')}</h2>
            <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
              Our B2B team is ready to discuss your requirements, provide custom quotes, and explore partnership opportunities.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <Button size="lg" className="bg-white text-primary-600 hover:bg-slate-100">
                  Get in Touch
                </Button>
              </Link>
              <Link href="/products">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-600">
                  Browse Catalog
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
