import Link from 'next/link'
import { Markdown } from '@components/common/Markdown'
import AuthorCard from './AuthorCard'
import { Date as DateDisplay } from '@components/ui/Date'
import { getMediaURL } from '@lib/api'
import { getArticleImageLarge } from '@lib/articleImages'
import Image from 'next/image'
import { useState, useEffect, useCallback } from 'react'

function ReadingProgress() {
  const [width, setWidth] = useState('0%')
  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    if (docHeight > 0) {
      setWidth(`${Math.min((scrollTop / docHeight) * 100, 100)}%`)
    }
  }, [])
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])
  return <div className="reading-progress" style={{ width }} />
}

function CitationBlock({ article }: { article: TArticle }) {
  const year = article.published_at ? new Date(article.published_at).getFullYear() : new Date().getFullYear()
  const url = `https://mazine.vercel.app/articles/${article.slug}`
  return (
    <div className="citation-block">
      <strong>Cómo citar:</strong><br />
      {article.author?.name} ({year}). {article.title}.<br />
      <em>Revista Digital - Universidad del Tolima</em>, Vol. 1, Núm. 1.<br />
      <span style={{ fontSize: '0.8rem' }}>
        ISSN: 2806-XXXX &mdash; {url}
      </span>
    </div>
  )
}

function BackToTop() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  if (!visible) return null
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-8 right-8 w-10 h-10 rounded-full flex items-center justify-center z-30 transition-opacity duration-200 hover:opacity-80"
      style={{ backgroundColor: 'var(--accent)', color: '#fff', boxShadow: 'var(--shadow-md)' }}
      aria-label="Volver arriba"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  )
}

function getReadingTime(content: string): string {
  const text = content.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
  const words = text.split(' ').length
  const minutes = Math.max(1, Math.round(words / 200))
  return `~${minutes} min de lectura`
}

function Article({ article }: { article: TArticle | undefined }) {
  if (!article) return <p>Something went wrong</p>

  return (
    <article className="animate-fade-in-up">
      <ReadingProgress />
      <BackToTop />

      <header className="py-8 text-center max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-3">
          <span className="vol-badge">Vol. 1 &middot; Núm. 1</span>
          <Link href={`/${article.category.slug}`}>
            <a className="uppercase text-xs font-bold tracking-widest transition-colors duration-150 hover:opacity-70"
               style={{ color: 'var(--accent)' }}>
              {article.category.title}
            </a>
          </Link>
        </div>

        <h1 className="serif mt-4 mb-4 leading-tight"
            style={{ fontSize: '2rem', letterSpacing: '-0.02em' }}>
          {article.title}
        </h1>

        <p className="text-sm" style={{ color: 'var(--primary-60)' }}>
          Por{' '}
          <Link href={`/contributors/${article.author.slug}`}>
            <a className="font-semibold transition-colors duration-150 hover:text-accent">
              {article.author.name}
            </a>
          </Link>
          {' — '}
          <DateDisplay date={article.published_at as string} />
          {' — '}
          <span>{getReadingTime(article.content)}</span>
        </p>

        {(() => {
          const fallbackUrl = getArticleImageLarge()
          if (article.cover) {
            return (
              <div className="my-8 rounded-lg overflow-hidden" style={{ boxShadow: 'var(--shadow-md)' }}>
                <Image
                  src={getMediaURL(article.cover.formats.medium?.url || article.cover.url)}
                  alt={article.cover.alternativeText || ''}
                  width={article.cover.width}
                  height={article.cover.height}
                  priority
                />
              </div>
            )
          }
          if (fallbackUrl) {
            return (
              <div className="my-8 rounded-lg overflow-hidden" style={{ boxShadow: 'var(--shadow-md)' }}>
                <Image
                  src={fallbackUrl}
                  alt=""
                  width={800}
                  height={500}
                  layout="responsive"
                  priority
                />
              </div>
            )
          }
          return null
        })()}
      </header>

      <div className="max-w-4xl mx-auto">
        <div className="drop-cap">
          <Markdown
            content={article.content}
            variant={
              article.category?.slug === 'casos-de-estudio'
                ? 'editorial'
                : undefined
            }
          />
        </div>

        <div className="fleuron-divider">&#10087;</div>

        <CitationBlock article={article} />
      </div>

      <footer className="border-t py-8 mt-24 max-w-4xl mx-auto"
        style={{ borderTopColor: 'var(--primary-20)' }}>
        <AuthorCard author={article.author} />
      </footer>
    </article>
  )
}

export default Article
