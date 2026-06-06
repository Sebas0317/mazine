const IMAGE_ID = '1589829545856-d10d557cf95f'

const BASE = 'https://images.unsplash.com/photo-'

export function getArticleImage(): string {
  return `${BASE}${IMAGE_ID}?w=600&h=400&fit=crop`
}

export function getArticleImageLarge(): string {
  return `${BASE}${IMAGE_ID}?w=800&h=500&fit=crop`
}
