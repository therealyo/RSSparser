import { z } from "zod"


export const updatePostParams = z.object({
    guid: z.string()
});


/**
 * @openapi
 * components:
 *   schemas:
 *     UpdatePostBody:
 *       type: object
 *       properties:
 *         creator:
 *           type: string
 *           description: Creator of the post
 *         link:
 *           type: string
 *           description: Link to the post
 *         pubDate:
 *           type: string
 *           format: date-time
 *           description: Publication date of the post
 *         content:
 *           type: string
 *           description: Content of the post
 *         contentSnippet:
 *           type: string
 *           description: Snippet of the post content
 *         categories:
 *           type: array
 *           items:
 *             type: string
 *           description: Categories of the post
 *       required: []
 */
export const updatePostBody = z.object({
    creator: z.string().optional(),
    link: z.string().optional(),
    pubDate: z.string().optional(),
    content: z.string().optional(),
    contentSnippet: z.string().optional(),
    categories: z.array(z.string()).optional(),
})

export const updatePostRequest = z.object({
    params: updatePostParams,
    body: updatePostBody
})

export type UpdatePostRequest = z.infer<typeof updatePostRequest>;
export type UpdatePostParams = z.infer<typeof updatePostParams>;
export type UpdatePostBody = z.infer<typeof updatePostBody>;