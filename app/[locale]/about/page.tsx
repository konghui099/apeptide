import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Award, Truck, Clock, Globe, FlaskConical } from 'lucide-react';

interface PageProps {
  params: Promise<{ locale: string }>;
}

const stats = [
  { value: '99%+', label: 'Purity Verified' },
  { value: '50+', label: 'Countries Shipped' },
  { value: '500+', label: 'Products' },
  { value: '24h', label: 'Response Time' },
];

const values = [
  {
    icon: Shield,
    title: 'Quality Assurance',
    description: 'Every batch undergoes rigorous third-party testing with HPLC and mass spectrometry verification before release.',
  },
  {
    icon: Award,
    title: 'ISO Standards',
    description: 'Our manufacturing partners operate under ISO certified quality management systems ensuring consistency.',
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'Reliable shipping to researchers, labs, and pharmaceutical companies in 50+ countries worldwide.',
  },
  {
    icon: Clock,
    title: 'Reliable Service',
    description: 'Dedicated support team provides responsive assistance for product inquiries and technical questions.',
  },
];

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: '' });

  return (
    <>
      {/* Hero Section */}
      <Section className="bg-gradient-to-b from-slate-50 to-white">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-primary-100 rounded-full">
              <FlaskConical className="w-8 h-8 text-primary-600" />
            </div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              {t('about.title')}
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {t('about.content')}
            </p>
          </div>
        </Container>
      </Section>

      {/* Stats Section */}
      <Section className="bg-primary-600 text-white">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-4xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-primary-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Mission Section */}
      <Section className="bg-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-slate-600 mb-8">
              {t('about.mission')}
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2 text-slate-900">For Researchers</h3>
                  <p className="text-sm text-slate-600">
                    We provide reliable access to high-purity peptide compounds for in-vitro research applications, enabling scientific advancement.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2 text-slate-900">For Laboratories</h3>
                  <p className="text-sm text-slate-600">
                    Consistent quality and comprehensive documentation support laboratory workflows and regulatory compliance requirements.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* Values Section */}
      <Section className="bg-slate-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose AnkiPeptide?</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <Card key={value.title} className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
                    <value.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-slate-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Quality Process */}
      <Section className="bg-white">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Quality Process</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Raw Material Verification</h3>
                  <p className="text-sm text-slate-600">
                    All incoming raw materials are verified and documented before use in manufacturing.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Manufacturing Standards</h3>
                  <p className="text-sm text-slate-600">
                    Peptides are synthesized under strict quality control conditions in ISO certified facilities.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Third-Party Testing</h3>
                  <p className="text-sm text-slate-600">
                    Every batch is sent to independent accredited laboratories for purity verification via HPLC and mass spectrometry.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Certificate of Analysis</h3>
                  <p className="text-sm text-slate-600">
                    Each release includes a comprehensive Certificate of Analysis available for download on our test results page.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section className="bg-slate-900 text-white">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              Browse our comprehensive catalog of research peptides or contact our team for bulk pricing and custom synthesis inquiries.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/products">
                <Button size="lg" className="bg-primary-600 hover:bg-primary-700">
                  View Products
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
