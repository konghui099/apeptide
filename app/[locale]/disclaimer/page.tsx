import { getTranslations } from 'next-intl/server';
import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';
import { AlertTriangle } from 'lucide-react';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function DisclaimerPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: '' });

  return (
    <>
      <Section className="bg-gradient-to-b from-slate-50 to-white">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-yellow-100 rounded-full">
              <AlertTriangle className="w-8 h-8 text-yellow-600" />
            </div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900">
              {t('footer.disclaimer')}
            </h1>
            <p className="text-lg text-slate-600">
              Important information about the intended use of our products.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-bold text-yellow-800 mb-4">Research Use Only</h2>
              <p className="text-yellow-700">
                <strong>All products sold by AnkiPeptide are strictly for laboratory research purposes only. They are NOT intended for human use, consumption, or administration.</strong>
              </p>
            </div>

            <div className="prose prose-slate">
              <h2>Product Intended Use</h2>
              <p>
                The products supplied by AnkiPeptide are designed exclusively for in-vitro laboratory research and experimentation. These compounds are intended for use by qualified researchers, laboratory professionals, and scientific investigators in controlled laboratory environments.
              </p>

              <h2>Not for Human Consumption</h2>
              <p>
                Our products are not drugs, pharmaceuticals, food additives, or cosmetics. They have not been evaluated by any regulatory authority (including the FDA, EMA, or similar agencies) for safety or efficacy in humans. <strong>None of our products should be ingested, injected, or used in any manner that could result in human exposure.</strong>
              </p>

              <h2>Qualification Requirements</h2>
              <p>
                By purchasing from our site, you confirm and warrant that you are:
              </p>
              <ul>
                <li>A qualified researcher or laboratory professional</li>
                <li>Operating within an appropriate research or educational institution</li>
                <li>Using products in compliance with all applicable laws and regulations</li>
                <li>Following proper laboratory safety protocols</li>
              </ul>

              <h2>Liability</h2>
              <p>
                AnkiPeptide shall not be held responsible for any misuse of our products. Users assume full responsibility for ensuring that products are used in accordance with all applicable laws, regulations, and safety guidelines.
              </p>

              <h2>Third-Party Testing Verification</h2>
              <p>
                While we provide third-party Certificates of Analysis confirming purity levels, these verifications are conducted for research documentation purposes only and do not constitute approval for human use.
              </p>

              <h2>Changes to This Disclaimer</h2>
              <p>
                We reserve the right to modify this disclaimer at any time. Continued use of our website and services after changes constitutes acceptance of the modified terms.
              </p>
            </div>

            <div className="mt-12 p-6 bg-slate-50 rounded-lg text-center">
              <p className="text-slate-600 mb-4">
                If you have questions about this disclaimer, please contact us before making a purchase.
              </p>
              <a href="/contact" className="text-primary-600 font-medium hover:underline">
                Contact Us
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
