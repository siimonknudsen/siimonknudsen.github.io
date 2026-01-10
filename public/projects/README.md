# Project Content Management

Each project has its own folder with images and a `content.json` file.

## Folder Structure

```
public/projects/
  ├── your-project-id/
  │   ├── content.json       # Project content configuration
  │   ├── hero.jpg           # Hero image (displayed at top)
  │   ├── image1.jpg         # Content images
  │   ├── image2.jpg
  │   └── ...
```

## content.json Structure

The JSON structure follows the order of content on the page:

```json
{
  "title": "Project Title",
  "description": "Project description",
  "client": "Client Name",
  "when": "2024",
  "details": "App",
  "responsibilities": ["UX Design", "UI Design"],
  "heroImage": "hero.jpg",
  "challenge": "Describe the problem or challenge...",
  "solution": "Describe how you solved it...",
  "content": [
    {
      "type": "image",
      "src": "image1.jpg"
    },
    {
      "type": "text",
      "content": "Text content here..."
    },
    {
      "type": "image",
      "src": "image2.jpg"
    }
  ]
}
```

## How to Add/Edit Content

1. **Upload Images**: Drag images into the project folder
2. **Edit Text**: Open `content.json` and edit the `challenge`, `solution`, or text blocks
3. **Reorder Content**: Change the order of items in the `content` array
4. **Add Content Blocks**: Add new objects to the `content` array:
   - `{ "type": "image", "src": "filename.jpg" }` for images
   - `{ "type": "text", "content": "Your text here" }` for text

## Tips

- Image filenames in `content.json` should match the actual files in the folder
- The `heroImage` is displayed as the large image after the metadata
- Content blocks are rendered in the order they appear in the array
- You can mix images and text blocks in any order

