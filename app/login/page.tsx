'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, type FormEvent } from 'react'
import { Mic, Waves, ListChecks, Loader2 } from 'lucide-react'
import { useLang } from '@/lib/i18n'
import { Logo } from '@/components/logo'
import { LanguageToggle, ThemeToggle } from '@/components/controls'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function LoginPage() {
  const { t, lang } = useLang()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    // Front-end only: simulate auth then go to the app.
    setTimeout(() => router.push('/record'), 700)
  }

  const features = [
    {
      icon: Mic,
      en: 'Live transcription of everything on your device',
      ar: 'تفريغ مباشر لكل ما يصدر من جهازك',
    },
    {
      icon: Waves,
      en: 'Automatic speaker detection & diarization',
      ar: 'كشف المتحدثين وتمييزهم تلقائياً',
    },
    {
      icon: ListChecks,
      en: 'Full analysis: summary, timeline & action items',
      ar: 'تحليل شامل: ملخص وخط زمني ومهام',
    },
  ]

  return (
    <main className="flex min-h-screen">
      {/* Brand panel */}
      <section className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-sidebar p-12 lg:flex">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, var(--primary), transparent 45%), radial-gradient(circle at 80% 60%, var(--primary), transparent 40%)',
          }}
        />
        <Logo />
        <div className="relative z-10 max-w-md">
          <h1 className="text-balance text-4xl font-bold leading-tight">
            {lang === 'ar'
              ? 'حوّل كل اجتماع إلى محضر ذكي.'
              : 'Turn every meeting into smart notes.'}
          </h1>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            {lang === 'ar'
              ? 'شفرة نوتس يستمع، يفرّغ، ويحلّل اجتماعاتك لحظة بلحظة — بالعربية والإنجليزية.'
              : 'Shaffra Notes listens, transcribes and analyzes your meetings moment by moment — in Arabic and English.'}
          </p>
          <ul className="mt-8 flex flex-col gap-4">
            {features.map((f, i) => {
              const Icon = f.icon
              return (
                <li key={i} className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                    <Icon className="size-5" />
                  </span>
                  <span className="text-sm font-medium">
                    {lang === 'ar' ? f.ar : f.en}
                  </span>
                </li>
              )
            })}
          </ul>
        </div>
        <p className="relative z-10 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Shaffra
        </p>
      </section>

      {/* Form panel */}
      <section className="flex w-full flex-col lg:w-1/2">
        <div className="flex items-center justify-between p-6">
          <div className="lg:hidden">
            <Logo />
          </div>
          <div className="ms-auto flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center px-6 pb-16">
          <div className="w-full max-w-sm">
            <h2 className="text-2xl font-bold">{t('loginTitle')}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {t('loginSubtitle')}
            </p>

            <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">{t('email')}</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  defaultValue="layla@shaffra.com"
                  placeholder={t('loginEmailPh')}
                  autoComplete="email"
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">{t('password')}</Label>
                  <button
                    type="button"
                    className="text-xs font-medium text-primary hover:underline"
                  >
                    {t('loginForgot')}
                  </button>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  defaultValue="password"
                  placeholder={t('loginPasswordPh')}
                  autoComplete="current-password"
                />
              </div>

              <Button type="submit" className="mt-2 w-full" disabled={loading}>
                {loading && <Loader2 className="size-4 animate-spin" />}
                {t('loginCta')}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              {t('loginNoAccount')}{' '}
              <Link
                href="/record"
                className="font-medium text-primary hover:underline"
              >
                {t('loginCreate')}
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
