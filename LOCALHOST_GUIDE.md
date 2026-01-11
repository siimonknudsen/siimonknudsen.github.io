# 🚀 Quick Start Guide: Running Your Portfolio Locally

A simple guide to get your portfolio running on localhost so you can see your changes live.

---

## One-Time Setup (only do this once)

### 1. Open Terminal
Press `Cmd + Space`, type **Terminal**, and hit Enter

### 2. Navigate to your project folder
```bash
cd ~/Desktop/Privat/portfolio
```

### 3. Install dependencies
```bash
npm install
```
Wait for it to finish (might take a minute or two the first time).

---

## Start the Development Server (do this every time)

### 1. Open Terminal and navigate to your project
```bash
cd ~/Desktop/Privat/portfolio
```

### 2. Start the server
```bash
npm run dev
```

### 3. View your site
After running the command, you'll see something like:
```
VITE v7.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

**Click that link** or copy `http://localhost:5173/` into your browser.

---

## ✨ The Magic Part

Once the server is running:
- Make any edit to your files in Cursor
- **Save the file** (`Cmd + S`)
- Your browser will **automatically refresh** with your changes!

---

## To Stop the Server

When you're done, go back to Terminal and press `Ctrl + C`

---

## Quick Reference Cheat Sheet

| What you want        | Command         |
|----------------------|-----------------|
| Start dev server     | `npm run dev`   |
| Stop server          | `Ctrl + C`      |
| Build for production | `npm run build` |
