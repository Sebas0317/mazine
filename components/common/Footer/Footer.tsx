import Link from 'next/link'
import ThemeSwitch from '../ThemeSwitch'
import s from './Footer.module.css'

const Footer = ({ categories, pages }: TNavigation) => {
  const year = new Date().getFullYear()

  return (
    <footer className="block bottom-0 left-0 right-0 px-6 py-10 mt-16 md:px-32 lg:px-48 xl:px-1/5"
      style={{ borderTop: '1px solid var(--primary-20)', backgroundColor: 'var(--primary-05)' }}
    >
      {/* Academic branding */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-3">
          <span className="w-10 h-10 rounded flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: '#7A0019' }}>
            UT
          </span>
          <div className="text-left leading-tight">
            <div className="text-xs uppercase tracking-widest font-semibold" style={{ color: '#7A0019' }}>
              Universidad del Tolima
            </div>
            <div className="text-xs uppercase tracking-widest font-semibold" style={{ color: '#7A0019' }}>
              IDEAD &mdash; Ingeniería de Sistemas
            </div>
          </div>
        </div>
        <p className="text-sm mt-2" style={{ color: 'var(--primary-60)' }}>
          Constitución Política &mdash; Portafolio Digital Académico
        </p>
        <p className="text-xs mt-1" style={{ color: 'var(--primary-40)' }}>
          Juan Sebastian Sandoval &mdash; Semestre 4 &mdash; {year}
        </p>
      </div>

      {/* Divider */}
      <div style={{ height: '1px', backgroundColor: 'var(--primary-20)' }} className="mx-auto max-w-xs mb-8" />

      {/* Category links */}
      <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-8" aria-label="Footer Nav">
        {categories.map((category) => (
          <Link href={`/${category.slug}`} key={category.slug}>
            <a className="text-xs uppercase tracking-wider font-semibold transition-opacity duration-150 hover:opacity-60" style={{ color: 'var(--primary-60)' }}>
              {category.title}
            </a>
          </Link>
        ))}
      </nav>

      {/* Theme switch */}
      <div className="flex justify-center mb-4">
        <ThemeSwitch />
      </div>

      <p className="text-center text-xs" style={{ color: 'var(--primary-40)' }}>
        &copy; {year} Universidad del Tolima. Todos los derechos reservados.
      </p>
    </footer>
  )
}

export default Footer
