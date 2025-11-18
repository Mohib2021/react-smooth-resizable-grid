import { describe, it, expect } from "vitest";
import {
  returnGridPercentage,
  returnGridSpan,
  returnLayoutSize,
  returnOnlyPercentageList,
  returnPercentageList,
} from "../lib/helperFunctions";

describe("returnOnlyPercentageList", () => {
  it("should return correct percentage list for 4 columns", () => {
    const res = returnOnlyPercentageList(4);
    expect(res).toEqual([75, 50, 25, 0]);
  });

  it("should return empty array for colCount = 0", () => {
    const res = returnOnlyPercentageList(0);
    expect(res).toEqual([]);
  });
});

describe("returnPercentageList", () => {
  it("should return correct percent + span list", () => {
    const res = returnPercentageList(4);
    expect(res).toEqual([
      { percent: 75, span: 4 },
      { percent: 50, span: 3 },
      { percent: 25, span: 2 },
      { percent: 0, span: 1 },
    ]);
  });

  it("should handle single column", () => {
    const res = returnPercentageList(1);
    expect(res).toEqual([{ percent: 0, span: 1 }]);
  });
});

describe("returnGridSpan", () => {
  it("should return correct span based on percentage > match", () => {
    // from 4 columns: percentages -> 75,50,25,0
    expect(returnGridSpan(60, 4)).toBe(3); // 60 > 50 → span=3
    expect(returnGridSpan(80, 4)).toBe(4); // 80 > 75 → span=4
    expect(returnGridSpan(10, 4)).toBe(1); // 10 > 0 → span=1
  });

  it("should return full span when no match", () => {
    // fieldWidth <= all percentage values
    expect(returnGridSpan(-10, 4)).toBe(4);
    expect(returnGridSpan(0, 4)).toBe(4);
  });
});

describe("returnGridPercentage", () => {
  it("should return correct rounded percentage", () => {
    expect(returnGridPercentage(4, 1)).toBe(25);
    expect(returnGridPercentage(4, 2)).toBe(50);
    expect(returnGridPercentage(4, 3)).toBe(75);
    expect(returnGridPercentage(4, 4)).toBe(100);
  });

  it("should work for 3 columns", () => {
    expect(returnGridPercentage(3, 1)).toBe(33);
    expect(returnGridPercentage(3, 2)).toBe(67);
    expect(returnGridPercentage(3, 3)).toBe(100);
  });

  it("should handle invalid span", () => {
    expect(returnGridPercentage(4, 0)).toBe(NaN);
    expect(returnGridPercentage(4, 10)).toBe(NaN);
  });
});

describe("returnLayoutSize", () => {
  it("returns layout when layout is a valid number", () => {
    expect(returnLayoutSize(3, 4)).toBe(3);
  });

  it("returns defaultSize when layout is undefined", () => {
    expect(returnLayoutSize(undefined, 4)).toBe(4);
  });

  it("returns defaultSize when layout is 0 because 0 is falsy", () => {
    expect(returnLayoutSize(0, 4)).toBe(4);
  });

  it("returns layout when layout is a positive number", () => {
    expect(returnLayoutSize(1, 4)).toBe(1);
  });

  it("returns layout when layout is negative (still truthy)", () => {
    expect(returnLayoutSize(-2, 4)).toBe(-2);
  });
});
