import type { CSSProperties, ReactNode } from 'react'
import { asset } from '../lib/asset'

interface PictureProps {
  /** Path without extension or width suffix, e.g. `/img/hero-tempero`. */
  base: string
  widths: number[]
  /** Width/height ratio of the rendered frame, e.g. `5 / 4`. */
  ratio: number
  alt: string
  className?: string
  imgClassName?: string
  sizes: string
  style?: CSSProperties
  priority?: boolean
  objectPosition?: string
  children?: ReactNode
}

/**
 * Renders the frame, the `<picture>` and the WebP/JPEG fallback together so a
 * slot can never end up with a mismatched ratio or a missing source.
 */
export function Picture({
  base,
  widths,
  ratio,
  alt,
  className = '',
  imgClassName = '',
  sizes,
  style,
  priority = false,
  objectPosition,
  children,
}: PictureProps) {
  const sorted = [...widths].sort((a, b) => a - b)
  const largest = sorted[sorted.length - 1]
  const webpSet = sorted.map((w) => `${asset(`${base}-${w}.webp`)} ${w}w`).join(', ')
  const jpgSet = sorted.map((w) => `${asset(`${base}-${w}.jpg`)} ${w}w`).join(', ')

  return (
    <div className={className} style={{ aspectRatio: ratio, ...style }}>
      <picture>
        <source type="image/webp" srcSet={webpSet} sizes={sizes} />
        <img
          src={asset(`${base}-${largest}.jpg`)}
          srcSet={jpgSet}
          sizes={sizes}
          alt={alt}
          width={largest}
          height={Math.round(largest / ratio)}
          className={`h-full w-full object-cover ${imgClassName}`}
          style={objectPosition ? { objectPosition } : undefined}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : 'auto'}
        />
      </picture>
      {children}
    </div>
  )
}
