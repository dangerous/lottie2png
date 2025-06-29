# Lottie Static Image Renderer (POC)

This is a proof-of-concept tool to convert [Lottie](https://airbnb.io/lottie/#/) JSON animations into static PNG images and SVG files using Node.js and Puppeteer.

---

## 📦 Setup Instructions

### 1. Unzip and Enter the Folder

```bash
unzip lottie-poc.zip
cd lottie-poc
```

### 2. Install Dependencies

Make sure [Node.js](https://nodejs.org/) is installed (v16+ recommended). Then run:

```bash
npm install
```

This will install Puppeteer and download a headless version of Chromium.

---

## 🖼️ Render a Lottie File to PNG and SVG

### 1. Add Your Lottie JSON Files

Place your `.json` animation files inside the `lotties/` folder.

### 2. Run the Renderer

```bash
node render.js lotties/your-animation.json
```

PNG and SVG files will be created in the `output/` folder with the same filename.

---

## ⚙️ Customization

- **Output Size**: Adjust the width/height in `render.html` (default is `512x512`).
- **Rendered Frame**: By default, the **first frame** is captured.

---

## 🧪 Example

```bash
node render.js lotties/open-doodles-reading-side.json
```

Creates:

```
output/open-doodles-reading-side.png
output/open-doodles-reading-side.svg
```

---

## 🧹 Folder Structure

```
lottie-poc/
├── lotties/            # Place your Lottie JSON files here
├── output/             # PNGs and SVGs will be saved here
├── node_modules/       # Installed dependencies (after `npm install`)
├── package.json        # Defines project metadata and dependencies
├── package-lock.json   # Locks exact versions for reproducible installs
├── render.html         # HTML renderer using lottie-web
├── render.js           # Node.js script using Puppeteer
└── README.md           # This file
```

---

Created as a quick proof of concept — enjoy!
