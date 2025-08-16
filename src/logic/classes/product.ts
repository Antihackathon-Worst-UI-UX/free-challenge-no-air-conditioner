export class Product {
    private position: { x: number; y: number };
    private name: string;
    private price: number;
    private image: string;

    constructor(name: string, price: number, image: string) {
        this.name = name;
        this.price = price;
        this.image = image;
        this.position = { x: 0, y: 0 };
    }

    getPosition() {
        return this.position;
    }

    setPosition(x: number, y: number) {
        this.position = { x, y };
    }

    getName() {
        return this.name;
    }

    getPrice() {
        return this.price;
    }

    getImage() {
        return this.image;
    }
}