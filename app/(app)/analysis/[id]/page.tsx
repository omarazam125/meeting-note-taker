'use client'

import Link from 'next/link'
import { notFound, useParams } from 'next/navigation'
import { useMemo, useRef, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  FileText,
  ListTree,
  MessageSquareText,
  Users,
  ListChecks,
  Sparkles,
  Download,
  Smile,
  CircleDot,
} from 'lucide-react'
import { useLang } from '@/lib/i18n'
import {
  meetings,
  timeline,
  transcript,
  tasks,
  speakerStats,
} from '@/lib/mock-data'
import {
  cn,
  colorForName,
  formatDate,
  formatDuration,
  formatTimestamp,
  initials,
} from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PlaybackBar } from '@/components/playback-bar'
import { PriorityBadge, TaskStatusBadge } from '@/components/status-badges'

export default function AnalysisPage() {
  const { t, lang } = useLang()
  const params = useParams<{ id: string }>()
  const meeting = meetings.find((m) => m.id === params.id)

  const [current, setCurrent] = useState(0)
  const transcriptRef = useRef<HTMLDivElement>(null)

  const duration = meeting?.durationSec ?? 2730

  const activeSegment = useMemo(
    () =>
      timeline.find((s) => current >= s.start && current < s.end) ??
      timeline[0],
    [current],
  )

  const totalTalk = speakerStats.reduce((a, s) => a + s.talkSec, 0)

  if (!meeting) return notFound()

  const BackIcon = lang === 'ar' ? ArrowRight : ArrowLeft

  const overviewEn =
    'The team met to lock down Q3 priorities. After weighing customer demand against engineering risk, they committed to shipping the analytics dashboard this quarter and pushing notifications to Q4. Ownership was assigned, and leadership approval will be sought for an additional engineer.'
  const overviewAr =
    'اجتمع الفريق لتثبيت أولويات الربع الثالث. بعد الموازنة بين طلب العملاء والمخاطر الهندسية، التزموا بإطلاق لوحة التحليلات هذا الربع وتأجيل الإشعارات للربع الرابع. تم توزيع المسؤوليات، وسيُطلب من الإدارة الموافقة على توظيف مهندس إضافي.'

  const keyPoints = {
    en: [
      'Analytics dashboard prioritized for Q3 based on repeated customer requests',
      'Notifications system deferred to Q4',
      'Data pipeline flagged as the main engineering risk; scoped to top 5 metrics',
      'Karim owns the pipeline, Sara owns the frontend',
      'Approval to be sought for one additional engineer',
    ],
    ar: [
      'إعطاء الأولوية للوحة التحليلات في الربع الثالث بناءً على طلبات العملاء المتكررة',
      'تأجيل نظام الإشعارات إلى الربع الرابع',
      'الإشارة إلى خط البيانات كأبرز مخاطرة هندسية؛ وحصره في أهم 5 مقاييس',
      'كريم مسؤول عن خط البيانات وسارة عن الواجهة الأمامية',
      'السعي للحصول على موافقة لتوظيف مهندس إضافي',
    ],
  }

  const decisions = {
    en: [
      'Ship analytics dashboard in Q3',
      'Move notifications to Q4',
      'Hire one more engineer (pending approval)',
    ],
    ar: [
      'إطلاق لوحة التحليلات في الربع الثالث',
      'نقل الإشعارات إلى الربع الرابع',
      'توظيف مهندس إضافي (بانتظار الموافقة)',
    ],
  }

  const topics = {
    en: ['Roadmap', 'Analytics', 'Engineering risk', 'Hiring', 'Timeline'],
    ar: ['خارطة الطريق', 'التحليلات', 'المخاطر الهندسية', 'التوظيف', 'الجدول الزمني'],
  }

  function jumpTo(time: number) {
    setCurrent(time)
  }

  return (
    <div className="px-4 py-6 lg:px-8 lg:py-8">
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/library"
          className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <BackIcon className="size-4" />
          {t('analysisBack')}
        </Link>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">{meeting.title[lang]}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <span>{formatDate(meeting.date, lang)}</span>
              <span>·</span>
              <span>{formatDuration(meeting.durationSec)}</span>
              <span>·</span>
              <span>
                {meeting.participants.length} {t('recordParticipants')}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1.5">
              <Download className="size-3.5" />
              {t('downloadTranscript')}
            </Button>
          </div>
        </div>
      </div>

      {/* Playback */}
      <div className="mb-6">
        <PlaybackBar duration={duration} current={current} onSeek={setCurrent} />
        <p className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
          <CircleDot className="size-3.5 text-primary" />
          {t('analysisSegment')}: {activeSegment.title[lang]}
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="mb-6 flex h-auto w-full flex-wrap justify-start gap-1 bg-secondary/60 p-1">
          <TabsTrigger value="summary" className="gap-1.5">
            <Sparkles className="size-4" />
            {t('analysisSummary')}
          </TabsTrigger>
          <TabsTrigger value="timeline" className="gap-1.5">
            <ListTree className="size-4" />
            {t('analysisTimeline')}
          </TabsTrigger>
          <TabsTrigger value="transcript" className="gap-1.5">
            <MessageSquareText className="size-4" />
            {t('analysisTranscript')}
          </TabsTrigger>
          <TabsTrigger value="speakers" className="gap-1.5">
            <Users className="size-4" />
            {t('analysisSpeakers')}
          </TabsTrigger>
          <TabsTrigger value="tasks" className="gap-1.5">
            <ListChecks className="size-4" />
            {t('analysisTasks')}
          </TabsTrigger>
        </TabsList>

        {/* SUMMARY */}
        <TabsContent value="summary" className="mt-0">
          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            <div className="flex flex-col gap-6">
              <section className="rounded-xl border border-border bg-card p-6">
                <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold">
                  <FileText className="size-5 text-primary" />
                  {t('analysisOverview')}
                </h2>
                <p className="text-pretty leading-relaxed text-foreground/90">
                  {lang === 'ar' ? overviewAr : overviewEn}
                </p>
              </section>

              <section className="rounded-xl border border-border bg-card p-6">
                <h2 className="mb-4 text-lg font-semibold">
                  {t('analysisKeyPoints')}
                </h2>
                <ul className="flex flex-col gap-3">
                  {keyPoints[lang].map((k, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-accent text-[11px] font-semibold text-accent-foreground">
                        {i + 1}
                      </span>
                      <span className="text-sm leading-relaxed">{k}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="rounded-xl border border-border bg-card p-6">
                <h2 className="mb-4 text-lg font-semibold">
                  {t('analysisDecisions')}
                </h2>
                <ul className="flex flex-col gap-2">
                  {decisions[lang].map((d, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2.5 rounded-lg bg-secondary/60 px-3 py-2.5 text-sm"
                    >
                      <CircleDot className="size-4 shrink-0 text-primary" />
                      {d}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <div className="flex flex-col gap-6">
              <section className="rounded-xl border border-border bg-card p-6">
                <h3 className="mb-3 text-sm font-semibold">
                  {t('analysisSentiment')}
                </h3>
                <div className="flex items-center gap-3">
                  <span className="flex size-11 items-center justify-center rounded-full bg-accent text-accent-foreground">
                    <Smile className="size-6" />
                  </span>
                  <div>
                    <p className="font-semibold">{t('sentimentPositive')}</p>
                    <p className="text-xs text-muted-foreground">
                      {lang === 'ar'
                        ? 'نبرة تعاونية ومنتجة'
                        : 'Collaborative & productive tone'}
                    </p>
                  </div>
                </div>
              </section>

              <section className="rounded-xl border border-border bg-card p-6">
                <h3 className="mb-3 text-sm font-semibold">
                  {t('analysisTopics')}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {topics[lang].map((topic) => (
                    <Badge key={topic} variant="secondary">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </section>

              <section className="rounded-xl border border-border bg-card p-6">
                <h3 className="mb-4 text-sm font-semibold">
                  {t('analysisTalkTime')}
                </h3>
                <div className="flex flex-col gap-3">
                  {speakerStats.map((s) => {
                    const pct = Math.round((s.talkSec / totalTalk) * 100)
                    return (
                      <div key={s.name}>
                        <div className="mb-1 flex items-center justify-between text-xs">
                          <span className="font-medium">{s.name}</span>
                          <span className="text-muted-foreground">{pct}%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-secondary">
                          <div
                            className="h-2 rounded-full"
                            style={{
                              width: `${pct}%`,
                              backgroundColor: s.color,
                            }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </section>
            </div>
          </div>
        </TabsContent>

        {/* TIMELINE */}
        <TabsContent value="timeline" className="mt-0">
          <div className="relative">
            <div className="absolute bottom-0 top-2 start-[15px] w-px bg-border" />
            <div className="flex flex-col gap-4">
              {timeline.map((seg) => {
                const active = current >= seg.start && current < seg.end
                return (
                  <button
                    key={seg.id}
                    onClick={() => jumpTo(seg.start)}
                    className="group relative flex gap-4 text-start"
                  >
                    <span
                      className={cn(
                        'relative z-10 mt-1 flex size-8 shrink-0 items-center justify-center rounded-full border-2 bg-background transition-colors',
                        active
                          ? 'border-primary text-primary'
                          : 'border-border text-muted-foreground group-hover:border-primary/50',
                      )}
                    >
                      <CircleDot className="size-4" />
                    </span>
                    <div
                      className={cn(
                        'flex-1 rounded-xl border p-4 transition-colors',
                        active
                          ? 'border-primary/40 bg-accent/40'
                          : 'border-border bg-card group-hover:border-primary/30',
                      )}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="font-semibold">{seg.title[lang]}</h3>
                        <span className="font-mono text-xs text-muted-foreground">
                          {formatTimestamp(seg.start)} –{' '}
                          {formatTimestamp(seg.end)}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {seg.summary[lang]}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {seg.keyPoints[lang].map((kp, i) => (
                          <span
                            key={i}
                            className="rounded-full bg-secondary px-2.5 py-1 text-xs text-secondary-foreground"
                          >
                            {kp}
                          </span>
                        ))}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </TabsContent>

        {/* TRANSCRIPT */}
        <TabsContent value="transcript" className="mt-0">
          <div
            ref={transcriptRef}
            className="rounded-xl border border-border bg-card p-2 sm:p-4"
          >
            {transcript.map((line) => {
              const active =
                current >= line.t &&
                current <
                  (transcript[transcript.indexOf(line) + 1]?.t ?? duration)
              return (
                <button
                  key={line.id}
                  onClick={() => jumpTo(line.t)}
                  className={cn(
                    'flex w-full gap-3 rounded-lg p-3 text-start transition-colors',
                    active ? 'bg-accent/50' : 'hover:bg-secondary/50',
                  )}
                >
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
                  <div className="min-w-0 flex-1">
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
                </button>
              )
            })}
          </div>
        </TabsContent>

        {/* SPEAKERS */}
        <TabsContent value="speakers" className="mt-0">
          <div className="grid gap-4 sm:grid-cols-2">
            {speakerStats.map((s) => {
              const pct = Math.round((s.talkSec / totalTalk) * 100)
              const spoken = transcript.filter((l) => l.speaker === s.name)
              return (
                <div
                  key={s.name}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="size-11">
                      <AvatarFallback
                        className="font-semibold"
                        style={{ backgroundColor: s.color, color: 'white' }}
                      >
                        {initials(s.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{s.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDuration(s.talkSec)} · {pct}%{' '}
                        {t('analysisTalkTime')}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 h-2 w-full rounded-full bg-secondary">
                    <div
                      className="h-2 rounded-full"
                      style={{ width: `${pct}%`, backgroundColor: s.color }}
                    />
                  </div>
                  {spoken[0] && (
                    <p className="mt-4 border-s-2 border-border ps-3 text-sm italic leading-relaxed text-muted-foreground">
                      “{spoken[0].text[lang]}”
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </TabsContent>

        {/* TASKS */}
        <TabsContent value="tasks" className="mt-0">
          {/* Desktop table */}
          <div className="hidden overflow-hidden rounded-xl border border-border md:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="px-4 py-3 text-start font-medium text-muted-foreground">
                    {t('taskTitle')}
                  </th>
                  <th className="px-4 py-3 text-start font-medium text-muted-foreground">
                    {t('taskOwner')}
                  </th>
                  <th className="px-4 py-3 text-start font-medium text-muted-foreground">
                    {t('taskDue')}
                  </th>
                  <th className="px-4 py-3 text-start font-medium text-muted-foreground">
                    {t('taskPriority')}
                  </th>
                  <th className="px-4 py-3 text-start font-medium text-muted-foreground">
                    {t('taskStatus')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr
                    key={task.id}
                    className="border-b border-border last:border-0 hover:bg-secondary/40"
                  >
                    <td className="px-4 py-3 font-medium">
                      {task.title[lang]}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Avatar className="size-6">
                          <AvatarFallback
                            className="text-[9px] font-semibold"
                            style={{
                              backgroundColor: colorForName(task.owner),
                              color: 'white',
                            }}
                          >
                            {initials(task.owner)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-muted-foreground">
                          {task.owner}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {formatDate(task.due, lang)}
                    </td>
                    <td className="px-4 py-3">
                      <PriorityBadge priority={task.priority} />
                    </td>
                    <td className="px-4 py-3">
                      <TaskStatusBadge status={task.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="flex flex-col gap-3 md:hidden">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="rounded-xl border border-border bg-card p-4"
              >
                <p className="font-medium">{task.title[lang]}</p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Avatar className="size-5">
                      <AvatarFallback
                        className="text-[8px] font-semibold"
                        style={{
                          backgroundColor: colorForName(task.owner),
                          color: 'white',
                        }}
                      >
                        {initials(task.owner)}
                      </AvatarFallback>
                    </Avatar>
                    {task.owner}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(task.due, lang)}
                  </span>
                  <PriorityBadge priority={task.priority} />
                  <TaskStatusBadge status={task.status} />
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
