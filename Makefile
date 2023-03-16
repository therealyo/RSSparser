POSTGRES_HOST = localhost
POSTGRES_PORT = 5432
POSTGRES_USER = postgres
POSTGRES_PASSWORD = password
POSTGRES_DB = rss_parser
database = postgres://$(POSTGRES_USER):$(POSTGRES_PASSWORD)@$(POSTGRES_HOST):$(POSTGRES_PORT)/$(POSTGRES_DB)?sslmode=disable

# ------------------------------------------------------NPM commands----------------------------------------------------

.PHONY: lint
lint: 
	npm run lint

.PHONY: migrate
migrate:
	npm run migration

.PHONY: build
build:
	npm run build

.PHONY: start
	npm run start

# ---------------------------------------------------Docker commands----------------------------------------------------

.PHONY: run-database
run-database:
	docker run --name my-postgres -e POSTGRES_USER=$(POSTGRES_USER) -e POSTGRES_PASSWORD=$(POSTGRES_PASSWORD) -e POSTGRES_DB=$(POSTGRES_DB) -p 5432:5432 -d postgres:13

.PHONY: build-docker
build-docker: 
	docker build -t rss-parser:latest

.PHONY: start-docker
start-docker: 
	docker run --name rss-parser -p 5000:5000 -d rss-parser:latest

# -----------------------------------------------Docker compose commands------------------------------------------------
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