import React, { useEffect, useRef, useState } from "react";

/**
 * Draggable Rectangle (no external libs)
 * - Mouse + touch (Pointer Events)
 * - Constrained to parent container
 * - Keyboard accessible (arrow keys to move)
 * - Smooth transforms (translate for GPU-friendly paint)
 *
 * Drop this file into a Vite React + TS project as `Draggable.tsx`.
 * Then render <DraggableDemo /> (default export) anywhere in your app.
 */

// Utility
type Point = { x: number; y: number };
const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

// Internal component: the draggable rectangle itself
function DraggableRect({
  initial = { x: 100, y: 100 },
  rectSize = { w: 160, h: 100 },
  onChange,
}: {
  initial?: Point;
  rectSize?: { w: number; h: number };
  onChange?: (pos: Point) => void;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState<Point>(initial);
  const draggingRef = useRef(false);
  const offsetRef = useRef<Point>({ x: 0, y: 0 });

  // Keep last position in a ref for occasional external reads
  const posRef = useRef<Point>(pos);
  useEffect(() => {
    posRef.current = pos;
    onChange?.(pos);
  }, [pos, onChange]);

  // Window-level handlers so we don't lose drag on fast moves
  useEffect(() => {
    function onPointerMove(e: PointerEvent) {
      if (!draggingRef.current || !containerRef.current) return;
      const cont = containerRef.current.getBoundingClientRect();

      let nextX = e.clientX - cont.left - offsetRef.current.x;
      let nextY = e.clientY - cont.top - offsetRef.current.y;

      nextX = clamp(nextX, 0, cont.width - rectSize.w);
      nextY = clamp(nextY, 0, cont.height - rectSize.h);
      setPos({ x: nextX, y: nextY });
    }
    function onPointerUp() {
      draggingRef.current = false;
      // Release any implicit capture on up
    }

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
    };
  }, [rectSize.w, rectSize.h]);

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (!containerRef.current) return;
    // Don't start drags from right/middle mouse buttons
    if (e.pointerType === "mouse" && e.button !== 0) return;

    const cont = containerRef.current.getBoundingClientRect();
    // Compute offset between pointer and rectangle's top-left
    offsetRef.current = {
      x: e.clientX - (cont.left + posRef.current.x),
      y: e.clientY - (cont.top + posRef.current.y),
    };

    draggingRef.current = true;
    (e.currentTarget as HTMLDivElement).setPointerCapture?.(e.pointerId);
    e.preventDefault(); // avoid text selection / scrolling during drag
  }

  // Keyboard nudge for accessibility
  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const step = e.shiftKey ? 1 : 10; // hold Shift for fine movement
    if (!containerRef.current) return;
    const cont = containerRef.current.getBoundingClientRect();

    const maxX = cont.width - rectSize.w;
    const maxY = cont.height - rectSize.h;

    let { x, y } = posRef.current;
    switch (e.key) {
      case "ArrowLeft":
        x = clamp(x - step, 0, maxX);
        break;
      case "ArrowRight":
        x = clamp(x + step, 0, maxX);
        break;
      case "ArrowUp":
        y = clamp(y - step, 0, maxY);
        break;
      case "ArrowDown":
        y = clamp(y + step, 0, maxY);
        break;
      case "Home":
        x = 0; y = 0; break;
      case "End":
        x = maxX; y = maxY; break;
      default:
        return; // ignore other keys
    }
    setPos({ x, y });
    e.preventDefault();
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-3xl h-[420px] mx-auto rounded-2xl border bg-neutral-50 shadow-inner overflow-hidden select-none"
      aria-label="Drag area"
    >
      {/* Background grid for visual feedback */}
      <div className="absolute inset-0 [background:linear-gradient(transparent_23px,_#e5e7eb_24px),linear-gradient(90deg,transparent_23px,_#e5e7eb_24px)] bg-[length:24px_24px]"></div>

      {/* Position HUD */}
      <div className="absolute top-3 right-3 z-10 text-xs px-2 py-1 rounded-md bg-white/80 backdrop-blur border shadow">
        x: {Math.round(pos.x)} px &nbsp; y: {Math.round(pos.y)} px
      </div>

      {/* Draggable rectangle */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Draggable rectangle"
        onPointerDown={handlePointerDown}
        onKeyDown={handleKeyDown}
        className={
          "absolute touch-none outline-none cursor-grab active:cursor-grabbing"
        }
        style={{
          width: rectSize.w,
          height: rectSize.h,
          transform: `translate(${pos.x}px, ${pos.y}px)`,
          transition: draggingRef.current ? "none" : "transform 120ms ease",
        }}
      >
        <div className="w-full h-full rounded-xl border shadow bg-gradient-to-br from-white to-neutral-100 flex items-center justify-center">
          <span className="text-sm text-neutral-700 font-medium">Drag me</span>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-3 left-3 text-xs text-neutral-600 bg-white/70 backdrop-blur px-2 py-1 rounded border">
        Tip: Hold <kbd className="px-1 py-0.5 border rounded">Shift</kbd> for fine moves. Use arrow keys.
      </div>
    </div>
  );
}

// Demo wrapper (default export)
export default function DraggableDemo() {
  const [pos, setPos] = useState<Point>({ x: 100, y: 100 });

  return (
    <div className="min-h-[60vh] w-full p-6 flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Draggable Rectangle — React + TS</h1>
      <p className="text-neutral-600">Click and drag the rectangle inside the bounded area. Works with mouse and touch.</p>

      <DraggableRect
        initial={pos}
        onChange={(p) => setPos(p)}
        rectSize={{ w: 180, h: 120 }}
      />

      <div className="text-sm text-neutral-700">
        Current position: <code>({Math.round(pos.x)}, {Math.round(pos.y)})</code>
      </div>
    </div>
  );
}
