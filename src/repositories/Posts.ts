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
            .from(postsTable);

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
        return [];
    } 
}

export default Posts