import { render, fireEvent, screen, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ResizableGrids from "../components/ResizableGrids";
import { TestComponent } from "./setup/TestComponent";

import "./setup/domMock";
import { mockRAF } from "./setup/resizeMock";

const sampleData = [
  { id: "1", label: "Field 1", layout_size: 2 },
  { id: "2", label: "Field 2", layout_size: 1 },
];

function setup(props: any = {}) {
  return render(
    <ResizableGrids
      data={sampleData}
      component={TestComponent}
      onResize={vi.fn()}
      {...props}
    />
  );
}

describe("ResizableGrids", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it("renders all grid items", () => {
    setup();
    expect(screen.getByTestId("field-1")).toBeInTheDocument();
    expect(screen.getByTestId("field-2")).toBeInTheDocument();
  });

  it("starts resize on mousedown and shows overlay", () => {
    setup();

    const handle = document.querySelectorAll(".rcrg-grid-resize-handle")[0];
    fireEvent.mouseDown(handle, { clientX: 100 });

    const overlay = document.querySelector(".rcrg-overlay");
    expect(overlay).toBeInTheDocument();
  });

  it("updates preview width on mousemove", () => {
    setup();

    const handle = document.querySelectorAll(".rcrg-grid-resize-handle")[0];
    fireEvent.mouseDown(handle, { clientX: 100 });
    fireEvent.mouseMove(window, { clientX: 300 });

    const overlay = document.querySelector<HTMLElement>(".rcrg-overlay")!;
    expect(parseInt(overlay.style.width)).toBeGreaterThan(200);
  });

  it("calls onResize on mouseup and updates layout_size", () => {
    const onResize = vi.fn();
    setup({ onResize });

    const handle = document.querySelectorAll(".rcrg-grid-resize-handle")[0];

    fireEvent.mouseDown(handle, { clientX: 100 });
    fireEvent.mouseMove(window, { clientX: 450 });
    fireEvent.mouseUp(window);

    vi.runAllTimers();

    expect(onResize).toHaveBeenCalledTimes(1);

    const updated = onResize.mock.calls[0][0];
    console.log(updated, "updated");
    expect(updated[0].layout_size).toBeGreaterThan(2);
  });

  it("applies animated widths using requestAnimationFrame", () => {
    const raf = mockRAF();
    setup();

    const handle = document.querySelectorAll(".rcrg-grid-resize-handle")[0];
    fireEvent.mouseDown(handle, { clientX: 100 });
    fireEvent.mouseUp(window);

    raf.flush();
    vi.runAllTimers();

    const grid = document.querySelector<HTMLElement>(".rcrg-grid");
    expect(grid!.style.transition.includes("width")).toBe(true);
  });

  it("shows percentage chip when enabled", () => {
    setup({ showPercentageChip: true });

    const chips = document.querySelectorAll(".rcrg-percentage");
    expect(chips.length).toBe(2);
  });

  it("hides percentage chip when disabled", () => {
    setup({ showPercentageChip: false });

    const chips = document.querySelectorAll(".rcrg-percentage");
    expect(chips.length).toBe(0);
  });

  it("applies custom container styles", () => {
    setup({ containerStyles: { background: "pink" } });

    const container = document.querySelector<HTMLElement>(".rcrg-container");
    expect(container!.style.background).toBe("pink");
  });
});

it("executes full resize cycle (mousemove → mouseup → rAF → timeout)", () => {
  const onResize = vi.fn();
  setup({ onResize });

  const handle = document.querySelectorAll(".rcrg-grid-resize-handle")[0];

  act(() => {
    fireEvent.mouseDown(handle, { clientX: 100 });
    fireEvent.mouseMove(window, { clientX: 400 });
  });

  // mouseup must be inside act
  act(() => {
    fireEvent.mouseUp(window);
    vi.runAllTimers();
  });

  expect(onResize).toHaveBeenCalled();
});

it("ignores mousemove when not resizing", () => {
  setup();
  act(() => fireEvent.mouseMove(window, { clientX: 300 }));
  // Expect NO overlay to appear
  expect(document.querySelector(".rcrg-overlay")).toBeNull();
});

it("clamps width to minimum value", () => {
  setup();
  const handle = document.querySelectorAll(".rcrg-grid-resize-handle")[0];

  act(() => {
    fireEvent.mouseDown(handle, { clientX: 200 });
    fireEvent.mouseMove(window, { clientX: -999 }); // force small width
  });

  const overlay = document.querySelector(".rcrg-overlay") as HTMLElement;
  expect(parseInt(overlay.style.width)).toBeGreaterThan(10); // min clamp
});

it("clamps width to max parent width", () => {
  setup();
  const handle = document.querySelectorAll(".rcrg-grid-resize-handle")[0];

  act(() => {
    fireEvent.mouseDown(handle, { clientX: 50 });
    fireEvent.mouseMove(window, { clientX: 9999 }); // huge width
  });

  const overlay = document.querySelector(".rcrg-overlay") as HTMLElement;
  const parent = document.querySelector(".rcrg-container") as HTMLElement;
  const parentWidth = parent!.offsetWidth;
  expect(parseInt(overlay.style.width)).toBeLessThanOrEqual(parentWidth);
});
