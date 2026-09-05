import { useState } from 'react'
import Hero from './Hero'
import Atmosphere from './Atmosphere'
import SkyField from './SkyField'
import HeroSwitcher from './HeroSwitcher'
import { HERO_VARIANTS } from './heroVariantList'

/**
 * HeroExplorer — DEV-ONLY wrapper around the real <Hero>. It swaps the hero's
 * backdrop so we can keep iterating on the parked atmospheres (the sky
 * simulator above all) without any of them reaching production: Home renders
 * this behind `import.meta.env.DEV`, so the whole module — and with it
 * SkyField's shader — is dropped from the production bundle.
 *
 * Pick a backdrop from the floating pill, or with `?hero=<id>` (halo · none ·
 * aurora · sky · skytime). Sky 24h adds an hour scrubber for riding the day.
 */
function initialVariant() {
  const requested = new URLSearchParams(window.location.search).get('hero')
  return HERO_VARIANTS.some((v) => v.id === requested) ? requested : 'halo'
}

function backdropFor(variant, skyHour) {
  switch (variant) {
    case 'none':
      return null
    case 'sky':
      return <SkyField mode="fixed" />
    case 'skytime':
      return <SkyField mode="clock" hour={skyHour} />
    default:
      return <Atmosphere preset={variant} />
  }
}

function HeroExplorer() {
  const [variant, setVariant] = useState(initialVariant)
  // 24h scrubber override for the skytime backdrop; null = follow the clock.
  const [skyHour, setSkyHour] = useState(null)

  const changeVariant = (id) => {
    setVariant(id)
    // Keep the choice in the URL so a backdrop can be reloaded / shared.
    const url = new URL(window.location.href)
    if (id === 'halo') url.searchParams.delete('hero')
    else url.searchParams.set('hero', id)
    window.history.replaceState(null, '', url)
  }

  return (
    <>
      <HeroSwitcher
        active={variant}
        onChange={changeVariant}
        skyHour={variant === 'skytime' ? skyHour : undefined}
        onSkyHour={variant === 'skytime' ? setSkyHour : undefined}
      />
      {/* keyed so switching remounts the hero and replays its entrance */}
      <Hero key={variant} backdrop={backdropFor(variant, skyHour)} />
    </>
  )
}

export default HeroExplorer
