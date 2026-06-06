import { useIsOffline } from '@lib/hooks/use-is-offline'
import { useToast } from '@lib/hooks/use-toast'
import { useEffect } from 'react'
import { Footer } from '../Footer'
import { Header } from '../Header'
import { Nav } from '../Nav'
import cn from 'classnames'

type Props = {
  children: React.ReactNode
  navigation?: TNavigation
  isMarkdown?: boolean
}

const Layout = ({ children, navigation, isMarkdown = false }: Props) => {
  const { isOffline } = useIsOffline()
  const { addToast } = useToast()

  useEffect(() => {
    if (isOffline) {
      addToast('Sin conexión a internet')
    }
  }, [addToast, isOffline])

  return (
    <>
      <Header />
      {navigation && <Nav categories={navigation.categories} />}

      <main
        className={cn(
          'min-h-screen px-5 pt-24 pb-20 flex flex-col mx-auto',
          isMarkdown ? 'max-w-4xl' : 'max-w-6xl'
        )}
      >
        {children}
      </main>

      {navigation && (
        <Footer categories={navigation.categories} pages={navigation.pages} />
      )}
    </>
  )
}

export default Layout
