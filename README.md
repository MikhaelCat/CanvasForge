# CanvasForge · Image → Canvas Schematics

> Build pixel art directly in Mindustry — without placing every canvas by hand.

CanvasForge converts PNG and JPG images into ready-to-use Mindustry canvas
schematics. It is a maintained fork of
[the original project](https://github.com/deltanedas/pictocanvas), published at
[MikhaelCat/CanvasForge](https://github.com/MikhaelCat/CanvasForge).

The mod ID is `canvasforge`; the in-game display name is **CanvasForge**.

## ✨ Features

- PNG, JPG and JPEG input
- Optional proportional resizing by canvas width
- Three colour processing modes
- Direct schematic export
- Safe cancellation and invalid-file handling

## Requirements

- Mindustry 7 / client version 159.6 or newer
- [ui-lib](https://github.com/deltanedas/ui-lib)

## 🚀 Usage

1. Open the **Schematics** menu.
2. Click **CanvasForge**.
3. Click **Select Image** and choose a PNG or JPG file.
4. Optionally set the output width in canvases. Set it to `0` to keep the original size.
5. Choose a colour mode/detail option.
6. Click **Export**, then place the generated schematic.

## 🎨 Processing modes

- **No Detail** — direct nearest-colour matching.
- **Simple (Bayer)** — ordered dithering.
- **Complex (Error)** — Floyd–Steinberg error-diffusion dithering.

Large images can take time to process and create many canvas blocks.

## 🔧 Maintained fork changes

- Renamed the in-game mod to **CanvasForge**.
- Fixed the image chooser crash on Mindustry 159.6 desktop clients.
- Added safe handling for cancelled, empty, and invalid image files.
- Added JPEG extension support.
- Added release documentation and changelog.
- The original repository and attribution are preserved; no image-processing
  algorithms were changed.

Originally created by deltanedas, Router and contributors. The original
repository remains credited and linked above; this repository contains the
maintenance changes for current Mindustry desktop clients.

## 📄 License

CanvasForge is released under the **GNU General Public License v3.0 (GPL-3.0)**.
The project is a modified version of GPL-licensed upstream code, so the
copyleft license is retained. See [`COPYING`](COPYING).

Copyright notices and original attribution must be preserved in redistributed
copies and modified versions.
