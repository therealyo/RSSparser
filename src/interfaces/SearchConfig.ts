import { SQL } from "drizzle-orm/sql"

export interface SearchConfig {
    search?: SQL,
    categories?: SQL,
    sort: {
        field: string,
        order: string
    },
    page: number,
    pageSize: number
}