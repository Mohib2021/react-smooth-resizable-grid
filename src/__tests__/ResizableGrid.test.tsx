import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TestComponent } from "./setup/TestComponent";
import ResizableGrid from "../components/ResizableGrid";

describe("ResizableGrid", () => {
  it("renders child component", () => {
    const { getByTestId, container, getByText } = render(
      <ResizableGrid
        values={{ id: 1, layout_size: 1, label: "Field 1" }}
        Component={TestComponent}
        gridColumns={4}
        isActive={false}
        onStartResize={() => {}}
        animatedWidth="200"
        animationDuration={300}
        showPercentageChip={true}
      />
    );
    console.log(container.innerHTML);
    const grid = container.querySelector(".rcrg-grid") as HTMLElement;
    expect(grid.style.gridColumn).toBe("span 1");
    expect(getByText("25")).toBeInTheDocument();
    expect(getByTestId("field-1")).toBeInTheDocument();
  });

  it("shows overlay when active", () => {
    const { container, getByText } = render(
      <ResizableGrid
        values={{ id: 1, label: "Field 1" }}
        isActive={true}
        previewWidthPx={150}
        Component={TestComponent}
        gridColumns={4}
        onStartResize={() => {}}
        showPercentageChip={true}
      />
    );
    const grid = container.querySelector(".rcrg-grid") as HTMLElement;
    expect(grid.style.gridColumn).toBe("span 4");
    expect(getByText("100")).toBeInTheDocument();
    expect(container.querySelector(".rcrg-overlay")).toBeInTheDocument();
  });

  it("shows percentage chip", () => {
    const { container } = render(
      <ResizableGrid
        values={{ id: 1, layout_size: 2, label: "Field 1" }}
        showPercentageChip={true}
        Component={TestComponent}
        gridColumns={4}
        onStartResize={() => {}}
        isActive={false}
      />
    );

    expect(container.querySelector(".rcrg-percentage")).toBeInTheDocument();
  });

  it("hides percentage chip", () => {
    const { container } = render(
      <ResizableGrid
        values={{ id: 1, layout_size: 2, label: "Field 1" }}
        showPercentageChip={false}
        Component={TestComponent}
        gridColumns={4}
        isActive={false}
        onStartResize={() => {}}
      />
    );

    expect(container.querySelector(".rcrg-percentage")).toBeNull();
  });
});
