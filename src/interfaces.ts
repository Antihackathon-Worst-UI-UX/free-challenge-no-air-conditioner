export type Point = { x: number; y: number };
export type Size = { width: number; height: number };
export type DraggableUnitProps = { size?: number, onPositionChange?: (pos: Point) => void };
