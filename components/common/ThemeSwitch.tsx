import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import ChevronDown from '@components/icons/ChevronDown'

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <label>
      <div className="relative w-max mx-auto my-2">
        <select
          className="select-primary bg-secondary md:text-sm"
          id="theme"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          aria-label="Cambiar tema"
        >
          <option value="system">Sistema</option>
          <option value="dark">Modo oscuro</option>
          <option value="light">Modo claro</option>
        </select>
        <span className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <ChevronDown width="20" height="20" />
        </span>
      </div>
    </label>
  )
}

export default ThemeSwitch
