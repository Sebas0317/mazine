export function getStrapiURL(path: string) {
  return `${process.env.API_URL || 'http://localhost:1337'}${path}`
}

// Helper to make GET requests to Strapi
export async function fetchAPI(path: string) {
  const requestUrl = getStrapiURL(path)
  let response
  try {
    response = await fetch(requestUrl)
  } catch {
    console.warn(`[api] No se pudo conectar a ${requestUrl} — devuelve datos vacíos`)
    return []
  }
  if (!response.ok) {
    console.warn(`[api] ${requestUrl} respondió ${response.status} — devuelve datos vacíos`)
    return []
  }
  const data = await response.json()
  return data
}

export const getMediaURL = (url?: string) => {
  if (!url) return ' '
  // Return the full url when it's external
  if (url.startsWith('http') || url.startsWith('//')) return url
  return getStrapiURL(url)
}

export async function getNavigation(): Promise<TNavigation> {
  const [categories, pages] = await Promise.all([
    fetchAPI('/categories'),
    fetchAPI('/pages'),
  ])

  return { categories, pages }
}
