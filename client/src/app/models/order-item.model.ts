import { Order } from "./order.model";
import { Product } from "./product.model";

export class OrderItem {
    constructor(
        private _orderItemId: number,
        private _order: Order,
        private _product: Product,
        private _quantity: number,
        private _price: number
    ) {}


    // Getters and Setters
    public get orderItemId(): number {
        return this._orderItemId;
    }

    public set orderItemId(value: number) {
        this._orderItemId = value;
    }

    public get order(): Order {
        return this._order;
    }

    public set order(value: Order) {
        this._order = value;
    }

    public get product(): Product {
        return this._product;
    }

    public set product(value: Product) {
        this._product = value;
    }

    public get quantity(): number {
        return this._quantity;
    }

    public set quantity(value: number) {
        this._quantity = value;
    }

    public get price(): number {
        return this._price;
    }

    public set price(value: number) {
        this._price = value;
    }
}
