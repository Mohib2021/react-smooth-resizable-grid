export interface BaseFieldLayout {
  id: string | number;
  layout_size?: number;
}

export interface ResizableGridProps<T extends BaseFieldLayout> {
  values: T;
  isActive: boolean;
  previewWidthPx?: number;
  animatedWidth?: string;
  onStartResize: (e: React.MouseEvent<HTMLDivElement>) => void;
  Component: React.ComponentType<{ values: T }>;
  animationDuration?: number;
  overlayStyles?: React.CSSProperties;
  percentageChipStyles?: React.CSSProperties;
  showPercentageChip?: boolean;
  gridColumns: number;
}

export interface ResizableGridsProps<T extends BaseFieldLayout> {
  data: T[];
  onResize: (data: T[]) => void;
  component: React.ComponentType<{ values: T }>;
  containerStyles?: React.CSSProperties;
  overlayStyles?: React.CSSProperties;
  percentageChipStyles?: React.CSSProperties;
  showPercentageChip?: boolean;
  gridColumns?: number;
  gridGap?: number;
  animationDuration?: number;
}
