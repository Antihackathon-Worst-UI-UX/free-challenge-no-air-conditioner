import { Product } from "./product";

interface CartItem {
    product: Product;
    quantity: number;
}

export class Cart {
    private items: CartItem[] = [];

    addItem(product: Product) {
        const existingItem = this.items.find(item => item.product.getId() === product.getId());
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({ product, quantity: 1 });
        }
    }

    removeItem(product: Product) {
        this.items = this.items.filter(item => item.product.getId() !== product.getId());
    }

    getTotal() {
        return this.items.reduce((total, item) => total + item.product.getPrice(), 0);
    }

    getItemCount() {
        return this.items.length;
    }

    getItems() {
        return this.items;
    }
    
    clear() {
        this.items = [];
    }
}