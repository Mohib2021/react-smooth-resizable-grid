interface PercentageItem {
  percent: number;
  span: number;
}
export const returnOnlyPercentageList = (colCount: number): number[] => {
  const percentagePerGrid = 100 / colCount;
  const colPercentages = [];

  for (let index = colCount; index >= 1; index--) {
    const percentage = percentagePerGrid * index - percentagePerGrid;
    colPercentages.push(percentage);
  }

  return colPercentages;
};
export const returnPercentageList = (colCount: number): PercentageItem[] => {
  const colPercentages = returnOnlyPercentageList(colCount);

  return colPercentages.map(
    (percent, index): PercentageItem => ({
      percent,
      span: colCount - index,
    })
  );
};

export const returnGridSpan = (
  fieldWidthInPercentage: number,
  gridColumn: number
): number => {
  const percentageLists = returnPercentageList(gridColumn);

  const foundSpan = percentageLists.find(
    (percentage) => fieldWidthInPercentage > percentage.percent
  );
  return foundSpan?.span ?? gridColumn;
};

export const returnGridPercentage = (
  colCount: number,
  layoutSpan: number
): number => {
  const percentagePerGrid = 100 / colCount;
  const colPercentages = [];

  for (let index = 1; index <= colCount; index++) {
    const percentage = percentagePerGrid * index;
    colPercentages.push(percentage);
  }

  return Math.round(colPercentages[layoutSpan - 1]);
};

export const returnLayoutSize = (
  layout: number | undefined,
  defaultSize: number
): number => {
  return layout || defaultSize;
};
