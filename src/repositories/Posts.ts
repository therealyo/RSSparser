import { NewPost, Post } from "@/database/PostsTable";
import { SearchConfig } from "@/interfaces/SearchConfig";
import { NodePgDatabase } from "drizzle-orm/node-postgres";

class Posts {
    public constructor(db: NodePgDatabase) {}

    public createPost = async (post: NewPost): Promise<Post> => {
        return {} as Post;
    }

    public getPost = async (guid: number): Promise<Post> => {
        return {} as Post;
    }

    public updatePost = async (guid: number, update: Partial<Post>): Promise<Post> => {
        return {} as Post;
    }

    public deletePost = async (guid: number): Promise<Post> => {
        return {} as Post;
    }

    public search = async (searchConfig: SearchConfig): Promise<Post[]> => {
        return [];
    } 
}

export default Posts