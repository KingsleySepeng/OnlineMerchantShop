import { Order } from "./order.model";
import { Product } from "./product.model";

export interface OrderItem {
    orderItemId: number;
    order: Order;
    product: Product;
    quantity: number;
    price: number;
}
