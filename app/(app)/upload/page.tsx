'use client'

import { useRouter } from 'next/navigation'
import { useRef, useState, type DragEvent } from 'react'
import { UploadCloud, FileAudio, X, Loader2 } from 'lucide-react'
import { useLang } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'

export default function UploadPage() {
  const { t } = useLang()
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  const [dragging, setDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [name, setName] = useState('')
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  function pick(files: FileList | null) {
    const f = files?.[0]
    if (f) {
      setFile(f)
      if (!name) setName(f.name.replace(/\.[^.]+$/, ''))
    }
  }

  function onDrop(e: DragEvent) {
    e.preventDefault()
    setDragging(false)
    pick(e.dataTransfer.files)
  }

  function process() {
    if (!file) return
    setUploading(true)
    setProgress(0)
    const id = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(id)
          setTimeout(() => router.push('/library'), 500)
          return 100
        }
        return p + 8
      })
    }, 180)
  }

  function humanSize(bytes: number) {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-10 lg:py-14">
      <h1 className="text-2xl font-bold">{t('uploadTitle')}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{t('uploadSubtitle')}</p>

      {!file ? (
        <div
          onDragOver={(e) => {
            e.preventDefault()
            setDragging(true)
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click()
          }}
          className={cn(
            'mt-8 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-12 text-center transition-colors',
            dragging
              ? 'border-primary bg-accent'
              : 'border-border hover:border-primary/50 hover:bg-secondary/50',
          )}
        >
          <span className="flex size-16 items-center justify-center rounded-full bg-accent text-accent-foreground">
            <UploadCloud className="size-8" />
          </span>
          <p className="mt-5 text-lg font-semibold">{t('uploadDrop')}</p>
          <p className="mt-1 text-sm text-muted-foreground">{t('uploadOr')}</p>
          <Button variant="outline" className="mt-3" type="button">
            {t('uploadBrowse')}
          </Button>
          <p className="mt-5 text-xs text-muted-foreground">
            {t('uploadFormats')}
          </p>
          <input
            ref={inputRef}
            type="file"
            accept="audio/*,video/*"
            className="hidden"
            onChange={(e) => pick(e.target.files)}
          />
        </div>
      ) : (
        <div className="mt-8 flex flex-col gap-6">
          <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
              <FileAudio className="size-6" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium">{file.name}</p>
              <p className="text-xs text-muted-foreground">
                {humanSize(file.size)}
              </p>
            </div>
            {!uploading && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setFile(null)
                  setProgress(0)
                }}
                aria-label={t('uploadRemove')}
              >
                <X className="size-4" />
              </Button>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="mname">{t('uploadMeetingName')}</Label>
            <Input
              id="mname"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('uploadMeetingNamePh')}
              disabled={uploading}
            />
          </div>

          {uploading && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {t('uploadUploading')}…
                </span>
                <span className="font-mono tabular-nums">{progress}%</span>
              </div>
              <Progress value={progress} />
            </div>
          )}

          <Button onClick={process} disabled={uploading} className="w-full">
            {uploading && <Loader2 className="size-4 animate-spin" />}
            {t('uploadProcess')}
          </Button>
        </div>
      )}
    </div>
  )
}
