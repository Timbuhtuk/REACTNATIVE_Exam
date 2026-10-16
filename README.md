# Library App

A coursework project with an Expo/React Native client and an Express backend using MongoDB through Mongoose.

## Repository layout

- `library-front-end/` — mobile and web client, navigation, and API requests.
- `library-back-end/` — Express server and database integration.

## Getting started

Install dependencies in each project directory with `npm install`. In `library-front-end/`, run `npm start` to open Expo, or use `npm run android`, `npm run ios`, or `npm run web`.

Before testing, update the backend IP address in `library-front-end/src/config/axiosConfig.js` so the client can reach your server. The backend requires its own environment and database configuration.
