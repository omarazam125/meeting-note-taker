'use client'

import { Badge } from '@/components/ui/badge'
import { useLang } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import type { MeetingStatus, Task } from '@/lib/mock-data'
import { CheckCircle2, Loader2, Circle } from 'lucide-react'

export function StatusBadge({ status }: { status: MeetingStatus }) {
  const { t } = useLang()
  const map = {
    analyzed: {
      label: t('statusAnalyzed'),
      cls: 'bg-accent text-accent-foreground border-transparent',
      icon: CheckCircle2,
    },
    processing: {
      label: t('statusProcessing'),
      cls: 'bg-secondary text-secondary-foreground border-transparent',
      icon: Loader2,
    },
    recorded: {
      label: t('statusRecorded'),
      cls: 'bg-muted text-muted-foreground border-transparent',
      icon: Circle,
    },
  }
  const { label, cls, icon: Icon } = map[status]
  return (
    <Badge variant="outline" className={cn('gap-1.5', cls)}>
      <Icon
        className={cn('size-3', status === 'processing' && 'animate-spin')}
      />
      {label}
    </Badge>
  )
}

export function PriorityBadge({ priority }: { priority: Task['priority'] }) {
  const { t } = useLang()
  const map = {
    high: { label: t('priorityHigh'), cls: 'bg-destructive/15 text-destructive' },
    medium: {
      label: t('priorityMedium'),
      cls: 'bg-accent text-accent-foreground',
    },
    low: { label: t('priorityLow'), cls: 'bg-secondary text-secondary-foreground' },
  }
  const { label, cls } = map[priority]
  return (
    <Badge variant="outline" className={cn('border-transparent', cls)}>
      {label}
    </Badge>
  )
}

export function TaskStatusBadge({ status }: { status: Task['status'] }) {
  const { t } = useLang()
  const map = {
    open: { label: t('taskOpen'), cls: 'bg-muted text-muted-foreground' },
    'in-progress': {
      label: t('taskInProgress'),
      cls: 'bg-secondary text-secondary-foreground',
    },
    done: { label: t('taskDone'), cls: 'bg-accent text-accent-foreground' },
  }
  const { label, cls } = map[status]
  return (
    <Badge variant="outline" className={cn('border-transparent', cls)}>
      {label}
    </Badge>
  )
}
