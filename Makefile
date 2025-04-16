# Build configuration
# -------------------

APP_NAME = "DB-II"
GIT_REVISION = `git rev-parse HEAD`

# -------------------
#
.PHONY: build up down run flush recreate

build:
	docker compose build

up:
	docker compose up -d

down:
	docker compose down

run:
	@clear
	@echo "Running script: $(script)"
	docker compose run --rm -it python python $(script)

run_node:
	@clear
	@echo "Running script: $(script)"
	docker compose run --rm -it node node $(script)

flush:
	@echo "Flushing the database..."
	docker compose exec mongo mongosh --quiet --eval 'db.getMongo().getDBNames().forEach(function (d) { if (d !== "admin" && d !== "local" && d !== "config") db.getSiblingDB(d).dropDatabase(); })'
