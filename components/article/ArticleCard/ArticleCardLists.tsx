import { Date } from '@components/ui/Date'
import { getMediaURL } from '@lib/api'
import Link from 'next/link'
import s from './ArticleCard.module.css'
import cn from 'classnames'
import Image from 'next/image'
import ActionButtons from '../Article/ActionButtons'
import { getArticleImage, getCategoryImage } from '@lib/articleImages'

const ArticleCardList = ({ article }: { article: TArticle }) => {
  const coverUrl = article.cover
    ? getMediaURL(article.cover.formats.medium?.url || article.cover.url)
    : getArticleImage() || getCategoryImage(article.category.slug, 'card')

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
