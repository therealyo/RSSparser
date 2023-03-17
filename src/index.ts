import * as dotenv from 'dotenv';
import 'express-async-errors';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';

import App from '@/App';
import Cron from '@/cron/Cron';
import RssParser from '@/cron/processes/RssParser';

import Controller from '@/controllers/Controller';
import HealthController from '@/controllers/HealthController';
import PostsController from '@/controllers/PostsController';

import Posts from '@/repositories/Posts';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}

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
    await migrate(db, { migrationsFolder: './migrations' });

    const posts = new Posts(db)

    const healthController = new HealthController()
    const postsController = new PostsController(posts)
    
    const controllers: Controller[] = [
      healthController,
      postsController
    ];

    const cron = new Cron()
    const rssTask = new RssParser(posts)
    cron.addProcess(rssTask);

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
