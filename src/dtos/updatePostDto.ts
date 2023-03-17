import { z } from "zod"


export const updatePostParams = z.object({
    guid: z.string()
});

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