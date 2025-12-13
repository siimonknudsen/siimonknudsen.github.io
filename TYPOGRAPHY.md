# Typography Design System

## Font Family
- **Primary**: Inter
- Applied globally via Tailwind config

## Font Weights
- **400 (font-normal)**: Body text, descriptions, secondary content
- **500 (font-medium)**: Headers, buttons, emphasized text

## Typography Scale

### Headers
- **Size**: 18px
- **Weight**: 500 (font-medium)
- **Line Height**: 100% (leading-none)
- **Usage**: Project titles, testimonial names, section headers

### Body Text
- **Size**: 16px
- **Weight**: 400 (font-normal)
- **Line Height**: 100% (leading-none) - default, can be adjusted per component
- **Usage**: Project descriptions, testimonial text, general content

### Buttons
- **Size**: 14px
- **Weight**: 500 (font-medium)
- **Usage**: All button components

### Special Cases
- **Testimonial Body Text**: 13px, 160% line-height (leading-[1.6])
- **Hero Section**: Custom sizes (24px name, 48px description)

## Guidelines
1. Headers and buttons use font-weight 500
2. Body text uses font-weight 400
3. Default line-height is 100% unless specified otherwise
4. Use custom pixel values (text-[15px], text-[13px]) for precise control

