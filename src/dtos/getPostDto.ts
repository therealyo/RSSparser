import { z } from "zod"

/**
 * @openapi
 * components:
 *  schemas:
 *    GetPostInput:
 *      type: object
 *      required:
 *        - guid
 *      properties:
 *        guid:
 *          type: string
 *          default: 123123123
 */

export const getPostParams = z.object({
    guid: z.string()
});

export const getPostRequest = z.object({
    params: getPostParams
});

export type GetPostRequest = z.infer<typeof getPostRequest>;
export type GetPostParams = z.infer<typeof getPostParams>;