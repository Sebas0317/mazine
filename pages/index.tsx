import { InferGetStaticPropsType } from 'next'
import { fetchAPI, getNavigation } from '@lib/api'
import { Layout } from '@components/common/Layout'
import Link from 'next/link'

export async function getStaticProps() {
  const articles: TArticle[] = await fetchAPI('/articles')
  const navigation: TNavigation = await getNavigation()

  return { props: { articles, navigation } }
}

const CATEGORY_LABELS: Record<string, string> = {
  politica: 'Política',
  constitucionalismo: 'Constitucionalismo',
  estado: 'Estado',
  democracia: 'Democracia',
  derechos: 'Derechos',
  'participacion-ciudadana': 'Participación Ciudadana',
  'casos-de-estudio': 'Casos de Estudio',
}

function Home({
  articles,
  navigation,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const grouped: Record<string, TArticle[]> = {}
  articles.forEach((a) => {
    const key = a.category?.slug || 'otros'
    if (!grouped[key]) grouped[key] = []
    grouped[key].push(a)
  })

  return (
    <Layout navigation={navigation}>
      {/* Journal header */}
      <div className="text-center py-12 mb-4">
        <h1 className="serif text-4xl leading-tight mb-3">
          Revista Digital
        </h1>
        <p className="text-sm max-w-lg mx-auto" style={{ color: 'var(--primary-60)' }}>
          Portafolio Digital Académico &mdash; Constitución Política de Colombia
        </p>
        <div className="flex items-center justify-center gap-3 mt-3">
          <span className="issn-badge">ISSN 2806-XXXX</span>
          <span className="vol-badge">Vol. 1 &middot; Núm. 1 &middot; {new Date().getFullYear()}</span>
        </div>
      </div>

      {/* TOC by category */}
      <div className="journal-toc-section">
        <h2>Contenido</h2>
        {['politica', 'constitucionalismo', 'estado', 'democracia', 'derechos', 'participacion-ciudadana', 'casos-de-estudio'].map((catSlug) => {
          const catArticles = grouped[catSlug] || []
          if (catArticles.length === 0) return null
          return (
            <div key={catSlug} className="mb-10">
              <Link href={`/${catSlug}`}>
                <a className="text-sm uppercase tracking-widest font-bold mb-4 inline-block transition-opacity hover:opacity-70"
                   style={{ color: 'var(--accent)' }}>
                  {CATEGORY_LABELS[catSlug] || catSlug} &mdash; {catArticles.length} artículo{catArticles.length !== 1 ? 's' : ''}
                </a>
              </Link>
              {catArticles.map((article, i) => (
                <div key={article.slug} className="journal-toc-item">
                  <span className="journal-toc-num">{i + 1}.</span>
                  <div>
                    <div className="journal-toc-meta">
                      {article.author?.name}
                    </div>
                    <Link href={`/articles/${article.slug}`}>
                      <a className="serif text-base leading-snug transition-colors hover:text-accent"
                         style={{ color: 'var(--primary)' }}>
                        {article.title}
                      </a>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

export default Home
