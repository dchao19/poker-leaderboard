# Poker Leaderboard

![screenshot](https://i.imgur.com/pNmyh2O.png)

## Building and Running the Client

#### Technologies and Libraries Used

- Typescript
- React v16.4
- Redux, React-Redux, Redux-Saga, and Redux-Logger
- React-bootstrap

The client was bootstrapped with create-react-app and has not been ejected. As such, all create-react-app commands are still valid in the `client` directory of the main repository. To start a local dev server, change to the `client` directory and first install its dependencies: `yarn install` and then use the command `yarn start`. The frontend relies on the backend information supplied in `client/src/api/apiUrls`.

To build the project for production: use `yarn build`. Build artifacts are located in client/build.

## Building and Running the Server

#### Technologies and Libraries Used

- Typescript
- Node v10.3
- Express
- MongoDB for Node.js

Before attempting to build and run the server, update database connection information in `server/src/db.ts`. Connections to the database at this time are unencrypted. To start a local dev server change into the `server` directory, and first verify the connection to the database and install server-side dependencies with `yarn install`. Then, use `yarn start` to start the server in watch mode.

To build the server without running it, use `yarn build`. Build artifacts are located in `server/build`.

To populate the database with fake records for testing purposes, use `yarn run populate`.
