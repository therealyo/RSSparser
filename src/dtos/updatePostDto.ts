import { z } from "zod"

export const updatePostDto = z.object({
    params: z.object({
        guid: z.string()
    }),

    body: z.object({
        creator: z.string().optional(),
        link: z.string().optional(),
        pubDate: z.string().optional(),
        content: z.string().optional(),
        contentSnippet: z.string().optional(),
        categories: z.array(z.string()).optional(),
    })
})

export type UpdatePostDto = z.infer<typeof updatePostDto>;