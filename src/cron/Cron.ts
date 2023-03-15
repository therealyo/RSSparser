import cron from 'cron';

import { CronTask } from '@/interfaces/process';

class Cron {
  private readonly cron: typeof cron;

  public constructor() {
    this.cron = cron;
  }

  public addProcess = (process: CronTask) => {
    this.cron.job(process.interval, process.action, null, true, 'Europe/Kiev').start();
  };
}

export default Cron;
