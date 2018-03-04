import { Prisma } from '../generated/prisma';

export interface Context {
  db: Prisma;
  request: any;
}

export const combineResults = (results: any[]) =>
  results.reduce((a, b) => a.concat(b), []);

export const ctxUser = ctx => ctx.request.user;

export const isLoggedIn = ctx => {
  if (!ctx.request.user) throw new Error(`Not logged in`);
  return ctxUser(ctx);
};
