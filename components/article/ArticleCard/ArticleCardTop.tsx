import { Date } from '@components/ui/Date'
import Link from 'next/link'
import s from './ArticleCard.module.css'
import cn from 'classnames'

type Props = {
  article: TArticle
  index: number
}

const ArticleCardTop = ({ article, index }: Props) => {
  return (
    <article className={s.top}>
      <div className={s.topNumber}>{index}</div>
      <section>
        <Link href={`/articles/${article.slug}`}>
          <a>
            <h3
              className={cn(
                s.title,
                'serif leading-snug overflow-hidden max-h-24 mb-2 transition-colors duration-150'
              )}
              style={{ fontSize: '1.05rem' }}
            >
              {article.title}
            </h3>
          </a>
        </Link>

        <div className="text-sm flex flex-wrap" style={{ color: 'var(--primary-60)' }}>
          <p>
            Por
            <Link href={`/contributors/${article.author.slug}`}>
              <a className="pl-1 font-semibold transition-colors duration-150 hover:text-accent">
                {article.author.name}
              </a>
            </Link>
          </p>
          <span className="mx-3">|</span>
          <Link href={`/${article.category.slug}`}>
            <a className="transition-colors duration-150 hover:text-accent"
               style={{ color: 'var(--accent)' }}>
              {article.category.title}
            </a>
          </Link>
          <span className="mx-3">|</span>
          <Date date={article.published_at as string} />
        </div>
      </section>
    </article>
  )
}

export default ArticleCardTop
