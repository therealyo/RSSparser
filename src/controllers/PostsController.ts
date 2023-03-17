import { badRequest } from '@hapi/boom';
import { NextFunction, Request, RequestHandler, Response } from 'express';

import Controller from "./Controller";

import Posts from "@/repositories/Posts";
import { Post } from '@/database/PostsTable';

import { getPostDto } from '@/dtos/getPostDto';
import { deletePostDto } from '@/dtos/deletePostDto';
import { updatePostDto } from '@/dtos/updatePostDto';
import { createPostDto } from '@/dtos/createPostDto';


class PostsController extends Controller {
    public constructor(
        private posts: Posts
    ) {
        super("/posts")

        this.initializeRoutes()
    }

    private initializeRoutes = () => {
        this.router.get("/", this.validateZod, this.searchPosts);
        this.router.get("/:guid", this.validateZod(getPostDto), this.getPost);

        this.router.post("/", this.validateZod(createPostDto), this.createPost);

        this.router.patch("/:guid", this.validateZod(updatePostDto), this.updatePost)
        
        this.router.delete("/:guid", this.validateZod(deletePostDto), this.deletePost)
    }

    private getPost = async (
        req: Request, 
        res: Response, 
        next: NextFunction
    ) => {
        try {
            const { guid } = req.params
            const post = await this.posts.getPost(guid)
            if (!post || post.deleted) {
                throw Error(`post does not exist`)
            }

            return res.status(200).json(post)
        } catch (e: unknown) {
            if (e instanceof Error) {
                next(badRequest(e))
            }
        }
    }

    private createPost = async (
        req: Request, 
        res: Response, 
        next: NextFunction
    ) => {
        try {
            const post = req.body

            const exist = await this.posts.getPost(post.guid) 
            if (exist) {
                throw Error("post with this id already exists")
            }

            const created = await this.posts.createPost(post)

            return res.status(201).json(created)
        } catch (e: unknown) {
            if (e instanceof Error) {
                next(badRequest(e))
            }
        }
    }

    private updatePost = async (
        req: Request, 
        res: Response, 
        next: NextFunction
    ) => {
        try {
            const { guid } = req.params
            const update = req.body

            const post = await this.posts.getPost(guid)

            if (!post || post.deleted) {
                throw Error(`post does not exist`)
            }

            const updated = await this.posts.updatePost(guid, update)
            return res.status(200).json(updated)
        } catch (e: unknown) {
            if (e instanceof Error) {
                next(badRequest(e))
            }
        }
    }

    private deletePost = async (
        req: Request, 
        res: Response, 
        next: NextFunction
    ) => {
        try {
            const { guid } = req.params
            await this.posts.deletePost(guid)

            return res.status(200).json("deleted")
        } catch (e: unknown) {
            if (e instanceof Error) {
                next(badRequest(e))
            }
        }
    }

    private searchPosts = async (
        req: Request, 
        res: Response, 
        next: NextFunction
    ) => {}

}

export default PostsController