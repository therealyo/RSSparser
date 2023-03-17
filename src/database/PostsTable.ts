import { index } from "drizzle-orm/pg-core/indexes";
import { InferModel, pgTable } from "drizzle-orm/pg-core/table";
import { boolean, integer, jsonb, text, timestamp, varchar } from "drizzle-orm/pg-core/columns";
import { sql } from "drizzle-orm";

export type Post = InferModel<typeof posts, "select">
export type NewPost = InferModel<typeof posts, "insert">

/**
 * @openapi
 * components:
 *  schemas:
 *    Post:
 *       type: object
 *       properties:
 *         guid:
 *           type: string
 *           description: The GUID of the post
 *         title:
 *           type: string
 *           description: The title of the post
 *         creator:
 *           type: string
 *           description: The creator of the post
 *           maxLength: 100
 *         link:
 *           type: string
 *           description: The link of the post
 *           maxLength: 256
 *         pubDate:
 *           type: string
 *           description: The publication date of the post
 *           format: date-time
 *         content:
 *           type: string
 *           description: The content of the post
 *         contentSnippet:
 *           type: string
 *           description: The content snippet of the post
 *         categories:
 *           type: array
 *           description: The categories of the post
 *           items:
 *             type: string
 *         deleted:
 *           type: boolean
 *           description: Whether the post is deleted or not
 *           default: false
 *       required:
 *         - guid
 *         - title
 *         - creator
 *         - link
 *         - pubDate   
 */

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