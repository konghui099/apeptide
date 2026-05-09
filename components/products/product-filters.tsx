'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface ProductFiltersProps {
  onSearchChange?: (search: string) => void
  onApplicationChange?: (application: string | null) => void
  onPurityChange?: (purity: string | null) => void
  applications?: string[]
  purities?: string[]
}

export function ProductFilters({
  onSearchChange,
  onApplicationChange,
  onPurityChange,
  applications = ['Diabetes Research', 'Weight Management', 'Metabolic Studies', 'Fertility Treatments', 'Hormone Research', 'Oncology', 'Immunotherapy', 'Vaccine Adjuvant'],
  purities = ['99.5%', '98.8%', '99.1%'],
}: ProductFiltersProps) {
  const [search, setSearch] = useState('')
  const [selectedApplication, setSelectedApplication] = useState<string | null>(null)
  const [selectedPurity, setSelectedPurity] = useState<string | null>(null)

  const handleSearchChange = (value: string) => {
    setSearch(value)
    onSearchChange?.(value)
  }

  const handleApplicationClick = (app: string) => {
    const newValue = selectedApplication === app ? null : app
    setSelectedApplication(newValue)
    onApplicationChange?.(newValue)
  }

  const handlePurityClick = (purity: string) => {
    const newValue = selectedPurity === purity ? null : purity
    setSelectedPurity(newValue)
    onPurityChange?.(newValue)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-3">Search</h3>
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-3">Application</h3>
        <div className="flex flex-wrap gap-2">
          {applications.map((app) => (
            <Button
              key={app}
              variant={selectedApplication === app ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleApplicationClick(app)}
            >
              {app}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-3">Purity</h3>
        <div className="flex flex-wrap gap-2">
          {purities.map((purity) => (
            <Button
              key={purity}
              variant={selectedPurity === purity ? 'default' : 'outline'}
              size="sm"
              onClick={() => handlePurityClick(purity)}
            >
              {purity}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}