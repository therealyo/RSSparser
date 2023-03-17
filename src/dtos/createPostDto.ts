import { z } from "zod"


/**
 * @openapi
 * components:
 *  schemas:
 *   CreatePostBody:
 *     type: object
 *     properties:
 *       guid:
 *         type: string
 *         description: The GUID of the post
 *       title:
 *         type: string
 *         description: The title of the post
 *       creator:
 *         type: string
 *         description: The creator of the post
 *       link:
 *         type: string
 *         description: The link of the post
 *       pubDate:
 *         type: string
 *         description: The publication date of the post
 *         format: date-time
 *       content:
 *         type: string
 *         description: The content of the post
 *       contentSnippet:
 *         type: string
 *         description: The content snippet of the post
 *       categories:
 *         type: array
 *         description: The categories of the post
 *         items:
 *           type: string
 *     required:
 *       - guid
 *       - creator
 *       - link
 *       - pubDate
 *       - content
 *       - contentSnippet
 */

export const createPostBody = z.object({
    guid: z.string(),
    title: z.string(),
    creator: z.string(),
    link: z.string(),
    pubDate: z.string(),
    content: z.string(),
    contentSnippet: z.string(),
    categories: z.array(z.string()).optional(),
})

export const createPostRequest = z.object({
    body: createPostBody
})

export type CreatePostRequest = z.infer<typeof createPostRequest>;
export type CreatePostBody = z.infer<typeof createPostBody>;