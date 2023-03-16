import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { and, asc, desc, eq, or } from 'drizzle-orm/expressions';

import postsTable, { NewPost, Post } from "@/database/PostsTable";
import { SearchConfig } from "@/interfaces/SearchConfig";

class Posts {
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

    public createPosts = async (posts: NewPost[]): Promise<Post[]> => 
        this.db
            .insert(postsTable)
            .values(...posts)
            .returning();
    

    public getPost = async (guid: number): Promise<Post> => {
        const [post] = await this.db
            .select()
            .from(postsTable)
            .where(eq(postsTable.guid, guid));

        return post;
    }

    public updatePost = async (guid: number, update: Partial<Post>): Promise<Post> => {
        const [updated] = await this.db
            .update(postsTable)
            .set(update)
            .where(eq(postsTable.guid, guid))
            .returning();

        return updated;
    }

    public deletePost = async (guid: number): Promise<Post> => {
        const [deleted] = await this.db
            .delete(postsTable)
            .where(eq(postsTable.guid, guid))
            .returning();

        return deleted;
    }

    public search = async (searchConfig: SearchConfig): Promise<Post[]> => {
        return [];
    } 
}

export default Posts