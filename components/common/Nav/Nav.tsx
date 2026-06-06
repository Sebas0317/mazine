import Link from 'next/link'
import { useRouter } from 'next/router'
import cn from 'classnames'
import { useHideOnScroll } from '@lib/hooks/use-hide-on-scroll'

const Nav = ({ categories }: { categories: TCategory[] }) => {
  const router = useRouter()
  const { isHidden } = useHideOnScroll()
  return (
    <nav
      aria-label="Categories Nav"
      className={cn(
        'overflow-x-scroll sticky flex whitespace-nowrap px-6 top-14 z-10 bg-secondary scrollbar-none transform transition-transform duration-300',
        'md:justify-center md:gap-1',
        isHidden ? '-translate-y-full' : 'translate-y-0'
      )}
      style={{ borderBottom: '1px solid var(--primary-10)' }}
    >
      <Link href={`/`}>
        <a
          className={cn(
            'uppercase px-5 py-3 text-xs font-bold tracking-wider transition-colors duration-150',
            router.pathname === '/'
              ? 'text-accent'
              : 'text-primary-60 hover:text-primary'
          )}
          style={
            router.pathname === '/'
              ? { borderBottom: '2px solid var(--accent)' }
              : {}
          }
        >
          INICIO
        </a>
      </Link>
      {categories.map((category) => (
        <Link href={`/${category.slug}`} key={category.slug}>
          <a
            className={cn(
              'uppercase py-3 px-4 text-xs font-bold tracking-wider transition-colors duration-150',
              router.query.slug === category.slug
                ? 'text-accent'
                : 'text-primary-60 hover:text-primary'
            )}
            style={
              router.query.slug === category.slug
                ? { borderBottom: '2px solid var(--accent)' }
                : {}
            }
          >
            {category.title}
          </a>
        </Link>
      ))}
    </nav>
  )
}

export default Nav
