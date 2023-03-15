import 'dotenv/config';
import 'express-async-errors';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';

import App from './App';
import Controller from './controllers/Controller';
import HealthController from './controllers/HealthCheckController';
// import RssParser from './cron/processes/RssParser';
// import Cron from './cron/Cron';


const main = async () => {
  try {

    const pool = new Pool({
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT,
      user: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
    });


    const db = drizzle(pool)
    // await migrate(db, { migrationsFolder: './migrations' });

    const healthController = new HealthController()
    const controllers: Controller[] = [
      healthController
    ];

    // const cron = new Cron()
    // const rssTask = new RssParser()
    // cron.addProcess(rssTask);

    const port = process.env.APP_PORT;
    const app = new App(controllers, port);
    app.listen();

    return app;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      process.exit(1);
    }
  }
};

main();

export default main;
