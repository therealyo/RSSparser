import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { and, asc, desc, eq, inArray, or } from 'drizzle-orm/expressions';

import postsTable, { NewPost, Post } from "@/database/PostsTable";
import { SearchConfig } from "@/interfaces/SearchConfig";
import { PgColumn } from "drizzle-orm/pg-core/columns";

type SortFields = {
    [key: string]: PgColumn<any>
}

class Posts {
    private sortFields: SortFields = {
        "alph": postsTable.title,
        "date": postsTable.pubDate
    }

    public constructor(
        private db: NodePgDatabase
    ) {}

    public createPost = async (post: NewPost): Promise<Post> => {
        const [created] = await this.db
            .insert(postsTable)
            .values(post)
            .returning();

        return created
    }

    public createPosts = async (posts: NewPost[]): Promise<Post[]> => {
        if (posts.length !== 0) {
            await this.db
                .insert(postsTable)
                .values(...posts)
                .returning()
            }

        return []
    }   

    public getAll = async (): Promise<Post[]> => 
        this.db
            .select()
            .from(postsTable)
            .where(eq(postsTable.deleted, false));

    public getExistingIds = async (): Promise<string[]> => 
        this.db
            .select({ guid: postsTable.guid })
            .from(postsTable)
            .then((guids) => guids.map(({guid}) => guid))
            

    public getPost = async (guid: string): Promise<Post> => {
        const [post] = await this.db
            .select()
            .from(postsTable)
            .where(eq(postsTable.guid, guid));

        return post;
    }

    public updatePost = async (guid: string, update: Partial<Post>): Promise<Post> => {
        const [updated] = await this.db
            .update(postsTable)
            .set(update)
            .where(eq(postsTable.guid, guid))
            .returning();

        return updated;
    }

    public deletePost = async (guid: string): Promise<void> => {
        await this.db
            .update(postsTable)
            .set({deleted: true})
            .where(eq(postsTable.guid, guid))
    }

    public search = async (searchConfig: SearchConfig): Promise<Post[]> => {
        const sortField = this.sortFields[searchConfig.sort.field]

        const sortOrder = searchConfig.sort.order === "asc" 
            ? asc
            : desc

        return await this.db
            .select()
            .from(postsTable)
            .where(
                and(
                    searchConfig.search,
                    searchConfig.categories,
                )
            )
            .orderBy(sortOrder(sortField))
            .limit(searchConfig.pageSize)
            .offset((searchConfig.page - 1) * 10)
    } 
}

export default Posts