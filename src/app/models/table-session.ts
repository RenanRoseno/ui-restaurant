export class TableSession {
    id!: number;
    table_id!: number;
    opened_at!: Date;
    closed_at!: Date;

  constructor(init?: Partial<TableSession>) {
        Object.assign(this, init);
    }
}
