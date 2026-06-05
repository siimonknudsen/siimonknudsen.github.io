# Portfolio — Design Vision

The north star for how this portfolio looks, feels, and moves. Every design and
build decision should ladder up to this. Companion docs:
[DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) (tokens & components) and
[GLASS_DESIGN_SYSTEM.md](GLASS_DESIGN_SYSTEM.md) (materials).

---

## 1. What this is

The personal portfolio of **Simon Knudsen, Product Designer**. Its job is to make
a hiring manager or client think, within five seconds, *"this person has
exceptional craft."* The work is the hero; the interface is the frame around it.

## 2. Aesthetic direction — "Quiet 2026"

A calm, confident, editorial aesthetic with a **frosted-glass** signature.
Reference points: [seed.com](https://seed.com) and
[meetcleo.com](https://web.meetcleo.com) — soft translucency, generous space,
rounded glass surfaces, restrained palette, big imagery.

- **Monochrome foundation, restrained colour.** Black/white with a full neutral
  ramp; a single green accent reserved for "live/available" status. Colour comes
  from the *work itself* (project imagery), not the chrome.
- **Depth through glass & light, not borders.** Layering, blur, soft shadows and
  a subtle top highlight create hierarchy — not heavy outlines.
- **Editorial typography.** One typeface (Inter), two weights, a disciplined
  scale. Large, tight headlines; calm, readable body.
- **Generous whitespace.** Let content breathe; negative space is a feature.
- **Light & dark are equals.** Dark is the default and the signature; light is
  first-class, not an afterthought.

## 3. Design principles

1. **Work first.** Chrome recedes; imagery and case studies lead.
2. **Clarity over cleverness.** Effects must aid comprehension, never fight it.
3. **Consistency via tokens.** Nothing hard-coded — every value is a token so the
   whole site moves together. See DESIGN_SYSTEM.md.
4. **Craft in the details.** Hover states, easing, optical alignment, image
   loading — the 1% details are the point for a *design* portfolio.
5. **Accessible by default.** WCAG AA contrast, full keyboard support, and honour
   `prefers-reduced-motion` / `-transparency` / `-contrast`.
6. **Fast is a feature.** Performance is part of the craft; heavy media must never
   make the site feel slow.

## 4. Imagery & video — the centrepiece

This is a visual-design portfolio, so **image and video quality is non-negotiable
and arguably the most important surface.**

- **Quality bar:** crisp, high-resolution, colour-consistent. No stretched, low-res,
  or visually clashing assets. Curate ruthlessly.
- **Consistent treatment:** unified corner radius, consistent aspect ratios per
  context, optional subtle border/shadow so media sits on the surface intentionally.
- **Let media be big.** Hero shots and full-bleed moments where the work earns it.
- **Video, used well:** short, muted, auto-looping process/product clips that play
  on hover or in view; always with a poster image; never autoplay with sound;
  respect reduced-motion (show the poster instead).
- **Performance:** lazy-load below the fold, modern formats (WebP/AVIF, MP4/WebM),
  explicit dimensions to prevent layout shift, and a graceful reveal (fade /
  subtle scale-in) once loaded — never a hard pop-in.
- **Roadmap:** a single shared `Media` component (image **and** video) that owns
  loading, format fallback, aspect ratio, reveal animation and reduced-motion —
  replacing today's duplicated image-loaders.

## 5. Motion & interaction philosophy

Motion should feel **engineered, not decorated** — the calm precision of
Linear/Stripe/Apple, not bounce for bounce's sake.

- **Purposeful:** every motion explains a relationship (where something came from,
  what reacted to me).
- **Quick & responsive:** input feedback is near-instant (<100ms); most UI motion
  is 150–300ms. Exits are faster than entrances.
- **Choreographed:** content reveals on scroll with a soft fade + small rise, and
  siblings stagger so sections feel composed, not dumped.
- **Signature interactions:** the glass nav dropdowns, media hover (subtle
  zoom/lift), and smooth light/dark transition are the moments to perfect.
- **Restraint:** no scroll-jacking, no gratuitous parallax, nothing that delays the
  user. When in doubt, less. Full spec in DESIGN_SYSTEM.md → Motion.

## 6. Voice & tone

Confident, concise, human. Plain language about real outcomes ("increased monthly
store revenue 6%"), not buzzwords. Occasional warmth (the "I love you" / availability
touches) — never gimmicky.

## 7. How we'll get there

The glass material system, tokenised foundation (colour, type, spacing, motion),
and the design-system page are in place. Next: a shared media/video component,
component variants (buttons, cards, tags), and richer case-study layouts — all
tracked in DESIGN_SYSTEM.md → Component audit.
