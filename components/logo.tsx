import { cn } from '@/lib/utils'

export function Logo({
  className,
  showWordmark = true,
}: {
  className?: string
  showWordmark?: boolean
}) {
  if (!showWordmark) {
    // Mark only: crop the wordmark by showing a fixed square of the SVG.
    return (
      <span
        className={cn('inline-flex items-center', className)}
        aria-label="Shaffra"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/shaffra-logo.svg"
          alt="Shaffra"
          className="h-8 w-8 object-cover object-left"
          style={{ objectPosition: 'left center', width: '2rem' }}
        />
      </span>
    )
  }
  return (
    <span className={cn('inline-flex items-center', className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/shaffra-logo.svg" alt="Shaffra" className="h-8 w-auto" />
    </span>
  )
}
