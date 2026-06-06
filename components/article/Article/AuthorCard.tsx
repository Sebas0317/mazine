import { getMediaURL } from '@lib/api'
import Link from 'next/link'
import Image from 'next/image'

function AuthorCard({ author }: { author: TContributor }) {
  const thumbnailUrl = author.featured?.profile_image && getMediaURL(
    author.featured.profile_image.formats.thumbnail?.url
  )

  return (
    <div className="flex py-4 items-start gap-5">
      {thumbnailUrl && (
        <Link href={`/contributors/${author.slug}`}>
          <figure className="relative w-16 h-16 flex-shrink-0">
            <Image
              src={thumbnailUrl}
              className="rounded-full"
              alt={`${author?.name} profile`}
              layout="fill"
            />
          </figure>
        </Link>
      )}

      <div>
        <Link href={`/contributors/${author.slug}`}>
          <a className="serif text-lg font-semibold">{author.name}</a>
        </Link>
        <div className="text-xs uppercase tracking-wider mt-0.5" style={{ color: 'var(--accent)' }}>
          {author.role || 'Autor'}
        </div>
        {author.featured?.description && (
          <p className="text-sm mt-2 leading-relaxed" style={{ color: 'var(--primary-60)' }}>
            {author.featured.description}
          </p>
        )}
      </div>
    </div>
  )
}

export default AuthorCard
