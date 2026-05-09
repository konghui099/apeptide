import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface Product {
  id: string
  name: string
  slug: string
  purity: string
  description: string
  applications: string[]
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.slug}`}>
      <Card className="h-full transition-transform hover:scale-105 cursor-pointer">
        <CardHeader>
          <div className="flex items-start justify-between">
            <CardTitle className="text-lg">{product.name}</CardTitle>
            <Badge variant="outline">{product.purity}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            {product.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {product.applications.map((app) => (
              <Badge key={app} variant="secondary" className="text-xs">
                {app}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export const products: Product[] = [
  {
    id: '1',
    name: 'GLP-1 Analog',
    slug: 'glp-1-analog',
    purity: '99.5%',
    description: 'Glucagon-like peptide-1 analog for metabolic research and diabetes treatment development.',
    applications: ['Diabetes Research', 'Weight Management', 'Metabolic Studies'],
  },
  {
    id: '2',
    name: 'Cetrorelix',
    slug: 'cetrorelix',
    purity: '98.8%',
    description: 'Gonadotropin-releasing hormone antagonist used in fertility treatments and hormone-related research.',
    applications: ['Fertility Treatments', 'Hormone Research', 'Oncology'],
  },
  {
    id: '3',
    name: 'Thymosin Alpha 1',
    slug: 'thymosin-alpha-1',
    purity: '99.1%',
    description: 'Immunomodulating peptide that enhances T-cell function and immune response.',
    applications: ['Immunotherapy', ' Infectious Disease', 'Vaccine Adjuvant'],
  },
]