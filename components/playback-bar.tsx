'use client'

import { useEffect, useRef, useState } from 'react'
import { Play, Pause, SkipBack, SkipForward, Download } from 'lucide-react'
import { useLang } from '@/lib/i18n'
import { formatTimestamp } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export function PlaybackBar({
  duration,
  current,
  onSeek,
}: {
  duration: number
  current: number
  onSeek: (t: number) => void
}) {
  const { t } = useLang()
  const [playing, setPlaying] = useState(false)
  const [speed, setSpeed] = useState(1)
  const trackRef = useRef<HTMLDivElement>(null)

  // Simulated playback ticking
  useEffect(() => {
    if (!playing) return
    const id = setInterval(() => {
      onSeek(Math.min(duration, current + speed))
    }, 1000)
    return () => clearInterval(id)
  }, [playing, speed, current, duration, onSeek])

  useEffect(() => {
    if (current >= duration) setPlaying(false)
  }, [current, duration])

  function seekFromEvent(clientX: number) {
    const el = trackRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    let ratio = (clientX - rect.left) / rect.width
    // account for RTL
    if (getComputedStyle(el).direction === 'rtl') ratio = 1 - ratio
    onSeek(Math.max(0, Math.min(duration, ratio * duration)))
  }

  const pct = duration > 0 ? (current / duration) * 100 : 0

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div
        ref={trackRef}
        onClick={(e) => seekFromEvent(e.clientX)}
        className="group relative h-2 w-full cursor-pointer rounded-full bg-secondary"
        role="slider"
        aria-label="Seek"
        aria-valuemin={0}
        aria-valuemax={duration}
        aria-valuenow={current}
        tabIndex={0}
      >
        <div
          className="absolute inset-y-0 start-0 rounded-full bg-primary"
          style={{ width: `${pct}%` }}
        />
        <div
          className="absolute top-1/2 size-3.5 -translate-y-1/2 rounded-full bg-primary shadow-sm transition-transform group-hover:scale-125"
          style={{ insetInlineStart: `calc(${pct}% - 7px)` }}
        />
      </div>

      <div className="mt-3 flex items-center gap-3">
        <span className="font-mono text-xs tabular-nums text-muted-foreground">
          {formatTimestamp(current)}
        </span>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="size-8"
            onClick={() => onSeek(Math.max(0, current - 10))}
            aria-label="Back 10s"
          >
            <SkipBack className="size-4" />
          </Button>
          <Button
            size="icon"
            className="size-10 rounded-full"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? 'Pause' : 'Play'}
          >
            {playing ? (
              <Pause className="size-5" />
            ) : (
              <Play className="size-5" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-8"
            onClick={() => onSeek(Math.min(duration, current + 10))}
            aria-label="Forward 10s"
          >
            <SkipForward className="size-4" />
          </Button>
        </div>

        <span className="font-mono text-xs tabular-nums text-muted-foreground">
          {formatTimestamp(duration)}
        </span>

        <div className="ms-auto flex items-center gap-2">
          <button
            onClick={() => setSpeed((s) => (s >= 2 ? 0.5 : s + 0.5))}
            className="rounded-md border border-border px-2 py-1 text-xs font-medium text-muted-foreground hover:bg-secondary"
            aria-label={t('playbackSpeed')}
          >
            {speed}x
          </button>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Download className="size-3.5" />
            <span className="hidden sm:inline">{t('downloadAudio')}</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
