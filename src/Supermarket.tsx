import Cart from './components/Cart.tsx'
import type { Size, Point } from './interfaces.ts';
import { useState } from 'react';

const Supermarket: React.FC = () => {

    let supermarketSize: Size;
    supermarketSize = { width: 800, height: 400 };
    
    const [pos, setPos] = useState<Point>({ x: 0, y: 0 });
    return (
        <>
            <div
                style={{
                    width: `${supermarketSize.width}px`,
                    height: `${supermarketSize.height}px`,
                    border: "2px solid black",
                    position: "relative",
                }}
            >
                <Cart size={60} onPositionChange={setPos}  />
            </div>
            <div style={{ position: "absolute", bottom: "5px", left: "5px", background: "black" }}>
                Position: x={pos.x.toFixed(0)}, y={pos.y.toFixed(0)}
            </div>
        </>
    );
};

export default Supermarket;