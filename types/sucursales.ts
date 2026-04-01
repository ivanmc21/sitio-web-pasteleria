export interface Coordinates {
  lat: number
  lng: number
}

export interface Branch {
  id: string
  name: string
  address: string
  neighborhood: string
  schedule: string
  phone: string
  isPrincipal?: boolean
  coordinates: Coordinates
  email?: string
  manager?: string
  image?: string
}

export interface BranchFilters {
  searchQuery: string
  neighborhood?: string
  hasDelivery?: boolean
}

export type BranchSortOption = 'name' | 'neighborhood' | 'distance'