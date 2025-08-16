import { useRef, useState } from "react";
import type { Point, DraggableUnitProps } from "../interfaces";
import './Cart.css'


const clamp = (n: number, min: number, max: number) =>
    Math.max(min, Math.min(max, n));

const Cart: React.FC<DraggableUnitProps> = ({ size = 50 }) => {
    const unitRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState<Point>({ x: 0, y: 0 });
    const [dragging, setDragging] = useState(false);
    const [offset, setOffset] = useState<Point>({ x: 0, y: 0 });

    const startDrag = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!unitRef.current || !unitRef.current.parentElement) return;

        const parentRect = unitRef.current.parentElement.getBoundingClientRect();

        e.currentTarget.setPointerCapture(e.pointerId);
        setDragging(true);
        setOffset({
            x: e.clientX - parentRect.left - position.x,
            y: e.clientY - parentRect.top - position.y,
        });
    };


    const onDrag = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!dragging || !unitRef.current || !unitRef.current.parentElement) return;

        const parentRect = unitRef.current.parentElement.getBoundingClientRect();

        const newX = clamp(
            e.clientX - offset.x - parentRect.left,
            0,
            parentRect.width - size
        );
        const newY = clamp(
            e.clientY - offset.y - parentRect.top,
            0,
            parentRect.height - size
        );

        setPosition({ x: newX, y: newY });
    };

    const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
        e.currentTarget.releasePointerCapture(e.pointerId);
        setDragging(false);
    };

    return (
        <div
            ref={unitRef}
            onPointerDown={startDrag}
            onPointerMove={onDrag}
            onPointerUp={endDrag}
            style={{
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: "tomato",
                position: "absolute",
                transform: `translate(${position.x}px, ${position.y}px)`,
                cursor: dragging ? "grabbing" : "grab",
                borderRadius: "6px",
            }}
        />
    );
};

export default Cart;
