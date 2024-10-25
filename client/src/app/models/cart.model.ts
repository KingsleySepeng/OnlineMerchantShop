import { CartItem } from "./cart-item";
import { User } from "./user";

export class Cart {
    constructor(
        private _id: number,
        private _user: User,
        private _cartItems: CartItem[]
      ) {}

    // Getters and Setters
    // Getter for _id
    public get id(): number {
        return this._id;
    }

    // Setter for _id
    public set id(value: number) {
        this._id = value;
    }

    // Getter for _user
    public get user(): User {
        return this._user;
    }

    // Setter for _user
    public set user(value: User) {
        this._user = value;
    }

    // Getter for _cartItems
    public get cartItems(): CartItem[] {
        return this._cartItems;
    }

    // Setter for _cartItems
    public set cartItems(value: CartItem[]) {
        this._cartItems = value;
    }
}
