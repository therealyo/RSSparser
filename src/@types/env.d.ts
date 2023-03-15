declare namespace NodeJS {
    export interface ProcessEnv {
        NODE_ENV: 'production' | 'development';
        APP_PORT: number
        POSTGRES_HOST: string
        POSTGRES_PORT: number
        POSTGRES_USERNAME: string
        POSTGRES_PASSWORD: string
        POSTGRES_DATABASE: string
    }
}