import { useState, useRef, useEffect } from 'react'

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
const hasExtension = (s) => /\.(jpg|jpeg|png|webp|gif|avif|svg)$/i.test(s || '')

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
  const [inView, setInView] = useState(priority)
  const [loaded, setLoaded] = useState(false)
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
      { rootMargin: '0px 0px -10% 0px' }
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

  const imgSrc =
    !isVideo && src ? (hasExtension(src) ? src : `${src}${IMAGE_FORMATS[fmt]}`) : null

  const handleImgError = () => {
    if (!hasExtension(src) && fmt < IMAGE_FORMATS.length - 1) setFmt(fmt + 1)
    else setFailed(true)
  }

  // 'auto' (or '') → image drives its own height (natural ratio); otherwise a
  // fixed aspect frame with object-cover (uniform thumbnails).
  const isAuto = !aspect || aspect === 'auto'
  const fit = isAuto ? 'w-full h-auto block' : 'w-full h-full object-cover'

  // Reveal: fade + subtle scale (collapses to instant under reduced motion via
  // the global safety net in index.css).
  const reveal = `transition-[opacity,transform] duration-slower ease-decelerate ${
    loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.03]'
  }`

  return (
    <div
      ref={wrapRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={`relative overflow-hidden bg-surface-color-tertiary ${isAuto ? '' : aspect} ${rounded} ${className}`}
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
