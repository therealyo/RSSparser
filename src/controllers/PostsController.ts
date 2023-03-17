import { badRequest } from '@hapi/boom';
import { NextFunction, Request, RequestHandler, Response } from 'express';

import Controller from "./Controller";

import Posts from "@/repositories/Posts";
import { Post } from '@/database/PostsTable';

import { generateSearchConfig } from '@/utils/searchUtil';

import { getPostRequest } from '@/dtos/getPostDto';
import { deletePostRequest } from '@/dtos/deletePostDto';
import { updatePostRequest } from '@/dtos/updatePostDto';
import { createPostRequest } from '@/dtos/createPostDto';
import { searchPostRequest, SearchPostQuery } from '@/dtos/searchPostDto';

class PostsController extends Controller {
    public constructor(
        private posts: Posts
    ) {
        super("/posts")

        this.initializeRoutes()
    }

    private initializeRoutes = () => {
        this.router.get("/", this.validateZod(searchPostRequest), this.searchPosts);
        this.router.get("/:guid", this.validateZod(getPostRequest), this.getPost);

        this.router.post("/", this.validateZod(createPostRequest), this.createPost);

        this.router.patch("/:guid", this.validateZod(updatePostRequest), this.updatePost)
        
        this.router.delete("/:guid", this.validateZod(deletePostRequest), this.deletePost)
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
            const post = await this.posts.getPost(guid)
            if (!post || post.deleted) {
                throw Error(`post does not exist`)
            }

            await this.posts.deletePost(guid)

            return res.status(200).json("deleted")
        } catch (e: unknown) {
            if (e instanceof Error) {
                next(badRequest(e))
            }
        }
    }

    private searchPosts = async (
        req: Request<{}, {}, {}, SearchPostQuery>, 
        res: Response, 
        next: NextFunction
    ) => {
        try {
            const config = generateSearchConfig(req.query)
            const matchedPosts = await this.posts.search(config)
            const totalPosts = (await this.posts.getAll()).length

            return res.status(200).json({ data: matchedPosts, total: totalPosts, pageSize: Number(req.query.pageSize) })
        } catch (e: unknown) {
            if (e instanceof Error) {
                next(badRequest(e))
            }
        }
    }

}

export default PostsController