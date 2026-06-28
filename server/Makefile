.PHONY: run build migrate

run:
	go run ./cmd/api

build:
	go build -o bin/api ./cmd/api

migrate:
	psql $$DATABASE_URL -f database/migrations/001_create_waitlist_emails.sql
