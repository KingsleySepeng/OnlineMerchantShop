import { OrderItem } from "./order-item.model";
import { User } from "./user";

export interface Order {
    success: any;
    orderId: number;
    user: User;
    totalAmount: number;
    status: Status;
    orderItems: OrderItem[];
}

export enum Status {
    PENDING = 'PENDING',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED'
}
