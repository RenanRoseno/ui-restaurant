export class Table {
    id!: number;
    table_number!: string;
    created_at!: Date;
    updated_at!: Date;

    constructor(init?: Partial<Table>) {
        Object.assign(this, init);
    }
}
