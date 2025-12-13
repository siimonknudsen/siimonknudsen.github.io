# Design Tokens

## Colors

### Surface Colors
- **Surface Primary**: `bg-surface-primary` (#000000) - Main background (black)
- **Surface Secondary**: `bg-surface-secondary` (#171717) - Secondary backgrounds
- **Surface Tertiary**: `bg-surface-tertiary` (#262626) - Card backgrounds, chips, nav buttons

### Text Colors
- **Text Primary**: `text-text-primary` (#ffffff) - Primary text (white)
- **Text Secondary**: `text-text-secondary` (#a3a3a3) - Secondary text (neutral-400)
- **Text Tertiary**: `text-text-tertiary` (#d4d4d4) - Tertiary text (neutral-300)

### Neutral Grays (0-900)
- **Neutral-0**: `#ffffff` - White
- **Neutral-50-900**: Full scale from light to dark
- **Neutral-400**: `text-neutral-400` - Secondary text, inactive states
- **Neutral-700**: `bg-neutral-700` - Placeholder backgrounds, image placeholders
- **Neutral-800**: `bg-neutral-800` - Borders
- **Neutral-900**: `bg-neutral-900` - Dark backgrounds

### Accent Colors
- **Green-400**: `bg-green-400` - Status indicator dot

### Usage Guidelines
- **Backgrounds**: 
  - Main: `bg-surface-primary` (black)
  - Cards/Components: `bg-surface-tertiary`
- **Text**:
  - Primary: `text-text-primary` (white)
  - Secondary: `text-text-secondary` (neutral-400)
  - Tertiary: `text-text-tertiary` (neutral-300)
- **Components**:
  - Testimonial cards: `bg-surface-tertiary`
  - Chips/Tags: `bg-surface-tertiary`
  - Nav buttons (active/hover): `bg-surface-tertiary`
- **Borders**: `border-neutral-800`

## Typography

See `TYPOGRAPHY.md` for detailed typography guidelines.

## Spacing

### Padding
- **Section padding**: 24px (`p-6`)
- **Component padding**: 24px (`p-6`)
- **Button padding**: 8px top/bottom, 12px sides (`py-2 px-3`)

### Gaps
- **Project grid**: 24px column gap, 48px row gap (`gap-x-6 gap-y-12`)
- **Testimonial grid**: 24px gap (`gap-6`)
- **Component gaps**: 4px (`gap-1`), 16px (`gap-4`), 24px (`gap-6`)

## Components

### Buttons
- **Primary**: White background, black text
- **Secondary**: Neutral-900 background, white text
- **Size**: 14px font, 500 weight
- **Padding**: 8px top/bottom, 12px sides

### Cards
- **Background**: Neutral-900
- **Padding**: 24px (`p-6`)
- **Border radius**: Rounded-lg

### Links
- **Default**: Neutral-400 text
- **Hover**: White text
- **Active**: White text with neutral-900 background

