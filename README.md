# TVCountdown

[![Greenkeeper badge](https://badges.greenkeeper.io/novascreen/tvcountdown.svg)](https://greenkeeper.io/)

## Getting started

Install dependencies

```bash
npm ci
```

This will install dependencies for managing the monorepo as well as the individual packages via `lerna bootstrap`.

Set up `.env` files for Prisma and Auth0 connections:

```
<!-- TODO -->
```

Start app and API:

```bash
npm start
```

Alternatively you can start go to `packages/app` and `packages/graphql` individually and run `npm start` in both of them.
