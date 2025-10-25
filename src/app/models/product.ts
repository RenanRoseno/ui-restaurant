export class Product {
    id!: number;
    name!: string;
    price!: number;
    created_at!: Date;
    updated_at!: Date;

      constructor(init?: Partial<Product>) {
        Object.assign(this, init);
    }
}
