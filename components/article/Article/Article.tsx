import Link from 'next/link'
import { Markdown } from '@components/common/Markdown'
import AuthorCard from './AuthorCard'
import { Date } from '@components/ui/Date'
import ActionButtons from './ActionButtons'
import { getMediaURL } from '@lib/api'
import { getArticleImageLarge } from '@lib/articleImages'
import Image from 'next/image'

function Article({ article }: { article: TArticle | undefined }) {
  if (!article) return <p>Something went wrong</p>

  return (
    <article>
      <header className="py-8 text-center max-w-3xl mx-auto">
        <Link href={`/${article.category.slug}`}>
          <a className="uppercase text-xs font-bold tracking-widest transition-colors duration-150 hover:opacity-70"
             style={{ color: 'var(--accent)' }}>
            {article.category.title}
          </a>
        </Link>

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
          <Date date={article.published_at as string} />
        </p>

        <div className="flex justify-center mt-4">
          <ActionButtons article={article} />
        </div>

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
                />
              </div>
            )
          }
          return null
        })()}
      </header>

      <div className="max-w-3xl mx-auto">
        <Markdown
          content={article.content}
          variant={
            article.category?.slug === 'casos-de-estudio'
              ? 'editorial'
              : undefined
          }
        />
      </div>

      <footer className="border-t py-8 mt-24 max-w-3xl mx-auto"
        style={{ borderTopColor: 'var(--primary-20)' }}>
        <AuthorCard author={article.author} />
        <div className="mt-6">
          <ActionButtons article={article} />
        </div>
      </footer>
    </article>
  )
}

export default Article
