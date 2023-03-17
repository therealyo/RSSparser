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

    /**
   * @openapi
   * '/posts/{postId}':
   *  get:
   *     tags:
   *     - Post
   *     summary: Get post with given id
   *     parameters:
   *      - in: path
   *        name: guid
   *        required: true
   *        decription: id of post to retrieve
   *     content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/GetPostInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Post'
   *      400:
   *        description: Bad request
   *      422: 
   *        description: Unprocessable Content
   */
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

    /**
   * @openapi
   * '/posts':
   *  post:
   *     tags:
   *     - Post
   *     summary: Create post
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreatePostBody'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Post'
   *      400:
   *        description: Bad request
   *      422: 
   *        description: Unprocessable Content
   */

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

    /**
   * @openapi
   * '/posts/{postId}':
   *  patch:
   *     tags:
   *     - Post
   *     summary: update post with given id
   *     parameters:
   *      - in: path
   *        name: guid
   *        required: true
   *        decription: id of post to update
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/UpdatePostBody'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Post'
   *      400:
   *        description: Bad request
   *      422: 
   *        description: Unprocessable Content
   */

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

    /**
   * @openapi
   * '/posts/{postId}':
   *  delete:
   *     tags:
   *     - Post
   *     summary: delete post with given id
   *     parameters:
   *      - in: path
   *        name: guid
   *        required: true
   *        decription: id of post to delete
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          text/plain:
   *            schema: 
   *              type: string
   *              default: "deleted"
   *          
   *      400:
   *        description: Bad request
   *      422: 
   *        description: Unprocessable Content
   */
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

/**
 * @openapi
 * '/posts':
 *  get:
 *     tags:
 *     - Post
 *     summary: search endpoint
 *     parameters:
 *       search:
 *         name: search
 *         in: query
 *         description: Search query string
 *         schema:
 *           type: string
 *       creator:
 *         name: creator
 *         in: query
 *         description: Array of creators
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *       categories:
 *         name: categories
 *         in: query
 *         description: Array of categories
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *       pubDate:
 *         name: pubDate
 *         in: query
 *         description: Array of publication dates
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *             format: date-time
 *       sort:
 *         name: sort
 *         in: query
 *         description: Sort order
 *         schema:
 *           type: string
 *           enum:
 *             - alph.asc
 *             - alph.desc
 *             - date.asc
 *             - date.desc
 *           default: alph.asc
 *       page:
 *         name: page
 *         in: query
 *         description: Page number
 *         schema:
 *           type: string
 *           default: '1'
 *       pageSize:
 *         name: pageSize
 *         in: query
 *         description: Page size
 *         schema:
 *           type: string
 *           default: '10'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SearchResults'
 *      400:
 *        description: Bad request
 *      422: 
   *        description: Unprocessable Content
   */
    private searchPosts = async (
        req: Request<{}, {}, {}, SearchPostQuery>, 
        res: Response, 
        next: NextFunction
    ) => {
        try {
            const config = generateSearchConfig(req.query)
            const matchedPosts = await this.posts.search(config)
            const totalPosts = (await this.posts.getAll()).length

            return res.status(200).json({ 
                data: matchedPosts, 
                total: totalPosts, 
                pageSize: Number(req.query.pageSize) 
            })
        } catch (e: unknown) {
            if (e instanceof Error) {
                next(badRequest(e))
            }
        }
    }

}

export default PostsController