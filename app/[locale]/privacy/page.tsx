import { getTranslations } from 'next-intl/server';
import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function PrivacyPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: '' });

  return (
    <>
      <Section className="bg-gradient-to-b from-slate-50 to-white">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900">
              {t('footer.privacy')}
            </h1>
            <p className="text-lg text-slate-600">
              How we collect, use, and protect your information.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <div className="max-w-3xl mx-auto prose prose-slate">
            <h2>Information We Collect</h2>
            <p>
              We collect information you provide directly to us, such as when you create an account, place an order, subscribe to our newsletter, or contact us for support. This may include your name, email address, phone number, company name, billing address, and shipping address.
            </p>

            <h2>How We Use Your Information</h2>
            <p>
              We use the information we collect to process and fulfill orders, communicate with you about products and services, provide customer support, and send you promotional communications (with your consent where required).
            </p>

            <h2>Information Sharing</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as necessary to provide our services (such as shipping carriers and payment processors) or as required by law.
            </p>

            <h2>Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
            </p>

            <h2>Cookies and Tracking</h2>
            <p>
              We use cookies and similar tracking technologies to improve your browsing experience, analyze site traffic, and understand where visitors come from. You can control cookies through your browser settings.
            </p>

            <h2>Your Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, including the right to access, correct, or delete your data. Contact us to exercise these rights.
            </p>

            <h2>GDPR Compliance (EU Customers)</h2>
            <p>
              For customers in the European Union, we comply with the General Data Protection Regulation (GDPR). We process personal data only on lawful grounds and provide full data subject rights.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@ankipeptide.com">privacy@ankipeptide.com</a>.
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
