import { getTranslations } from 'next-intl/server';
import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function TermsPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: '' });

  return (
    <>
      <Section className="bg-gradient-to-b from-slate-50 to-white">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900">
              {t('footer.terms')}
            </h1>
            <p className="text-lg text-slate-600">
              Terms and conditions for using our services.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <div className="max-w-3xl mx-auto prose prose-slate">
            <h2>Agreement to Terms</h2>
            <p>
              By accessing or using our website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>

            <h2>Products and Intended Use</h2>
            <p>
              All products sold by AnkiPeptide are intended for laboratory research purposes only. These products are not drugs, medicines, or cosmetics and are not intended for human use, diagnosis, or treatment. By purchasing our products, you confirm that you are a qualified researcher or professional.
            </p>

            <h2>Orders and Payment</h2>
            <p>
              All orders are subject to availability and confirmation. Prices are subject to change without notice. We reserve the right to refuse or cancel any order for any reason. Payment must be received in full before order processing.
            </p>

            <h2>Shipping and Delivery</h2>
            <p>
              Shipping times are estimates only and are not guaranteed. Risk of loss and title for products pass to the buyer upon delivery to the shipping carrier. We are not responsible for delays caused by customs or shipping carriers.
            </p>

            <h2>Returns and Refunds</h2>
            <p>
              Due to the nature of our products, we cannot accept returns of opened or used products. If you receive a damaged or defective product, please contact us within 14 days to arrange a replacement or refund.
            </p>

            <h2>Limitation of Liability</h2>
            <p>
              AnkiPeptide shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from the use of our products or services. Our total liability shall not exceed the amount paid for the specific product in question.
            </p>

            <h2>Research Disclaimer</h2>
            <p>
              AnkiPeptide provides products for laboratory research purposes only. The company does not recommend, endorse, or encourage the use of these products for any specific application. Users are responsible for ensuring compliance with applicable laws and regulations.
            </p>

            <h2>Intellectual Property</h2>
            <p>
              All content on this website, including text, graphics, logos, and images, is the property of AnkiPeptide and is protected by intellectual property laws.
            </p>

            <h2>Governing Law</h2>
            <p>
              These Terms of Service shall be governed by and construed in accordance with applicable laws, without regard to conflicts of law principles.
            </p>

            <h2>Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the modified terms.
            </p>

            <h2>Contact Information</h2>
            <p>
              For questions regarding these Terms of Service, please contact us at <a href="mailto:legal@ankipeptide.com">legal@ankipeptide.com</a>.
            </p>

            <p className="text-sm text-slate-500 mt-8">
              Last updated: May 2026
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
