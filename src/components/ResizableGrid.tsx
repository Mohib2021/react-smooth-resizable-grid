import React from "react";
import { returnGridPercentage } from "../lib/helperFunctions";
import { BaseFieldLayout, ResizableGridProps } from "../lib/interface";

function ResizableGrid<T extends BaseFieldLayout>({
  values,
  isActive,
  previewWidthPx,
  animatedWidth,
  onStartResize,
  Component,
  animationDuration,
  overlayStyles,
  percentageChipStyles,
  showPercentageChip,
  gridColumns,
}: ResizableGridProps<T>) {
  return (
    <div
      className="rcrg-grid"
      style={{
        gridColumn: `span ${values.layout_size || 4}`,
        width: animatedWidth,
        transition: animatedWidth
          ? `width ${animationDuration}ms ease`
          : "none",
      }}
    >
      <Component values={values} />

      {/* Preview overlay while dragging */}
      {isActive && previewWidthPx && (
        <div
          className="rcrg-overlay"
          style={{
            ...overlayStyles,
            width: `${previewWidthPx}px`,
          }}
        />
      )}

      {/* Right handle */}
      <div
        className="rcrg-grid-resize-handle"
        onMouseDown={onStartResize}
      ></div>

      {showPercentageChip && (
        <p style={percentageChipStyles} className="rcrg-percentage">
          {returnGridPercentage(gridColumns, values.layout_size || 4)}
        </p>
      )}
    </div>
  );
}

export default React.memo(ResizableGrid) as typeof ResizableGrid;
