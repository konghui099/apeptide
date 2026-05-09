import { getTranslations } from 'next-intl/server';
import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';

interface PageProps {
  params: Promise<{ locale: string }>;
}

const faqs = [
  {
    q: 'What are your products used for?',
    a: 'All our products are for laboratory research purposes only. They are intended for in-vitro research, biochemical experiments, and scientific investigation. None of our products are intended for human use, consumption, or clinical applications.',
  },
  {
    q: 'How do I store peptides?',
    a: 'Most peptides should be stored at -20°C or below in a freezer. Once reconstituted, peptides should typically be stored at 4°C and used within the recommended timeframe. Always refer to the specific product documentation for storage instructions.',
  },
  {
    q: 'What is your minimum order quantity?',
    a: 'We offer flexible ordering with no strict minimum order quantity for most products. However, bulk pricing benefits begin at orders of 10+ units per product. Contact our sales team for specific requirements.',
  },
  {
    q: 'Do you ship internationally?',
    a: 'Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times vary by destination. We use reliable courier services and can arrange special handling for temperature-sensitive compounds.',
  },
  {
    q: 'How can I verify product purity?',
    a: 'Every batch comes with a Certificate of Analysis (COA) from third-party laboratories confirming purity levels. COAs include HPLC and mass spectrometry results. You can download COAs from our Test Results page.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept various payment methods including bank transfer, credit card (where available), and cryptocurrency (for select orders). Contact us for payment options suitable for your region.',
  },
  {
    q: 'Are your products GMP certified?',
    a: 'Our manufacturing partners operate under ISO certified quality management systems. We can provide documentation regarding manufacturing standards upon request for specific products.',
  },
  {
    q: 'Can I order custom peptides?',
    a: 'Yes, we offer custom peptide synthesis services. We can produce sequences from 5 to 100+ amino acids with various modifications. Contact our team with your requirements for a quote and timeline.',
  },
];

export default async function FAQPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: '' });

  return (
    <>
      <Section className="bg-gradient-to-b from-slate-50 to-white">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900">
              {t('footer.faq')}
            </h1>
            <p className="text-lg text-slate-600">
              Frequently asked questions about our products and services.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-slate-200 pb-6">
                  <h3 className="text-lg font-semibold mb-2 text-slate-900">
                    {faq.q}
                  </h3>
                  <p className="text-slate-600">{faq.a}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-slate-50 rounded-lg text-center">
              <p className="text-slate-600 mb-4">
                Still have questions? Our team is here to help.
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
