# react-smooth-resizable-grid

[![Coverage Report](https://codecov.io/gh/Mohib2021/react-smooth-resizable-grid/branch/main/graph/badge.svg)](https://codecov.io/gh/Mohib2021/react-smooth-resizable-grid)

A lightweight, flexible, and **smoothly animated resizable grid layout** component for React applications.  
This package allows developers to visually resize grid items using drag gestures and dynamically updates each item's layout size. It is perfect for dashboard builders, form designers, or any UI requiring flexible grid structures.

---

## ✨ Introduction

`react-smooth-resizable-grid` provides a plug-and-play **ResizableGrids** component that takes an array of objects and renders them inside a responsive CSS grid. Each grid item can be resized by dragging the right edge, and the updated layout size (`layout_size`) is returned back to the parent through the `onResize` callback.

You can fully customize the internal UI by passing your own React component — the library only manages layout + resizing logic while giving you complete freedom on design.

---

## 🚀 Features

- 🔧 Resize grid items smoothly with animations
- 🧩 Fully controlled component
- 🎨 Highly customizable styles
- 📦 Framework-agnostic React component
- ⚡ Smooth transitions powered by CSS animations
- 📐 Dynamic `layout_size` updates returned on every resize

---

## 📦 Installation

```bash
npm install react-smooth-resizable-grid
# or
yarn add react-smooth-resizable-grid
```

## 📘 Usage Example

Below is a complete working example that you can copy & paste directly into your React application:

```
import { useState } from "react";
import { ResizableGrids } from "react-smooth-resizable-grid";

export default function App() {
  const [fields, setFields] = useState([
    { id: 1, title: "Name" },
    { id: 2, title: "Email" },
    { id: 3, title: "Phone" },
    { id: 4, title: "Address" },
  ]);

  return (
    <div style={{ padding: 24 }}>
      <ResizableGrids
        data={fields}
        onResize={(updatedData) => setFields(updatedData)}
        gridColumns={4}
        gridGap={16}
        animationDuration={800}
        showPercentageChip={true}
        component={({ values }) => (
          <div
            style={{
              background: "#f7f7f7",
              padding: 16,
              borderRadius: 8,
              border: "1px solid #ddd",
            }}
          >
            <h4 style={{ margin: 0 }}>{values.title}</h4>
            <p style={{ margin: "4px 0 0 0", fontSize: 13, color: "#666" }}>
              Span: {values.layout_size || 1}
            </p>
          </div>
        )}
      />
    </div>
  );
}
```

## 📚 Props Reference

| Prop Name                | Type             | Default Value | Required | Description                                                       | Example                                  |
| ------------------------ | ---------------- | ------------- | -------- | ----------------------------------------------------------------- | ---------------------------------------- |
| **data**                 | array of objects | —             | ✔️ Yes   | List of items. Each item must include a unique `id`.              | `[{ id: 1, name: "Field A" }]`           |
| **onResize**             | function         | —             | ✔️ Yes   | Callback that returns updated `data` with new `layout_size`.      | `(updatedData) => setState(updatedData)` |
| **component**            | JSX Component    | —             | ✔️ Yes   | Component to render for each grid item. Receives a `values` prop. | `({ values }) => <MyCard {...values} />` |
| **gridColumns**          | number           | `4`           | ❌ No    | Number of grid columns.                                           | `6`                                      |
| **gridGap**              | number           | `16`          | ❌ No    | Gap between grid items in pixels.                                 | `12`                                     |
| **animationDuration**    | number           | `1000`        | ❌ No    | Resize animation duration in ms.                                  | `500`                                    |
| **containerStyles**      | object           | `{}`          | ❌ No    | Custom CSS for main container.                                    | `{ background: "#fff" }`                 |
| **overlayStyles**        | object           | `{}`          | ❌ No    | Custom CSS for overlay shown while resizing.                      | `{ background: "rgba(0,0,0,0.1)" }`      |
| **percentageChipStyles** | object           | `{}`          | ❌ No    | CSS for the percentage chip indicator.                            | `{ color: "red" }`                       |
| **showPercentageChip**   | boolean          | `false`       | ❌ No    | Whether to show a small chip showing the width percentage.        | `true`                                   |

## 🧠 How It Works

Each item in data is rendered inside the grid.
When the user resizes an item:

- The width span (1 → gridColumns) is calculated
- The item gets an extra property: layout_size
- The library returns the updated list through onResize()

Example of returned object:

```
{
  "id": 1,
  "title": "Email",
  "layout_size": 3
}
```

## 🔥 Best Practices

- Always store data in state to apply updates properly
- Use layout_size in your UI to show width or apply styling
- Keep id unique to avoid rendering inconsistencies
- Wrap the grid with padding for a cleaner appearance

## 🏁 Conclusion

`react-smooth-resizable-grid` helps you build dynamic, interactive, and visually appealing grid-based layouts with ease.
It is customizable, developer-friendly, and works seamlessly with any React project.

If you enjoy this package, consider ⭐ starring the project on GitHub!
