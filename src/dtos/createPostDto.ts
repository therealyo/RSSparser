import { z } from "zod"

export const createPostDto = z.object({
    body: z.object({
        guid: z.string(),
        creator: z.string(),
        link: z.string(),
        pubDate: z.string(),
        content: z.string(),
        contentSnippet: z.string(),
        categories: z.array(z.string()).optional(),
    })
})

export type CreatePostDto = z.infer<typeof createPostDto>;