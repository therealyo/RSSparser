# RssParser

---

### BaseUrl

`http://18.134.182.196`

---
### Environment

1. `NODE_ENV` - variable that determines whether app is in development mode or in production
2. `APP_PORT` - port on which application is running(default - 5000)
3. `POSTGRES_HOST` - postgres database host
4. `POSTGRES_PORT` - postgres database port
5. `POSTGRES_USERNAME` - postgres database username
6. `POSTGRES_PASSWORD` - postgres database password
7. `POSTGRES_DATABASE` - postgres database (default - `rss_parser`)

##### Notice
If you want to run it locally using docker-compose you don't need to set environment variables in `.env` \
All required variables are set in `.env.example`

---

### Commands

To start application locally using local postgres dastabase run `make run`

<!-- To access swagger docs visit `http://18.134.182.196/swagger/index.html` -->
