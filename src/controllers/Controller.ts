import { z } from 'zod';
import { badData } from '@hapi/boom';
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
    (schema: z.AnyZodObject): RequestHandler<any, any, any, any> =>
    async (req, res, next) => {
      const parsed = schema.safeParse({
        body: req.body,
        query: req.query,
        params: req.params
      });

      if (parsed.success) {
        req.body = parsed.data.body
        req.query = parsed.data.query
        req.params = parsed.data.params 
        return next();
      } else {
        return next(
          badData(
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
