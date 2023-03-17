import { z } from "zod"

export const createPostBody = z.object({
    guid: z.string(),
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