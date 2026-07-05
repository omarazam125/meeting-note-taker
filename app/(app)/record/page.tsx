'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import {
  Mic,
  MicOff,
  Square,
  Pause,
  Play,
  Plus,
  Monitor,
  Radio,
  Check,
  X,
} from 'lucide-react'
import { useLang } from '@/lib/i18n'
import { liveTranscriptPool, type TranscriptLine } from '@/lib/mock-data'
import {
  cn,
  colorForName,
  formatDuration,
  formatTimestamp,
  initials,
} from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

type Phase = 'idle' | 'live' | 'saving'

function Equalizer({ active }: { active: boolean }) {
  const bars = [0, 1, 2, 3, 4]
  return (
    <div className="flex h-6 items-end gap-1">
      {bars.map((b) => (
        <span
          key={b}
          className={cn(
            'w-1 rounded-full bg-primary',
            active ? 'animate-eq' : 'h-1.5',
          )}
          style={
            active
              ? { height: '100%', animationDelay: `${b * 0.12}s` }
              : undefined
          }
        />
      ))}
    </div>
  )
}

export default function RecordPage() {
  const { t, lang } = useLang()
  const router = useRouter()

  const [phase, setPhase] = useState<Phase>('idle')
  const [seconds, setSeconds] = useState(0)
  const [paused, setPaused] = useState(false)
  const [micMuted, setMicMuted] = useState(false)
  const [lines, setLines] = useState<TranscriptLine[]>([])
  const [participants, setParticipants] = useState<string[]>([
    'Layla',
    'Omar',
  ])
  const [newParticipant, setNewParticipant] = useState('')

  const scrollRef = useRef<HTMLDivElement>(null)
  const poolIndex = useRef(0)

  // Timer
  useEffect(() => {
    if (phase !== 'live' || paused) return
    const id = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(id)
  }, [phase, paused])

  // Simulated live transcript
  useEffect(() => {
    if (phase !== 'live' || paused) return
    const id = setInterval(() => {
      const next = liveTranscriptPool[poolIndex.current % liveTranscriptPool.length]
      poolIndex.current += 1
      setLines((prev) => [
        ...prev,
        {
          ...next,
          id: `${next.id}-${prev.length}`,
          t: seconds,
        },
      ])
    }, 2600)
    return () => clearInterval(id)
  }, [phase, paused, seconds])

  // Auto-scroll transcript
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [lines])

  function start() {
    setPhase('live')
    setSeconds(0)
    setLines([])
    poolIndex.current = 0
  }

  function stop() {
    setPhase('saving')
    setTimeout(() => router.push('/library'), 1200)
  }

  function addParticipant() {
    const name = newParticipant.trim()
    if (name && !participants.includes(name)) {
      setParticipants((p) => [...p, name])
      setNewParticipant('')
    }
  }

  const wordCount = lines.reduce(
    (acc, l) => acc + l.text[lang].split(/\s+/).length,
    0,
  )
  const speakersDetected = new Set(lines.map((l) => l.speaker)).size

  // ---- IDLE ----
  if (phase === 'idle') {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-6 py-16 lg:min-h-screen">
        <div className="w-full max-w-xl text-center">
          <Badge variant="secondary" className="mb-6 gap-1.5">
            <Radio className="size-3.5" />
            {t('appName')}
          </Badge>
          <h1 className="text-balance text-3xl font-bold sm:text-4xl">
            {t('recordIdleTitle')}
          </h1>
          <p className="mx-auto mt-4 max-w-md text-pretty leading-relaxed text-muted-foreground">
            {t('recordIdleSubtitle')}
          </p>

          <div className="relative mx-auto mt-12 flex size-48 items-center justify-center">
            <span className="absolute inline-flex size-40 rounded-full bg-primary/20 animate-pulse-ring" />
            <span className="absolute inline-flex size-40 rounded-full bg-primary/10" />
            <button
              onClick={start}
              className="group relative flex size-32 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50"
              aria-label={t('recordStart')}
            >
              <Mic className="size-12" />
            </button>
          </div>

          <p className="mt-10 text-lg font-semibold">{t('recordStart')}</p>
          <p className="mt-2 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Monitor className="size-4" />
            {t('recordHint')}
          </p>
        </div>
      </div>
    )
  }

  // ---- SAVING ----
  if (phase === 'saving') {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-6 lg:min-h-screen">
        <div className="flex size-20 items-center justify-center rounded-full bg-accent text-accent-foreground">
          <Check className="size-10" />
        </div>
        <p className="mt-6 text-xl font-semibold">{t('recordSaveConfirm')}</p>
        <p className="mt-2 text-sm text-muted-foreground">
          {formatDuration(seconds)} · {wordCount} {t('recordWords')}
        </p>
      </div>
    )
  }

  // ---- LIVE ----
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col lg:min-h-screen">
      {/* Status bar */}
      <div className="flex flex-wrap items-center gap-4 border-b border-border p-4 lg:px-8">
        <div className="flex items-center gap-2.5">
          <span className="relative flex size-3">
            {!paused && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-75" />
            )}
            <span
              className={cn(
                'relative inline-flex size-3 rounded-full',
                paused ? 'bg-muted-foreground' : 'bg-destructive',
              )}
            />
          </span>
          <span className="font-semibold">
            {paused ? t('recordPause') : t('recordLiveTitle')}
          </span>
        </div>

        <span className="font-mono text-lg font-semibold tabular-nums">
          {formatDuration(seconds)}
        </span>

        <div className="ms-auto flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPaused((p) => !p)}
            className="gap-2"
          >
            {paused ? (
              <>
                <Play className="size-4" /> {t('recordResume')}
              </>
            ) : (
              <>
                <Pause className="size-4" /> {t('recordPause')}
              </>
            )}
          </Button>
          <Button
            variant={micMuted ? 'secondary' : 'outline'}
            size="sm"
            onClick={() => setMicMuted((m) => !m)}
            className="gap-2"
          >
            {micMuted ? (
              <>
                <MicOff className="size-4" /> {t('recordUnmuteMic')}
              </>
            ) : (
              <>
                <Mic className="size-4" /> {t('recordMuteMic')}
              </>
            )}
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={stop}
            className="gap-2"
          >
            <Square className="size-4" /> {t('recordStop')}
          </Button>
        </div>
      </div>

      <div className="grid flex-1 gap-6 p-4 lg:grid-cols-[1fr_320px] lg:p-8">
        {/* Transcript */}
        <div className="flex min-h-0 flex-col rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-5 py-3">
            <div className="flex items-center gap-2">
              <Equalizer active={!paused} />
              <span className="font-semibold">{t('recordLiveTranscript')}</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span>
                {wordCount} {t('recordWords')}
              </span>
              <span>·</span>
              <span>
                {speakersDetected} {t('recordSpeakers')}
              </span>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="flex-1 space-y-4 overflow-y-auto p-5"
            style={{ maxHeight: 'calc(100vh - 16rem)' }}
          >
            {lines.length === 0 && (
              <p className="py-12 text-center text-sm text-muted-foreground">
                {t('recordListening')}…
              </p>
            )}
            {lines.map((line) => (
              <div key={line.id} className="flex gap-3">
                <Avatar className="size-8 shrink-0">
                  <AvatarFallback
                    className="text-[10px] font-semibold"
                    style={{
                      backgroundColor: colorForName(line.speaker),
                      color: 'white',
                    }}
                  >
                    {initials(line.speaker)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-semibold">
                      {line.speaker}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">
                      {formatTimestamp(line.t)}
                    </span>
                  </div>
                  <p className="mt-0.5 text-sm leading-relaxed text-foreground/90">
                    {line.text[lang]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Side panel */}
        <div className="flex flex-col gap-6">
          {/* Audio sources */}
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="mb-4 text-sm font-semibold">
              {t('recordListening')}
            </h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm">
                  <Monitor className="size-4 text-muted-foreground" />
                  {t('recordSystemAudio')}
                </span>
                <Equalizer active={!paused} />
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm">
                  {micMuted ? (
                    <MicOff className="size-4 text-destructive" />
                  ) : (
                    <Mic className="size-4 text-muted-foreground" />
                  )}
                  {t('recordMic')}
                </span>
                <Equalizer active={!paused && !micMuted} />
              </div>
            </div>
            {micMuted && (
              <p className="mt-3 rounded-lg bg-secondary p-2.5 text-xs text-muted-foreground">
                {t('recordMicMuted')}
              </p>
            )}
          </div>

          {/* Participants */}
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="mb-4 text-sm font-semibold">
              {t('recordParticipants')}
            </h3>
            <div className="flex flex-col gap-2">
              {participants.map((p) => (
                <div key={p} className="flex items-center gap-2.5">
                  <Avatar className="size-7">
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
                  <span className="flex-1 text-sm">{p}</span>
                  <button
                    onClick={() =>
                      setParticipants((prev) => prev.filter((x) => x !== p))
                    }
                    className="text-muted-foreground hover:text-destructive"
                    aria-label={t('delete')}
                  >
                    <X className="size-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-3 flex gap-2">
              <Input
                value={newParticipant}
                onChange={(e) => setNewParticipant(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
                    e.preventDefault()
                    addParticipant()
                  }
                }}
                placeholder={t('recordParticipantPh')}
                className="h-9"
              />
              <Button
                size="icon"
                variant="secondary"
                className="size-9 shrink-0"
                onClick={addParticipant}
                aria-label={t('recordAddParticipant')}
              >
                <Plus className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
