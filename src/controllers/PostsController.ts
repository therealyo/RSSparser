import { RequestHandler } from 'express';
import Posts from "@/repositories/Posts";
import Controller from "./Controller";

class PostsController extends Controller {
    public constructor(
        posts: Posts
    ) {
        super("/posts")

        this.initializeRoutes()
    }

    private initializeRoutes = () => {
        this.router.get("/", this.searchPosts);
        this.router.get("/:guid", this.getPost);

        this.router.post("/", this.createPost);

        this.router.put("/:guid", this.updatePost)
        
        this.router.delete("/:guid", this.deletePost)
    }

    private getPost: RequestHandler<{guid: number}, {}, {}, {}> = async () => {}

    private createPost: RequestHandler<{}, {}, {}, {}> = async () => {}

    private updatePost: RequestHandler<{guid: number}, {}, {}, {}> = async () => {}

    private deletePost: RequestHandler<{guid: number}, {}, {}, {}> = async () => {}

    private searchPosts: RequestHandler<{}, {}, {}, {}> = async () => {}

}

export default PostsController