import { CronTask } from '@/interfaces/CronTask';

export interface PreparedMessages {
  [telegramId: number]: string 
}

class RssParser implements CronTask {
  public readonly interval = '0 9 * * *'; // Each day at 9 a.m. Kyiv time

  public constructor(
  ) {
  }

  public action = async () => {
    try {
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.log(`parseRSS ERROR: ${e.message}`);
      }
    }
  };
}

export default RssParser;
