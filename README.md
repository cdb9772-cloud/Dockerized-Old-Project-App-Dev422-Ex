# Project 3: Dockerized CompanyServices API

## Overview
This repository contains a Dockerized version of a previous course project: a Node.js/Express API named **CompanyServices**.

The assignment requirements are met by:
- Using a Docker project with both a `Dockerfile` and `docker-compose.yml`
- Using a **multi-stage builder** image (`builder` stage + runtime stage)
- Keeping project source code in an appropriate subfolder (`src/`)

## Tech Stack
- Node.js 20 (Alpine base image)
- Express
- Morgan
- Docker + Docker Compose

## Project Structure
- `Dockerfile` : Multi-stage build configuration
- `docker-compose.yml` : Container orchestration and port mapping
- `src/server.js` : Express API entry point
- `src/companydata/` : Data layer library used by the API
- `.dockerignore` : Excludes unnecessary files from build context

## Multi-Stage Builder Details
The container is built in two stages:

1. `builder` stage
- Uses `node:20-alpine`
- Installs dependencies
- Copies source code

2. `runtime` stage
- Uses `node:20-alpine`
- Copies only the built app dependencies and source from `builder`
- Runs `node src/server.js`

This keeps the final runtime image cleaner and aligned with modern build practices.

## How to Run
From this folder (`company-api-docker`):

```bash
docker compose up --build
```

## How to Access
- Host: `localhost`
- Port: `8282`
- Base URL: `http://localhost:8282`

Useful endpoints:
- `GET /` -> `http://localhost:8282/`
- `GET /CompanyServices` -> `http://localhost:8282/CompanyServices`
- `DELETE /CompanyServices/company?company=<companyName>`

Example:
```bash
curl "http://localhost:8282/CompanyServices"
```

## How to Stop
```bash
docker compose down
```

## Notes for Grading
- Primary app container is configured with a **builder** (`FROM node:20-alpine AS builder`)
- Source code is under `src/` as required
- Container is exposed on host port `8282`
