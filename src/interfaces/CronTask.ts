export interface CronTask {
    interval: string
    action: () => void
}