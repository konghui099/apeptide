'use client'

import { useState, useEffect, useRef } from 'react'
import { searchClient, ALGOLIA_INDEX_NAME, type AlgoliaProduct } from '@/lib/algolia'
import { cn } from '@/lib/utils'
import { Search, X } from 'lucide-react'

interface ProductSearchProps {
  locale?: string
  placeholder?: string
  className?: string
}

export function ProductSearch({
  locale = 'en',
  placeholder = 'Search products...',
  className
}: ProductSearchProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<AlgoliaProduct[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const searchProducts = async () => {
      if (query.length < 2) {
        setResults([])
        return
      }

      setIsLoading(true)
      try {
        const response = await searchClient.initIndex(ALGOLIA_INDEX_NAME).search<AlgoliaProduct>(query, {
          hitsPerPage: 10,
          attributesToRetrieve: ['objectID', 'slug', 'name', 'description', 'categories'],
          attributesToHighlight: ['name', 'description']
        })
        setResults(response.hits)
      } catch (error) {
        console.error('Algolia search error:', error)
        setResults([])
      } finally {
        setIsLoading(false)
      }
    }

    const debounceTimer = setTimeout(searchProducts, 300)
    return () => clearTimeout(debounceTimer)
  }, [query])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleClear = () => {
    setQuery('')
    setResults([])
    inputRef.current?.focus()
  }

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {isOpen && query.length >= 2 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background border rounded-lg shadow-lg overflow-hidden z-50">
          {isLoading ? (
            <div className="p-4 text-center text-muted-foreground">
              Searching...
            </div>
          ) : results.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              No products found
            </div>
          ) : (
            <ul className="max-h-80 overflow-y-auto">
              {results.map((product) => (
                <li key={product.objectID}>
                  <a
                    href={`/${locale}/products/${product.slug}`}
                    className="block px-4 py-3 hover:bg-muted transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="font-medium">{product.name}</div>
                    {product.description && (
                      <div className="text-sm text-muted-foreground line-clamp-1">
                        {product.description}
                      </div>
                    )}
                    {product.categories && product.categories.length > 0 && (
                      <div className="text-xs text-muted-foreground mt-1">
                        {product.categories.join(', ')}
                      </div>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
