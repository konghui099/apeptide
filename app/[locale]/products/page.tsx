import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { ProductCard, products } from '@/components/products/product-card'
import { ProductFilters } from '@/components/products/product-filters'

export default function ProductsPage() {
  return (
    <Section>
      <Container>
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-64 shrink-0">
            <div className="sticky top-4">
              <h2 className="text-lg font-semibold mb-4">Filters</h2>
              <ProductFilters />
            </div>
          </aside>

          <main className="flex-1">
            <h1 className="text-3xl font-bold mb-6">Product Catalog</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </main>
        </div>
      </Container>
    </Section>
  )
}