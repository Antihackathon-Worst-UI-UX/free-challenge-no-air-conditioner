import appleImage from '../assets/products/apple.png'

interface ProductProps {
    top: string;
    left: string;
    image: string;
}

function Product({ top, left, image }: ProductProps) {

    const size = "50px";

    const imageMap: Record<string, string> = {
        apple: appleImage,
    }

    return (
        <div className="product"
            style={{
                width: size,
                height: size,
                position: 'relative',
                top: top,
                left: left,
            }}
        >
            <img src={imageMap[image]} alt="product" style={{ width: size, height: size }} />
        </div>
    )
}

export default Product;