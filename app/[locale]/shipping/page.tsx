import { getTranslations } from 'next-intl/server';
import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';
import { Card, CardContent } from '@/components/ui/card';
import { Truck, Clock, Shield, Thermometer } from 'lucide-react';

interface PageProps {
  params: Promise<{ locale: string }>;
}

const shippingInfo = [
  {
    icon: Truck,
    title: 'Shipping Destinations',
    description: 'We ship to all EU countries and worldwide destinations including North America, Asia, Australia, and South America. Shipping is available to 50+ countries.',
  },
  {
    icon: Clock,
    title: 'Delivery Times',
    description: 'EU delivery: 3-7 business days. International delivery: 7-14 business days. Express shipping options available for urgent orders.',
  },
  {
    icon: Shield,
    title: 'Packaging',
    description: 'All shipments are carefully packaged with adequate protection. Temperature-sensitive compounds are shipped with cold-chain materials to ensure stability.',
  },
  {
    icon: Thermometer,
    title: 'Cold Chain Logistics',
    description: 'For sensitive peptides and compounds, we use cold-chain shipping methods including gel packs and insulated packaging to maintain optimal temperature during transit.',
  },
];

export default async function ShippingPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: '' });

  return (
    <>
      <Section className="bg-gradient-to-b from-slate-50 to-white">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900">
              {t('footer.shipping')}
            </h1>
            <p className="text-lg text-slate-600">
              Information about our shipping methods, destinations, and delivery times.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="grid gap-6 md:grid-cols-2 mb-12">
              {shippingInfo.map((info) => (
                <Card key={info.title}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{info.title}</h3>
                        <p className="text-sm text-slate-600">{info.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="border-t border-slate-200 pt-8">
              <h2 className="text-xl font-bold mb-4">Shipping Costs</h2>
              <p className="text-slate-600 mb-4">
                Shipping costs are calculated based on destination, weight, and whether cold-chain handling is required. Final shipping costs will be displayed at checkout before order confirmation.
              </p>
              <p className="text-slate-600">
                For bulk orders or special shipping requirements, please contact our team for a custom quote.
              </p>
            </div>

            <div className="border-t border-slate-200 pt-8 mt-8">
              <h2 className="text-xl font-bold mb-4">Order Processing</h2>
              <p className="text-slate-600">
                Orders are typically processed and shipped within 1-2 business days. You will receive tracking information via email once your order has been dispatched.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
