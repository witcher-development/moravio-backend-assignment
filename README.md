## Description

Conway’s game of life wrapped into NestJS backend

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## How to use

```bash
# Templates endpoint
GET /templates

# Get next game state
POST /nextTurn

# Run game in terminal
1) In src/core/demo.ts uncomment play() call
2) Run 'ts-node ./demo.ts'
```


