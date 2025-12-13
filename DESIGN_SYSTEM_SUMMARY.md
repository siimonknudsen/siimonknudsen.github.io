# Design System Tokens Summary

## Color Tokens

### Primary Colors
- **Black (`bg-black`, `text-black`)**
  - Usage: 2 places
  - Primary background (App container, Footer)
  - Button text (PrimaryButton)

- **White (`bg-white`, `text-white`)**
  - Usage: 8+ places
  - Primary text on dark backgrounds
  - Button backgrounds (PrimaryButton)
  - Logo backgrounds (TestimonialCard)
  - Headers and primary text throughout

### Neutral Grays

- **Neutral-400 (`text-neutral-400`)**
  - Usage: 25+ places
  - Secondary text (most common)
  - Footer links (14 instances)
  - Header navigation inactive links (3 instances)
  - Location component
  - Avatar title text
  - Copyright text

- **Neutral-700 (`bg-neutral-700`)**
  - Usage: 5 places
  - Avatar inner backgrounds
  - Project card image placeholders
  - Testimonial logo placeholders

- **Neutral-800 (`bg-neutral-800`, `border-neutral-800`)**
  - Usage: 6 places
  - Avatar outer backgrounds
  - Header border
  - Footer border
  - Button hover states (SecondaryButton)

- **Neutral-900 (`bg-neutral-900`)**
  - Usage: 12+ places
  - Card backgrounds (TestimonialCard, ProjectTag)
  - Active navigation state (header)
  - Button backgrounds (SecondaryButton)
  - Navigation hover states

- **Neutral-300 (`text-neutral-300`)**
  - Usage: 3 places
  - Project descriptions
  - Testimonial body text
  - Project tags

- **Neutral-200 (`bg-neutral-200`)**
  - Usage: 1 place
  - Testimonial logo placeholder fallback

### Accent Colors

- **Green-400 (`bg-green-400`)**
  - Usage: 2 places
  - Status indicator dot (Location component, used in header and footer)

## Typography Tokens

### Font Family
- **Inter** - Applied globally via Tailwind config

### Font Weights

- **400 (font-normal)**
  - Usage: 40+ places
  - All body text
  - Footer links (14 instances)
  - Header navigation (4 instances)
  - Avatar components
  - Location component
  - Project descriptions
  - Testimonial body text
  - Copyright text

- **500 (font-medium)**
  - Usage: 8 places
  - Headers (ProjectCard titles, TestimonialCard names)
  - Buttons (PrimaryButton, SecondaryButton)
  - Project tags
  - Hero section name

### Font Sizes

- **12px (`text-xs`)**
  - Usage: 2 places
  - Copyright text
  - Location component

- **13px (`text-[13px]`)**
  - Usage: 3 places
  - Avatar title (small size)
  - Location component
  - Header "Product Designer" text

- **14px (`text-sm`)**
  - Usage: 20+ places
  - Footer links (14 instances)
  - Header navigation links (4 instances)
  - Buttons (2 instances)
  - Footer headers (3 instances)
  - Project tags
  - Chips

- **15px (`text-[15px]`)**
  - Usage: 2 places
  - Avatar name (small size)
  - Header "Simon Knudsen" text

- **16px (`text-base`, `text-[16px]`)**
  - Usage: 8 places
  - Project descriptions
  - Testimonial body text
  - Testimonial title/company
  - Avatar title (footer)

- **18px (`text-[18px]`)**
  - Usage: 4 places
  - Project card titles
  - Testimonial recommender names
  - Footer avatar name

- **24px (`text-2xl`)**
  - Usage: 1 place
  - Hero section name

- **48px (`text-5xl`)**
  - Usage: 2 places
  - Hero section description
  - Testimonials section heading

### Line Heights

- **100% (`leading-none`)**
  - Usage: 30+ places
  - Default for most text
  - Headers
  - Body text (default)

- **120% (`leading-[1.2]`)**
  - Usage: 1 place
  - Project descriptions

- **130% (`leading-[1.3]`)**
  - Usage: 2 places
  - Header avatar name/title (legacy, should be updated)

- **160% (`leading-[1.6]`)**
  - Usage: 1 place
  - Testimonial body text

## Component Usage Summary

### Components Using Design Tokens

1. **Header** - Uses: black background, white text, neutral-400 for inactive links, neutral-900 for active state
2. **Footer** - Uses: black background, white text, neutral-400 for all links, neutral-900 for card backgrounds
3. **ProjectCard** - Uses: neutral-700 for images, neutral-300 for text, 18px headers, 16px body
4. **TestimonialCard** - Uses: neutral-900 background, white text, 18px headers, 16px body
5. **PrimaryButton** - Uses: white background, black text, 14px, font-medium
6. **SecondaryButton** - Uses: neutral-900 background, white text, 14px, font-medium
7. **ProjectTag** - Uses: neutral-900 background, neutral-300 text, 14px, font-medium
8. **Avatar** - Uses: neutral-800/700 backgrounds, white/neutral-400 text
9. **Location** - Uses: green-400 dot, neutral-400 text, 13px

## Token Consistency Issues

1. **Header Avatar** - Still uses old inline code instead of Avatar component (should be updated)
2. **Line Height Inconsistency** - Header avatar uses `leading-[1.3]` while Avatar component uses `leading-none`
3. **Font Size Variations** - Some custom sizes (11px, 13px, 15px) used in Avatar component that aren't in main typography scale

## Recommendations

1. Update header to use Avatar component for consistency
2. Standardize all line-heights to use design tokens
3. Document all custom font sizes in typography system
4. Consider creating CSS custom properties for frequently used tokens

