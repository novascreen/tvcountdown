import * as jwt from 'jsonwebtoken';
import { Prisma } from '../generated/prisma-client'

export interface Context {
  db: Prisma;
  req: any;
}

export class AuthError extends Error {
  constructor() {
    super('Not authorized');
  }
}

export function getUserId(ctx: Context) {
  const Authorization = ctx.req.get('Authorization');
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const { userId } = jwt.verify(token, process.env.APP_SECRET) as {
      userId: string;
    };
    return userId;
  }

  throw new AuthError();
}

export const ctxUser = (ctx: Context) => ctx.req.user;

export const isLoggedIn = (ctx: Context) => {
  if (!ctx.req.user) throw new Error(`Not logged in`);
  return ctxUser(ctx);
};

export const combineResults = (results: any[]) =>
  results.reduce((a, b) => a.concat(b), []);