'use client'

import { Moon, Sun, Languages } from 'lucide-react'
import { useLang } from '@/lib/i18n'
import { useTheme } from '@/lib/theme'
import { Button } from '@/components/ui/button'

export function LanguageToggle() {
  const { lang, toggleLang } = useLang()
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLang}
      className="gap-2 font-medium"
      aria-label="Toggle language"
    >
      <Languages className="size-4" />
      {lang === 'en' ? 'العربية' : 'English'}
    </Button>
  )
}

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="size-4" />
      ) : (
        <Moon className="size-4" />
      )}
    </Button>
  )
}
