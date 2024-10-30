declare module "react-grid-layout" {
  import { ComponentType } from "react";

  export interface Layout {
    i: string;
    x: number;
    y: number;
    w: number;
    h: number;
    static?: boolean;
    isDraggable?: boolean;
    isResizable?: boolean;
    minW?: number;
    minH?: number;
    maxW?: number;
    maxH?: number;
  }

  export interface ResponsiveProps {
    className?: string;
    layouts: Record<string, Layout[]>;
    breakpoints?: Record<string, number>;
    cols?: Record<string, number>;
    rowHeight?: number;
    onLayoutChange?: (
      layout: Layout[],
      layouts: Record<string, Layout[]>,
    ) => void;
    isDraggable?: boolean;
    isResizable?: boolean;
    compactType?: "vertical" | "horizontal" | null;
    preventCollision?: boolean;
  }

  export const Responsive: ComponentType<ResponsiveProps>;
  export const WidthProvider: (
    component: ComponentType<ResponsiveProps>,
  ) => ComponentType<any>;
}
