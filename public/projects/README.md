# Project Content Management

Each project has its own folder with a `content.json` file and an `images/` subfolder.

## Folder Structure

```
public/projects/
  ├── your-project-id/
  │   ├── content.json           # Project content configuration
  │   └── images/
  │       ├── hero.jpg/png/webp  # Hero image (any format)
  │       ├── image1.jpg/png/webp
  │       ├── image2.jpg/png/webp
  │       ├── ...up to image10
  │       ├── app1.jpg/png/webp  # App screens (for app projects)
  │       ├── app2.jpg/png/webp
  │       └── ...up to app10
```

## Naming Convention

| Image Type | Filename | Supported Formats |
|------------|----------|-------------------|
| **Hero Image** | `hero` | `.jpg`, `.jpeg`, `.png`, `.webp` |
| **Content Images** | `image1` - `image10` | `.jpg`, `.jpeg`, `.png`, `.webp` |
| **App Screens** | `app1` - `app10` | `.jpg`, `.jpeg`, `.png`, `.webp` |

**Flexible formats:** The system automatically detects the format—just name your files correctly with any supported extension.

## Auto-Hide Missing Images

- All image slots support up to **10 images**
- **Only upload the images you need**—missing images are automatically hidden
- Empty slots will be invisible

## content.json Structure

### Standard Project (Website/Dashboard)

```json
{
  "title": "Project Title",
  "description": "Project description",
  "client": "Client Name",
  "when": "2024",
  "details": "Website",
  "responsibilities": ["UX Design", "UI Design"],
  "heroImage": "images/hero.jpg",
  "challenge": "Describe the problem or challenge...",
  "solution": "Describe how you solved it...",
  "content": [
    { "type": "image", "src": "images/image1.jpg" },
    { "type": "image", "src": "images/image2.jpg" },
    ...up to image10
  ]
}
```

### App Project (with App Screens section)

```json
{
  "title": "App Name",
  "description": "App description",
  "client": "Client Name",
  "when": "2024",
  "details": "App",
  "responsibilities": ["UX Design", "UI Design"],
  "heroImage": "images/hero.jpg",
  "challenge": "Describe the problem or challenge...",
  "solution": "Describe how you solved it...",
  "content": [
    { "type": "image", "src": "images/image1.jpg" },
    { "type": "image", "src": "images/image2.jpg" },
    ...up to image10
  ],
  "appScreens": [
    { "src": "images/app1.jpg" },
    { "src": "images/app2.jpg" },
    { "src": "images/app3.jpg" },
    ...up to app10
  ]
}
```

## App Screens Section

For app projects, you can add an **App Screens** section that displays iPhone mockup-style images in a responsive grid:

| Screen Size | Columns |
|-------------|---------|
| Mobile | 1 |
| Tablet | 2 |
| Desktop | 3 |

**To enable App Screens:**
1. Add the `appScreens` array to your `content.json`
2. Upload images named `app1`, `app2`, `app3`, etc. to the `images/` folder
3. The section automatically appears if any app screen images exist

## How to Add Images

1. **Hero Image**: Name your hero image `hero.jpg`, `hero.png`, or `hero.webp`
2. **Content Images**: Name your images `image1.png`, `image2.webp`, etc.
3. **App Screens**: Name your app mockups `app1.jpg`, `app2.png`, etc.
4. Drop all images into the project's `images/` folder
5. Images display in numerical order (1, 2, 3...)

## Example: App Project

```
public/projects/zliide-app/
  ├── content.json
  └── images/
      ├── hero.jpg           ✅ Hero image
      ├── image1.png         ✅ Content image 1
      ├── image2.png         ✅ Content image 2
      ├── app1.png           ✅ App screen 1
      ├── app2.png           ✅ App screen 2
      ├── app3.png           ✅ App screen 3
      └── (app4-10 not uploaded = hidden automatically)
```
