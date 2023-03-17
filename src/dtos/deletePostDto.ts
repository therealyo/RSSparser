import { z } from "zod"


export const deletePostParams = z.object({
    guid: z.string()
});

export const deletePostRequest = z.object({
    params: deletePostParams
});

export type DeletePostRequest = z.infer<typeof deletePostRequest>;
export type DeletePostParams = z.infer<typeof deletePostParams>;