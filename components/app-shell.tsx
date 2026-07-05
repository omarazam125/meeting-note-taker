'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Mic, Upload, Library, LogOut, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useLang } from '@/lib/i18n'
import { cn, initials } from '@/lib/utils'
import { Logo } from '@/components/logo'
import { LanguageToggle, ThemeToggle } from '@/components/controls'
import { Button } from '@/components/ui/button'
import {
  Avatar,
  AvatarFallback,
} from '@/components/ui/avatar'

const NAV = [
  { href: '/record', icon: Mic, key: 'navRecord' as const },
  { href: '/upload', icon: Upload, key: 'navUpload' as const },
  { href: '/library', icon: Library, key: 'navLibrary' as const },
]

export function AppShell({ children }: { children: React.ReactNode }) {
  const { t } = useLang()
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const nav = (
    <nav className="flex flex-col gap-1">
      {NAV.map((item) => {
        const active =
          pathname === item.href || pathname.startsWith(item.href + '/')
        const Icon = item.icon
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
              active
                ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
            )}
          >
            <Icon className="size-[18px] shrink-0" />
            {t(item.key)}
          </Link>
        )
      })}
    </nav>
  )

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-e border-sidebar-border bg-sidebar p-4 lg:flex">
        <div className="mb-8 flex items-center px-2 pt-2">
          <Logo />
        </div>
        {nav}
        <div className="mt-auto flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>
          <div className="flex items-center gap-3 rounded-lg border border-sidebar-border p-2">
            <Avatar className="size-9">
              <AvatarFallback
                className="text-xs font-semibold text-primary-foreground"
                style={{ backgroundColor: 'var(--primary)' }}
              >
                {initials('Layla Hassan')}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">Layla Hassan</p>
              <p className="truncate text-xs text-muted-foreground">
                layla@shaffra.com
              </p>
            </div>
            <Link href="/login" aria-label={t('signOut')}>
              <Button variant="ghost" size="icon" className="size-8">
                <LogOut className="size-4" />
              </Button>
            </Link>
          </div>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-border p-4 lg:hidden">
          <Logo />
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
            <Button
              variant="outline"
              size="icon"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Menu"
            >
              {mobileOpen ? (
                <X className="size-4" />
              ) : (
                <Menu className="size-4" />
              )}
            </Button>
          </div>
        </header>

        {mobileOpen && (
          <div className="border-b border-border bg-sidebar p-4 lg:hidden">
            {nav}
            <Link href="/login" className="mt-2 block">
              <Button variant="ghost" className="w-full justify-start gap-3">
                <LogOut className="size-4" />
                {t('signOut')}
              </Button>
            </Link>
          </div>
        )}

        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  )
}
