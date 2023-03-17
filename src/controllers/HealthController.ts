import { badRequest, internal } from "@hapi/boom";
import { NextFunction, Request, RequestHandler, Response } from "express";

import Controller from "./Controller";

class HealthController extends Controller {

    public constructor(
    ) {
        super('/health');
        
        this.initializeRoutes();
    }

    private initializeRoutes = () => {
        this.router.get("/", this.healthCheck)
    };

    /**
     * @openapi
     * /health:
     *  get:
     *     tags:
     *     - Healthcheck
     *     description: Responds if the app is up and running
     *     responses:
     *       200:
     *         description: App is up and running
    */
    private healthCheck: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        try {
            return res.status(200).json({status: "ok"})
        } catch (e: unknown) {
            if (e instanceof Error) {
                console.error(e);
                return next(badRequest(e.message));
            }
            return internal('Internal error');
        }
    }
}

export default HealthController;