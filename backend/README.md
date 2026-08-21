# Friends Manager API

Express and MongoDB API for the Friends Manager frontend.

## Setup

1. Copy `.env.example` to `.env` and replace every placeholder.
2. Use your MongoDB Atlas connection string for `MONGODB_URI` and set `CORS_ORIGIN` to the frontend URL.
3. Install dependencies with `npm install`.
4. Start the API with `npm start`.

## Seed data

Set `SEED_ADMIN_PASSWORD` in `.env`, then run `npm run seed`. This creates the test user `admin@test.com`, using the supplied password only to generate a bcrypt hash. The script does not add sample friends, so your directory stays personal.

## Endpoints

- `POST /api/login`
- `POST /api/register`
- `GET /api/friends`
- `GET /api/friends/:id`
- `POST /api/friends`

All friends endpoints require `Authorization: Bearer <token>`.
