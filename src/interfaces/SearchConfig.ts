import { SQL } from "drizzle-orm/sql"

export interface SearchConfig {
    search?: SQL,
    creator?: SQL,
    categories?: SQL,
    pubDate?: SQL
    sort: {
        field: string,
        order: string
    },
    page: number,
    pageSize: number
}