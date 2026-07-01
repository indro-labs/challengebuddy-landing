.PHONY: run build migrate

run:
	go run ./cmd/api

build:
	go build -o bin/api ./cmd/api

migrate:
	for f in database/migrations/*.sql; do psql $$DATABASE_URL -f $$f; done
