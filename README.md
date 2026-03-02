# Company API Docker Project

This is a Dockerized version of a previous class Node.js project (CompanyServices API).

## Project Structure

- `src/` contains all source code
- `Dockerfile` uses a **multi-stage builder** (`builder` + runtime)
- `docker-compose.yml` runs the API container

## Build and Run

From the `company-api-docker/` directory:

```bash
docker compose up --build
```

## Access

- Host: `localhost`
- Port: `8282`
- Base URL: `http://localhost:8282`
- API health/info route: `http://localhost:8282/CompanyServices`

## Stop

```bash
docker compose down
```
