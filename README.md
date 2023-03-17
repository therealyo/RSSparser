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

<!-- To access swagger docs visit `http://18.134.182.196/docs` -->
Don't know why, but swagger doc does not show on remote server. So to see documentation go to `http://localhost:APP_PORT/docs` when running locally


##### Additional info to documentation

Don't know why(probably some mistakes in openapi specification that I wrote), but swagger does not show query params for search endpoint, that's why I will leave them here: \

1. search: `string` - represents information that was entered for search(you can search by title, creator or content)
2. categories: `array[string]` - list of categories that you are looking for
3. sort: `string` - how to sort data, MUST BE one of possible values `['alph.asc', 'alph.desc', 'date.asc', 'date.desc']`
4. page: `number`- current page
5. pageSize: `number` - how many items to show on one page
---