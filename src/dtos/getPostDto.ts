import { z } from "zod"

export const getPostParams = z.object({
    guid: z.string()
});

export const getPostRequest = z.object({
    params: getPostParams
});

export type GetPostRequest = z.infer<typeof getPostRequest>;
export type GetPostParams = z.infer<typeof getPostParams>;