export interface Product {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    stock: number;
    originalPrice: number;
    discountedPrice: number;
    isSpecial: boolean;
    isBestSeller: boolean;
}
