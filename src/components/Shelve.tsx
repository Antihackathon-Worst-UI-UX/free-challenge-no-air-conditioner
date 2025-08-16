import { Product } from "../logic/classes/product";
import ProductComponent from "./Product";

interface ShelveProps {
    width: number;
    height: number;
    top: string;
    left: string;
    backgroundColor: string;
    productsInShelve: Product[];
}

function Shelve({
        width,
        height,
        top,
        left,
        backgroundColor,
        productsInShelve,
    }: ShelveProps) {

    return (
        <>
            <div className="shelve"
                style={{
                    width: width,
                    height: height,
                    backgroundColor: backgroundColor,
                    position: 'absolute',
                    top: top,
                    left: left,
                }}
            >
                {productsInShelve.map((product, index) => (
                    <ProductComponent key={index} top={String(0) + "px"} left={String(0)} image={product.getImage()} />
                ))}
            </div>
        </>
    )
}

export default Shelve;