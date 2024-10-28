import { OrderItem } from "./order-item.model";
import { User } from "./user";

export class Order {

    constructor(
        private _orderId: number,
        private _user: User,
        private _totalAmount: number,
        private _status: Status,
        private _orderItems: OrderItem[]
    ) {}

    // Getters and Setters
    public get orderId(): number {
        return this._orderId;
    }

    public set orderId(value: number) {
        this._orderId = value;
    }

    public get user(): User {
        return this._user;
    }

    public set user(value: User) {
        this._user = value;
    }

    public get totalAmount(): number {
        return this._totalAmount;
    }

    public set totalAmount(value: number) {
        this._totalAmount = value;
    }

    public get status(): Status {
        return this._status;
    }

    public set status(value: Status) {
        this._status = value;
    }

    public get orderItems(): OrderItem[] {
        return this._orderItems;
    }

    public set orderItems(value: OrderItem[]) {
        this._orderItems = value;
    }
}

export enum Status {
    PENDING = 'PENDING',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED'
}
