import { Prisma } from './generated/prisma';

export interface Context {
  db: Prisma;
  request: any;
}

export const combineResults = (results: any[]) =>
  results.reduce((a, b) => a.concat(b), []);
