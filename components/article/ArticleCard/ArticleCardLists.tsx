import { Date } from '@components/ui/Date'
import { getMediaURL } from '@lib/api'
import Link from 'next/link'
import s from './ArticleCard.module.css'
import cn from 'classnames'
import Image from 'next/image'
import ActionButtons from '../Article/ActionButtons'
import { getArticleImage } from '@lib/articleImages'

const CATEGORY_IMAGES: Record<string, string> = {
  politica: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=600&h=400&fit=crop',
  constitucionalismo: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop',
  estado: 'https://images.unsplash.com/photo-1575505586567-535a1e0e0b5f?w=600&h=400&fit=crop',
  democracia: 'https://images.unsplash.com/photo-1540910419892-4a36d2afc4cb?w=600&h=400&fit=crop',
  derechos: 'https://images.unsplash.com/photo-1516302752625-fccf828c51be?w=600&h=400&fit=crop',
  'participacion-ciudadana': 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=400&fit=crop',
  'casos-de-estudio': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop',
}

const ArticleCardList = ({ article }: { article: TArticle }) => {
  const coverUrl = article.cover
    ? getMediaURL(article.cover.formats.medium?.url || article.cover.url)
    : getArticleImage() || CATEGORY_IMAGES[article.category.slug] || CATEGORY_IMAGES['casos-de-estudio']

  return (
    <article className={s.lists}>
      <Link href={`/lists/${article.slug}`}>
        <a aria-label={`Link to ${article.title}`} className={s.cover}>
          <Image
            src={coverUrl}
            alt={article.cover?.alternativeText || article.category.title}
            layout="fill"
            className="object-cover"
          />
        </a>
      </Link>

      <section className="pt-4">
        <Link href={`/${article.category.slug}`}>
          <a className="uppercase text-xs font-bold tracking-wider transition-opacity duration-150 hover:opacity-70"
             style={{ color: 'var(--accent)' }}>
            {article.category.title}
          </a>
        </Link>
        <Link href={`/lists/${article.slug}`}>
          <a>
            <h3
              className={cn(
                s.title,
                'serif leading-snug overflow-hidden max-h-24 transition-colors duration-150 mt-1'
              )}
              style={{ fontSize: '1.1rem' }}
            >
              {article.title}
            </h3>
          </a>
        </Link>
        <div className="text-sm mt-2" style={{ color: 'var(--primary-60)' }}>
          Por{' '}
          <Link href={`/contributors/${article.author.slug}`}>
            <a className="font-semibold transition-colors duration-150 hover:text-accent">
              {article.author.name}
            </a>
          </Link>
        </div>
        <Date date={article.published_at as string} />
      </section>

      <ActionButtons article={article} />
    </article>
  )
}

export default ArticleCardList
