import { useState } from 'react'
import "./Cart.css"

function Cart() {
    const [position, setPosition] = useState({ top: 0, left: 0 });

    const handleMouseMove = (e) => {
        console.log(e.clientY, e.clientX)
        setPosition({ top: e.clientY, left: e.clientX });
    };

    return (
        <div
            className='cart'
            style={{
                position: 'absolute',
                top: position.top,
                left: position.left,
                padding: '20px',
                cursor: 'grab',
            }}
            onMouseMove={handleMouseMove}
        >
            carrito
        </div>
    )
}

export default Cart
