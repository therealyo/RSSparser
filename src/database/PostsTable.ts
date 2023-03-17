import { index } from "drizzle-orm/pg-core/indexes";
import { InferModel, pgTable } from "drizzle-orm/pg-core/table";
import { boolean, integer, jsonb, text, timestamp, varchar } from "drizzle-orm/pg-core/columns";
import { sql } from "drizzle-orm";

export type Post = InferModel<typeof posts, "select">
export type NewPost = InferModel<typeof posts, "insert">

const posts = pgTable('posts', {
        guid: varchar('guid').primaryKey(),
        title: varchar("title"),
        creator: varchar("creator", {length: 100}),
        link: varchar("link", {length:256}),
        pubDate: timestamp("pub_date", { mode: "string", precision: 6, withTimezone: true }),
        content: text("content"),
        contentSnippet: text("content_snippet"),
        categories: jsonb<string[]>("categories"),
        deleted: boolean("deleted").default(false)
    }, (posts) => {
        return {
            createIdx: index("creator_idx").on(posts.creator),
            categoriesIdx: index("categories_idx").on(posts.categories),
            titleIdx: index("title_idx").on(posts.title)
        }
    }
);

export default posts;