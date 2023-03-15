import { z } from 'zod';
import { badRequest } from '@hapi/boom';
import { RequestHandler, Router } from 'express';

abstract class Controller {
  public readonly path: string;
  public readonly router: Router;

  public constructor(
    path: string,
  ) {
    this.path = path;
    this.router = Router();
  }
  protected validateZod =
    (schema: z.ZodTypeAny): RequestHandler =>
    async (req, res, next) => {
      const parsed = schema.safeParse(req.body);
      if (parsed.success) {
        return next();
      } else {
        return next(
          badRequest(
            parsed.error.issues
              .map(({ path, message }) => `${path.join('.')}: ${message}`)
              .join('; '),
            parsed.error.issues
          )
        );
      }
    };
}

export default Controller;
