import { z } from "zod"

export const getPostDto = z.object({
    params: z.object({
        guid: z.string()
    })
})

export type GetPostDto = z.infer<typeof getPostDto>;