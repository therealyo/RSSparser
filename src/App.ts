import express, {
  Application,
  NextFunction,
  Request,
  Response,
  Router,
} from 'express';
import { isBoom } from '@hapi/boom';
import responseTime from 'response-time';

import Controller from './controllers/Controller';

class App {
  public app: Application;
  private readonly port: number;
  private readonly controllers: Controller[];

  public constructor(
    controllers: Controller[],
    port: number,
  ) {
    this.app = express();
    this.port = port;
    this.controllers = controllers;

    this.initializeMiddlewares();
    this.initializeControllers();
    this.initializeErrorHandler();
  }

  public listen = () => {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  };

  private initializeMiddlewares = () => {
    this.app.use(responseTime());
    this.app.use(express.json());
  };

  private initializeControllers = () => {
    this.controllers.forEach((controller: { path: string; router: Router ; }) => {
      this.app.use(controller.path, controller.router);
    });
  };

  private initializeErrorHandler = () => {
    this.app.use((e: Error, _: Request, res: Response, _2: NextFunction) => {
      if (e) {
        const status = isBoom(e) ? e.output.statusCode : 500;
        const message = isBoom(e) ? e.message : (e?.message || 'Something went wrong');
        res.status(status).send(message);
      }
    });
  };
}

export default App;
