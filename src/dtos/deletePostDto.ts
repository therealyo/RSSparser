import { z } from "zod"

export const deletePostDto = z.object({
    params: z.object({
        guid: z.string()
    })
})

export type DeletePostDto = z.infer<typeof deletePostDto>;