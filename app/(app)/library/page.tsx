'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { Search, Plus, Mic, Upload, Sparkles, Clock } from 'lucide-react'
import { useLang } from '@/lib/i18n'
import { meetings } from '@/lib/mock-data'
import {
  colorForName,
  formatDate,
  formatDuration,
  initials,
} from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { StatusBadge } from '@/components/status-badges'

export default function LibraryPage() {
  const { t, lang } = useLang()
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return meetings
    return meetings.filter(
      (m) =>
        m.title[lang].toLowerCase().includes(q) ||
        m.title.en.toLowerCase().includes(q) ||
        m.participants.some((p) => p.toLowerCase().includes(q)),
    )
  }, [query, lang])

  return (
    <div className="px-4 py-8 lg:px-8 lg:py-10">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{t('libraryTitle')}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {t('librarySubtitle')}
          </p>
        </div>
        <Link href="/record">
          <Button className="gap-2">
            <Plus className="size-4" />
            {t('libraryNew')}
          </Button>
        </Link>
      </div>

      <div className="relative mb-6 max-w-md">
        <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('librarySearchPh')}
          className="ps-9"
        />
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-xl border border-border md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/50 text-start">
              <th className="px-4 py-3 text-start font-medium text-muted-foreground">
                {t('colMeeting')}
              </th>
              <th className="px-4 py-3 text-start font-medium text-muted-foreground">
                {t('colDate')}
              </th>
              <th className="px-4 py-3 text-start font-medium text-muted-foreground">
                {t('colDuration')}
              </th>
              <th className="px-4 py-3 text-start font-medium text-muted-foreground">
                {t('colParticipants')}
              </th>
              <th className="px-4 py-3 text-start font-medium text-muted-foreground">
                {t('colStatus')}
              </th>
              <th className="px-4 py-3 text-end font-medium text-muted-foreground">
                {t('colActions')}
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((m) => (
              <tr
                key={m.id}
                className="border-b border-border last:border-0 transition-colors hover:bg-secondary/40"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                      {m.source === 'live' ? (
                        <Mic className="size-4" />
                      ) : (
                        <Upload className="size-4" />
                      )}
                    </span>
                    <span className="font-medium">{m.title[lang]}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {formatDate(m.date, lang)}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Clock className="size-3.5" />
                    {formatDuration(m.durationSec)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex -space-x-2 rtl:space-x-reverse">
                    {m.participants.slice(0, 3).map((p) => (
                      <Avatar
                        key={p}
                        className="size-7 border-2 border-card"
                        title={p}
                      >
                        <AvatarFallback
                          className="text-[10px] font-semibold"
                          style={{
                            backgroundColor: colorForName(p),
                            color: 'white',
                          }}
                        >
                          {initials(p)}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {m.participants.length > 3 && (
                      <span className="flex size-7 items-center justify-center rounded-full border-2 border-card bg-secondary text-[10px] font-semibold text-muted-foreground">
                        +{m.participants.length - 3}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={m.status} />
                </td>
                <td className="px-4 py-3 text-end">
                  {m.status === 'analyzed' ? (
                    <Link href={`/analysis/${m.id}`}>
                      <Button variant="ghost" size="sm" className="gap-1.5">
                        {t('actionView')}
                      </Button>
                    </Link>
                  ) : (
                    <Link href={`/analysis/${m.id}`}>
                      <Button size="sm" className="gap-1.5">
                        <Sparkles className="size-3.5" />
                        {t('actionAnalyze')}
                      </Button>
                    </Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="flex flex-col gap-3 md:hidden">
        {filtered.map((m) => (
          <div key={m.id} className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  {m.source === 'live' ? (
                    <Mic className="size-4" />
                  ) : (
                    <Upload className="size-4" />
                  )}
                </span>
                <div>
                  <p className="font-medium">{m.title[lang]}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(m.date, lang)} · {formatDuration(m.durationSec)}
                  </p>
                </div>
              </div>
              <StatusBadge status={m.status} />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex -space-x-2 rtl:space-x-reverse">
                {m.participants.slice(0, 4).map((p) => (
                  <Avatar key={p} className="size-7 border-2 border-card">
                    <AvatarFallback
                      className="text-[10px] font-semibold"
                      style={{
                        backgroundColor: colorForName(p),
                        color: 'white',
                      }}
                    >
                      {initials(p)}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <Link href={`/analysis/${m.id}`}>
                <Button
                  size="sm"
                  variant={m.status === 'analyzed' ? 'ghost' : 'default'}
                  className="gap-1.5"
                >
                  {m.status === 'analyzed' ? (
                    t('actionView')
                  ) : (
                    <>
                      <Sparkles className="size-3.5" />
                      {t('actionAnalyze')}
                    </>
                  )}
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-xl border border-dashed border-border py-16 text-center text-muted-foreground">
          {t('libraryEmpty')}
        </div>
      )}
    </div>
  )
}
