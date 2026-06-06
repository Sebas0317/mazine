import { Date } from '@components/ui/Date'
import { getMediaURL } from '@lib/api'
import Link from 'next/link'
import s from '../ArticleCard/ArticleCard.module.css'
import cn from 'classnames'
import Image from 'next/image'
import ArticleCardTop from '../ArticleCard/ArticleCardTop'
import ActionButtons from '../Article/ActionButtons'
import { getArticleImageLarge } from '@lib/articleImages'

const CATEGORY_IMAGES: Record<string, string> = {
  politica: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&h=500&fit=crop',
  constitucionalismo: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=500&fit=crop',
  estado: 'https://images.unsplash.com/photo-1575505586567-535a1e0e0b5f?w=800&h=500&fit=crop',
  democracia: 'https://images.unsplash.com/photo-1540910419892-4a36d2afc4cb?w=800&h=500&fit=crop',
  derechos: 'https://images.unsplash.com/photo-1516302752625-fccf828c51be?w=800&h=500&fit=crop',
  'participacion-ciudadana': 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=500&fit=crop',
  'casos-de-estudio': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=500&fit=crop',
}

const ArticlesHero = ({ articles }: { articles: TArticle[] }) => {
  const coverUrl = articles[0]?.cover
    ? getMediaURL(articles[0].cover.formats.medium?.url || articles[0].cover.url)
    : getArticleImageLarge() || CATEGORY_IMAGES[articles[0]?.category?.slug] || CATEGORY_IMAGES['casos-de-estudio']

  return (
    <section className="mb-4 flex justify-between items-start gap-8">
      <div style={{ width: '48%' }}>
        <article className={s.hero}>
          <Link href={`/articles/${articles[0].slug}`}>
            <a aria-label={`Link to ${articles[0].title}`}>
              <div className={s.cover}>
                <Image
                  src={coverUrl}
                  alt={articles[0].cover?.alternativeText || articles[0].category.title}
                  layout="fill"
                  className="object-cover"
                />
              </div>
            </a>
          </Link>

          <section className="pt-6">
            <Link href={`/${articles[0].category.slug}`}>
              <a className="uppercase text-xs font-bold tracking-wider px-3 py-1 rounded-sm transition-colors duration-150"
                 style={{ color: 'var(--accent)', border: '1px solid var(--accent)' }}>
                {articles[0].category.title}
              </a>
            </Link>
            <Link href={`/articles/${articles[0].slug}`}>
              <a>
                <h3
                  className={cn(
                    s.title,
                    'serif leading-snug overflow-hidden max-h-28 mt-4 mb-3 transition-colors duration-150'
                  )}
                  style={{ fontSize: '1.3rem' }}
                >
                  {articles[0].title}
                </h3>
              </a>
            </Link>
            <div className="flex text-sm" style={{ color: 'var(--primary-60)' }}>
              Por
              <Link href={`/contributors/${articles[0].author.slug}`}>
                <a className="pl-1 pr-2 font-semibold transition-colors duration-150 hover:text-accent">
                  {articles[0].author.name}
                </a>
              </Link>
              {' | '}
              <Date
                className="px-2"
                date={articles[0].published_at as string}
              />
            </div>
          </section>
          <ActionButtons article={articles[0]} />
        </article>
      </div>

      <div style={{ width: '48%' }}>
        {articles.slice(0, 4).map((article, index) => (
          <ArticleCardTop
            article={article}
            index={index + 1}
            key={article.slug}
          />
        ))}
      </div>
    </section>
  )
}

export default ArticlesHero
