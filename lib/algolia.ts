import algoliasearch from 'algoliasearch'

const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || ''
const searchKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY || ''
const adminKey = process.env.ALGOLIA_ADMIN_KEY || ''

export const ALGOLIA_INDEX_NAME = 'products'

export const searchClient = algoliasearch(appId, searchKey)
export const adminClient = algoliasearch(appId, adminKey)

export interface AlgoliaProduct {
  objectID: string
  slug: string
  name: string
  description?: string
  application?: string
  categories: string[]
  specifications: Array<{
    key: string
    value: string
    unit?: string
  }>
  createdAt: number
  updatedAt: number
}
