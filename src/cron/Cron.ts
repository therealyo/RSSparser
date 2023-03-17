import cron from 'cron';

import { CronTask } from '@/interfaces/CronTask';

class Cron {
  private readonly cron: typeof cron;

  public constructor() {
    this.cron = cron;
  }

  public addProcess = (task: CronTask) => {
    this.cron.job(task.interval, task.action, null, true, 'Europe/Kiev').start();
  };
}

export default Cron;
