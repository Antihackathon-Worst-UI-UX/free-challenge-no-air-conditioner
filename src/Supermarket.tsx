import Cart from './components/Cart.tsx'
import type { Size } from './interfaces.ts';

const Supermarket: React.FC = () => {

    let supermarketSize: Size;
    supermarketSize = { width: 800, height: 400 };

    return (
        <div
            style={{
                width: `${supermarketSize.width}px`,
                height: `${supermarketSize.height}px`,
                border: "2px solid black",
                position: "relative",
            }}
        >
            <Cart size={60} />
        </div>
    );
};

export default Supermarket;