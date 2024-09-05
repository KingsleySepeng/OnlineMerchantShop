export class Product {
    private _id: number;
    private _name: string;
    private _description: string;
    private _imageUrl: string;
    private _stock: number;
    private _originalPrice: number;
    private _discountedPrice: number;
    private _isSpecial: boolean;
    private _isBestSeller: boolean;

    constructor(
        id: number,
        name: string,
        description: string,
        imageUrl: string,
        stock: number,
        originalPrice: number,
        discountedPrice: number,
        isSpecial: boolean,
        isBestSeller: boolean
    ) {
        this._id = id;
        this._name = name;
        this._description = description;
        this._imageUrl = imageUrl;
        this._stock = stock;
        this._originalPrice = originalPrice;
        this._discountedPrice = discountedPrice;
        this._isSpecial = isSpecial;
        this._isBestSeller = isBestSeller;
    }

    // Getters and Setters
    get id(): number {
        return this._id;
    }
    set id(value: number) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }
    set name(value: string) {
        this._name = value;
    }

    get description(): string {
        return this._description;
    }
    set description(value: string) {
        this._description = value;
    }

    get imageUrl(): string {
        return this._imageUrl;
    }
    set imageUrl(value: string) {
        this._imageUrl = value;
    }

    get stock(): number {
        return this._stock;
    }
    set stock(value: number) {
        this._stock = value;
    }

    get originalPrice(): number {
        return this._originalPrice;
    }
    set originalPrice(value: number) {
        this._originalPrice = value;
    }

    get discountedPrice(): number {
        return this._discountedPrice;
    }
    set discountedPrice(value: number) {
        this._discountedPrice = value;
    }

    get isSpecial(): boolean {
        return this._isSpecial;
    }
    set isSpecial(value: boolean) {
        this._isSpecial = value;
    }

    get isBestSeller(): boolean {
        return this._isBestSeller;
    }
    set isBestSeller(value: boolean) {
        this._isBestSeller = value;
    }
}
