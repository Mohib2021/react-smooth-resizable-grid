import React, { useCallback, useEffect, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";

import { returnGridSpan, returnLayoutSize } from "../lib/helperFunctions";
import ResizableGrid from "./ResizableGrid";
import { BaseFieldLayout, ResizableGridsProps } from "../lib/interface";

const GRID_COLUMNS = 4;
const GRID_GAP = 16;
const ANIMATION_DURATION = 1000;

function ResizableGrids<T extends BaseFieldLayout>({
  data,
  onResize,
  component,
  gridColumns = GRID_COLUMNS,
  gridGap = GRID_GAP,
  animationDuration = ANIMATION_DURATION,
  containerStyles,
  overlayStyles,
  percentageChipStyles,
  showPercentageChip,
}: ResizableGridsProps<T>) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [resizingFieldKey, setResizingFieldKey] = useState<
    string | number | null
  >(null);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartWidth, setDragStartWidth] = useState(0);
  const [previewWidths, setPreviewWidths] = useState<
    Record<string | number, number>
  >({});
  const [animatedWidths, setAnimatedWidths] = useState<
    Record<string | number, string>
  >({});
  const [resizeFieldIndex, setResizeFieldIndex] = useState<number | null>(null);

  const getColWidth = useCallback((): number => {
    const parentWidth = containerRef.current?.offsetWidth as number;
    return parentWidth / gridColumns;
  }, [gridColumns]);

  // -----------------------------
  // Mouse Move & Mouse Up
  // -----------------------------
  useEffect(() => {
    const onMove = (e: ReactMouseEvent | globalThis.MouseEvent) => {
      if (!resizingFieldKey) return;

      const delta = e.clientX - dragStartX;
      const parentWidth = containerRef.current?.offsetWidth as number;
      let newWidth = dragStartWidth + delta;

      newWidth = Math.max(newWidth, parentWidth / gridColumns / 1.5);
      newWidth = Math.min(newWidth, parentWidth);

      setPreviewWidths({ [resizingFieldKey]: newWidth });
    };

    const onUp = () => {
      if (resizingFieldKey == null || resizeFieldIndex === null) return;

      const parentWidth = containerRef.current?.offsetWidth as number;
      const colWidth = getColWidth();
      const previewWidthInPx = previewWidths[resizingFieldKey];
      const fieldWidthInPercentage = (previewWidthInPx / parentWidth) * 100;

      const newSpan = returnGridSpan(fieldWidthInPercentage, gridColumns);
      const targetWidth =
        colWidth * newSpan - (gridGap * (newSpan - 1)) / newSpan;

      const field = data[resizeFieldIndex];
      const layoutSize = returnLayoutSize(field?.layout_size, gridColumns);
      const startWidth =
        colWidth * layoutSize - (gridGap * (newSpan - 1)) / newSpan;

      setAnimatedWidths({ [resizingFieldKey]: `${startWidth}px` });

      requestAnimationFrame(() => {
        setAnimatedWidths({ [resizingFieldKey]: `${targetWidth}px` });
      });

      setTimeout(() => {
        const prevFields = [...data];
        prevFields[resizeFieldIndex] = {
          ...prevFields[resizeFieldIndex],
          layout_size: newSpan,
        };
        onResize(prevFields);
        setAnimatedWidths({});
      }, animationDuration);

      setResizingFieldKey(null);
      setPreviewWidths({});
      setDragStartX(0);
      setDragStartWidth(0);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [
    resizingFieldKey,
    dragStartX,
    dragStartWidth,
    previewWidths,
    data,
    resizeFieldIndex,
    getColWidth,
    onResize,
    animationDuration,
    gridColumns,
  ]);

  // -----------------------------
  // Start resize handler
  // -----------------------------
  const handleStartResize = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, field: T, index: number) => {
      const el = e.currentTarget.parentElement as HTMLElement;
      // if (!el) return;

      setResizingFieldKey(field.id);
      setDragStartX(e.clientX);
      setDragStartWidth(el.offsetWidth);
      setPreviewWidths({ [field.id]: el.offsetWidth });
      setResizeFieldIndex(index);

      e.preventDefault();
      e.stopPropagation();
    },
    []
  );

  return (
    <div
      style={{
        ...containerStyles,
        gridGap: gridGap,
        gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
      }}
      ref={containerRef}
      className="rcrg-container"
    >
      {data.map((values, index) => (
        <ResizableGrid
          key={values.id}
          values={values}
          isActive={resizingFieldKey === values.id}
          previewWidthPx={previewWidths[values.id]}
          animatedWidth={animatedWidths[values.id]}
          onStartResize={(e) => handleStartResize(e, values, index)}
          Component={component}
          animationDuration={animationDuration}
          overlayStyles={overlayStyles}
          percentageChipStyles={percentageChipStyles}
          showPercentageChip={showPercentageChip}
          gridColumns={gridColumns}
        />
      ))}
    </div>
  );
}

export default ResizableGrids;
