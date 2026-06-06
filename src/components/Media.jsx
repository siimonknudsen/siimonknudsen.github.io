import { useState, useRef, useEffect } from 'react'
import styles from './Media.module.css'

/**
 * Media — the one component for all imagery & video.
 * Owns: format fallback (images), lazy-load, in-view autoplay or hover-play
 * (video), a graceful reveal (fade + subtle scale), reduced-motion safety,
 * and a tokenised placeholder surface. See DESIGN_SYSTEM.md §8.
 *
 * Props:
 *  - src      image source. With an extension it's used as-is; without one,
 *             the format fallback tries .jpg/.jpeg/.png/.webp (project heroes).
 *  - video    string src, or { mp4, webm }. When set, renders a <video>.
 *  - poster   poster image for video.
 *  - alt      alt text.
 *  - aspect   aspect-ratio class (default 'aspect-video'). Pass '' to opt out.
 *  - rounded  radius class (default 'rounded-2xl').
 *  - priority eager-load (above the fold).
 *  - hoverPlay play video on hover instead of when it scrolls into view.
 */

const IMAGE_FORMATS = ['.jpg', '.jpeg', '.png', '.webp']
const EXT_RE = /\.(jpg|jpeg|png|webp|gif|avif|svg)$/i

// Map the legacy class-string props to real CSS values (no Tailwind).
const ASPECT = { 'aspect-video': '16 / 9', 'aspect-square': '1 / 1', 'aspect-[9/16]': '9 / 16' }
// All content imagery shares one corner radius (8px) for a consistent look
// across every component. `rounded-full` is the only opt-out (circular media).
const RADIUS = {
  rounded: 'var(--radius-md)',
  'rounded-lg': 'var(--radius-md)',
  'rounded-xl': 'var(--radius-md)',
  'rounded-2xl': 'var(--radius-md)',
  'rounded-full': 'var(--radius-pill)',
}

function Media({
  src,
  video,
  poster,
  alt = '',
  aspect = 'aspect-video',
  rounded = 'rounded-2xl',
  className = '',
  mediaClassName = '',
  priority = false,
  hoverPlay = false,
}) {
  const wrapRef = useRef(null)
  const videoRef = useRef(null)
  const imgRef = useRef(null)
  const [inView, setInView] = useState(priority)
  const [loaded, setLoaded] = useState(false)
  const [revealed, setRevealed] = useState(priority)
  const [fmt, setFmt] = useState(0)
  const [failed, setFailed] = useState(false)

  const isVideo = !!video

  // Reveal into view (also gates video autoplay).
  useEffect(() => {
    if (priority) return
    const el = wrapRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      // Positive preload margin: start loading/revealing ~300px before the
      // media scrolls into view so there are no dark gaps at the viewport edge.
      // (Reveal is latched separately via `revealed`, so it never re-hides.)
      { rootMargin: '300px 0px 300px 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [priority])

  // Autoplay video when in view (unless hoverPlay); pause otherwise.
  useEffect(() => {
    if (!isVideo || hoverPlay) return
    const v = videoRef.current
    if (!v) return
    if (inView) v.play?.().catch(() => {})
    else v.pause?.()
  }, [inView, isVideo, hoverPlay])

  const handleEnter = () => {
    if (isVideo && hoverPlay) videoRef.current?.play?.().catch(() => {})
  }
  const handleLeave = () => {
    if (isVideo && hoverPlay && videoRef.current) videoRef.current.pause()
  }

  const videoSources =
    typeof video === 'string'
      ? [{ src: video }]
      : video
      ? [
          video.webm && { src: video.webm, type: 'video/webm' },
          video.mp4 && { src: video.mp4, type: 'video/mp4' },
        ].filter(Boolean)
      : []

  // Extension-aware format fallback: strip any extension and try the given one
  // FIRST (no wasted request when correct), then the rest. This self-heals data
  // that points at the wrong extension (e.g. app1.jpg when the file is app1.png).
  const baseSrc = src ? src.replace(EXT_RE, '') : null
  const givenExt = src ? src.match(EXT_RE)?.[0]?.toLowerCase() ?? null : null
  const formatList = givenExt
    ? [givenExt, ...IMAGE_FORMATS.filter((e) => e !== givenExt)]
    : IMAGE_FORMATS
  const imgSrc = !isVideo && baseSrc ? `${baseSrc}${formatList[fmt]}` : null

  const handleImgError = () => {
    if (fmt < formatList.length - 1) setFmt(fmt + 1)
    else setFailed(true)
  }

  // Catch images that finish loading BEFORE React attaches onLoad (cached /
  // fast navigation) — otherwise the reveal stays stuck at opacity-0 and the
  // image is invisible while still reserving height (blank gaps, esp. mobile).
  // Placed after imgSrc is defined so the dependency isn't read in its TDZ.
  useEffect(() => {
    if (isVideo) return
    const img = imgRef.current
    if (img && img.complete && img.naturalWidth > 0) setLoaded(true)
  }, [imgSrc, isVideo])

  // Latch the reveal once the media has loaded or entered the viewport.
  useEffect(() => {
    if (loaded || inView) setRevealed(true)
  }, [loaded, inView])

  // 'auto' (or '') → image drives its own height (natural ratio).
  // 'fill'        → image covers the parent's height (for flexible-size cards).
  // otherwise     → a fixed aspect frame with object-cover (uniform thumbnails).
  const isAuto = !aspect || aspect === 'auto'
  const isFill = aspect === 'fill'
  const fit = isAuto ? styles.fitAuto : styles.fitCover

  // Reveal: fade + subtle scale (collapses to instant under reduced motion via
  // the global safety net in index.css). Latches `revealed` true once the image
  // has loaded OR scrolled into view — so an on-screen image can never stay
  // stuck invisible if onLoad is missed (cached / fast-nav), which caused blank
  // gaps on mobile; and it never re-hides when scrolled past.
  const reveal = `${styles.reveal} ${
    revealed ? styles.revealShown : styles.revealHidden
  }`

  // A natural-ratio image that exhausted every format has no sensible
  // placeholder size — render nothing so a missing file can't leave a blank
  // gap in a gallery/grid. (Fixed-aspect uses keep their tokenised placeholder.)
  if (failed && isAuto) return null

  return (
    <div
      ref={wrapRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={`${styles.wrap} ${className}`}
      style={{
        aspectRatio: !isAuto && !isFill ? ASPECT[aspect] : undefined,
        height: isFill ? '100%' : undefined,
        borderRadius: RADIUS[rounded],
      }}
    >
      {isVideo ? (
        <video
          ref={videoRef}
          poster={poster}
          muted
          loop
          playsInline
          preload={priority ? 'auto' : 'metadata'}
          onLoadedData={() => setLoaded(true)}
          className={`${fit} ${reveal} ${mediaClassName}`}
        >
          {videoSources.map((s) => (
            <source key={s.src} src={s.src} type={s.type} />
          ))}
        </video>
      ) : (
        !failed &&
        imgSrc && (
          <img
            ref={imgRef}
            src={imgSrc}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            onLoad={() => setLoaded(true)}
            onError={handleImgError}
            className={`${fit} ${reveal} ${mediaClassName}`}
          />
        )
      )}
    </div>
  )
}

export default Media
