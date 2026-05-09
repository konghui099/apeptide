import { getTranslations } from 'next-intl/server';
import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Award, FileCheck, Microscope } from 'lucide-react';

interface PageProps {
  params: Promise<{ locale: string }>;
}

const qualityPoints = [
  {
    icon: Shield,
    title: 'ISO Certified Manufacturing',
    description: 'Our manufacturing partners operate under ISO certified quality management systems, ensuring consistent quality and compliance with international standards.',
  },
  {
    icon: Microscope,
    title: 'Third-Party Testing',
    description: 'Every batch undergoes rigorous testing at independent accredited laboratories. We use HPLC (High-Performance Liquid Chromatography) and mass spectrometry for purity verification.',
  },
  {
    icon: FileCheck,
    title: 'Full Traceability',
    description: 'Complete documentation from raw material sourcing through manufacturing to final product release. Each batch can be traced back to its source materials.',
  },
  {
    icon: Award,
    title: '99%+ Purity Standard',
    description: 'We guarantee a minimum of 99% purity for all our peptide products, verified by third-party laboratory analysis and documented in Certificates of Analysis.',
  },
];

export default async function QualityPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: '' });

  return (
    <>
      <Section className="bg-gradient-to-b from-slate-50 to-white">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900">
              {t('footer.quality')}
            </h1>
            <p className="text-lg text-slate-600">
              Our commitment to quality assurance and product verification.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="grid gap-6 md:grid-cols-2 mb-12">
              {qualityPoints.map((point) => (
                <Card key={point.title}>
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                      <point.icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <h3 className="font-semibold mb-2">{point.title}</h3>
                    <p className="text-sm text-slate-600">{point.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="border-t border-slate-200 pt-8">
              <h2 className="text-xl font-bold mb-4">Certificate of Analysis</h2>
              <p className="text-slate-600 mb-4">
                Every product batch includes a comprehensive Certificate of Analysis (COA) containing:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-2">
                <li>Purity verification by HPLC</li>
                <li>Mass spectrometry confirmation</li>
                <li>Appearance and physical characteristics</li>
                <li>Water content analysis</li>
                <li>Batch number and manufacturing date</li>
              </ul>
            </div>

            <div className="border-t border-slate-200 pt-8 mt-8">
              <h2 className="text-xl font-bold mb-4">Quality Commitment</h2>
              <p className="text-slate-600">
                We stand behind the quality of our products. If you have any concerns about a product&apos;s quality or documentation, please contact us immediately. We are committed to ensuring complete customer satisfaction.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
