import React from "react";

export const TestComponent = ({
  values,
}: {
  values: { id: number; label: string };
}) => {
  return <div data-testid={`field-${values.id}`}>{values.label}</div>;
};
