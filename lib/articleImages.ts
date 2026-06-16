const IMAGE_ID = '1589829545856-d10d557cf95f'

const BASE = 'https://images.unsplash.com/photo-'

export function getArticleImage(): string {
  return `${BASE}${IMAGE_ID}?w=600&h=400&fit=crop`
}

export function getArticleImageLarge(): string {
  return `${BASE}${IMAGE_ID}?w=800&h=500&fit=crop`
}

export const CATEGORY_IMAGES: Record<string, string> = {
  politica: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9',
  constitucionalismo: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f',
  estado: 'https://images.unsplash.com/photo-1575505586567-535a1e0e0b5f',
  democracia: 'https://images.unsplash.com/photo-1540910419892-4a36d2afc4cb',
  derechos: 'https://images.unsplash.com/photo-1516302752625-fccf828c51be',
  'participacion-ciudadana': 'https://images.unsplash.com/photo-1559027615-cd4628902d4a',
  'casos-de-estudio': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa',
}

export function getCategoryImage(slug: string, size: 'card' | 'hero' = 'card'): string {
  const img = CATEGORY_IMAGES[slug] || CATEGORY_IMAGES['casos-de-estudio']
  const dims = size === 'hero' ? 'w=800&h=500&fit=crop' : 'w=600&h=400&fit=crop'
  return `${img}?${dims}`
}
