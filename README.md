<div align="center">
<h2>Nautilus</h2>
  <p>
    After Effects scripts to quickly create Japanese-like text animations
    <br />
  </p>
    <br />
    <img src="https://img.shields.io/badge/Status-Under%20Development-green?style=for-the-badge">
    <img src="https://img.shields.io/badge/License-MIT%20License-blue?style=for-the-badge">
    <img src="https://img.shields.io/badge/Build%20with-Extendscripts-yellow?style=for-the-badge">
    <br />
    <br />
    <br />
    <img src="https://github.com/user-attachments/assets/f16cc843-07da-48ff-95a9-58d222e093d5">
</div>


## 🌟 Overview

Nautilus is a script for creating Japanese-like text animation. It's very similar to TextEvo, but more flexible. Animation keyframes are separated based on transforms, rather than combined into a single strength property.

## 🚀 Getting Started

### 📦 Installation

1. Go to [Releases](https://github.com/Kuredew/nautilus/releases/latest), download **Nautilus.zip** from assets
2. Extract the file, and open the **dist** folder
3. Copy **Nautilus.jsxbin** and **nautilusAssets** folder to 

```
C:\Program Files\Adobe\Adobe After Effects (your version)\Support Files\Scripts\ScriptUI Panels
```

### 💻 Usage

First, Open the script from **Window > Nautilus.jsxbin** and dock the panel to where you want.


#### Apply Nautilus

##### Text Layer

1. Create text layer in the composition, and select it
2. Click **Apply (Text)** button on the script.
3. Nautilus should applied on the **Text Layer** you select

##### Comp / preComp Layer

This is to use Nautilus on layers other than text, such as shapes, images, and solids.

1. **PreComp** several layers that you want to apply nautilus to, and select it.
2. Click **Apply (Layer)** button on the script.
3. Nautilus should applied on the **PreComp** you select

---

Note that the **Apply (layer)** button can only be applied to **Comp/Precomp** layers. If you don't want to precomp the layers you want to apply nautilus to, check **Legacy Mode** and then **select the layers** and click the **Apply (layer)** button. This feature was intentionally moved to Legacy Mode (deprecated) because the animation didn't work properly and made the composition too heavy.

#### Layer follow Mask Point

1. Click **Pen Tool** in After Effect
2. Select the **applied Nautilus layer** and create **Mask** with **Pen Tool**
3. The layer position should follow the mask points according to the layer order (the same goes for text)

You can rotate and scale the layer by moving and scale the angle points.

#### Animate with Nautilus

Coming soon

## 🚥 Roadmap

| Milestone | Status | Version
| :--- | :--- | :--- 
| Text Layer Support | ✅ | 1.4.0
| Vertical & Horizontal ScriptUI | ❎ | -
| 3D Text Layer Support | ❎ | -
| Variable Font Animate Support | ❎ | -

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
