# DB-II: Docker Environment for Python and Node Scripts

This project provides a Docker-based setup to run standalone **Python** and **Node.js** scripts, with a shared **MongoDB** instance.

---

## Requirements

- Docker
- Docker Compose
- (Linux only) GNU Make

---

## 🐧 Linux / macOS (with Make)

Use the `Makefile` for simplified commands.

### Build containers

```bash
make build
```

### Start services

```bash
make up
```

### Stop services

```bash
make down
```

### Run a Python script

```bash
make run_python script=path/to/script.py
```

### Run a Node.js script

```bash
make run_node script=path/to/script.js
```

### Open MongoDB shell

```bash
make mongosh
```

### Flush all databases (except admin, local, config)

```bash
make flush
```

---

## Windows (without Make)

Run these commands directly in PowerShell or CMD:

### Build

```bash
docker compose build
```

### Start

```bash
docker compose up -d
```

### Stop

```bash
docker compose down
```

### Run a Python script

```bash
docker compose run --rm -it python python path/to/script.py
```

### Run a Node script

```bash
docker compose run --rm -it node node path/to/script.js
```

### Open Mongo shell

```bash
docker compose run --rm -it mongo mongosh "mongodb://mongo:27017"
```

### Flush databases

```bash
docker compose exec mongo mongosh --quiet --eval "db.getMongo().getDBNames().forEach(function (d) { if (d !== 'admin' && d !== 'local' && d !== 'config') db.getSiblingDB(d).dropDatabase(); })"
```

---

## Notes

- Your scripts can be placed anywhere in the repo.
- MongoDB is available at `mongodb://mongo:27017` from inside the containers.
- Use `script=` argument to specify which script to run.
