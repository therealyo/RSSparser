import { sql } from 'drizzle-orm';

import { SearchPostQuery } from '@/dtos/searchPostDto';
import { SearchConfig } from "@/interfaces/SearchConfig";

export const generateSearchConfig = (query: SearchPostQuery): SearchConfig => {

    const preparedSearchString = query.search 
        ? query.search.split(" ").map(word => `${word}:*`).join("&")
        : '';

    const search = sql`
        CASE
            WHEN ${preparedSearchString} = '' THEN true
            ELSE to_tsvector(
                "posts"."content_snippet" || '' || 
                "posts"."title" || ' ' || 
                "posts"."creator"
            ) @@ to_tsquery(${preparedSearchString}) 
        END`;
    const categories = sql`"posts"."categories" @> ${query.categories ? JSON.stringify(query.categories) : JSON.stringify([])}`;

    const sortParams = query.sort.split('.'); 
    return {
        search,
        categories,
        sort: {
            field: sortParams[0],
            order: sortParams[1]
        },
        page: Number(query.page),
        pageSize: Number(query.pageSize)
    } as SearchConfig;
}