export class Product {
    private id: string;
    private name: string;
    private price: number;
    private image: string;

    constructor(id: string, name: string, price: number, image: string) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
    }

    getId() {
        return this.id;
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