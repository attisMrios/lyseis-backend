import { Validators } from "../../decorators";

export default class ProductsEntity {

    id: number;
    
    @Validators({AllowNull: false, StringLength: 5})
    code?: string;
    
    @Validators({AllowNull: false, StringLength: 1000})
    description?: string;
    
    @Validators({AllowNull: false})
    price?: number;

    tax?: number;
    picture?: string;

    constructor(_id: number, _code: string, _description: string, _price: number, _picture: string, _tax: number) {
        this.id = _id;
        this.code = _code;
        this.description = _description;
        this.picture = _picture;
        this.tax = _tax
    }
}