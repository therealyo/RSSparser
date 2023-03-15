POSTGRES_HOST = localhost
POSTGRES_PORT = 5432
POSTGRES_USER = postgres
POSTGRES_PASSWORD = password
POSTGRES_DB = rss-parser
database = postgres://$(POSTGRES_USER):$(POSTGRES_PASSWORD)@$(POSTGRES_HOST):$(POSTGRES_PORT)/$(POSTGRES_DB)?sslmode=disable


# -----------------------------------------------Docker compose commands------------------------------------------------
# First, run `docker-compose up` to start application, than `make migrations-up` to add schemas and tables
.PHONY: run
run:
	docker-compose up

.PHONY: restart
restart:
	docker-compose up --build

.PHONY: restart-app
restart-app:
	docker-compose up -d --no-deps --build app

.PHONY: stop
stop:
	docker-compose down