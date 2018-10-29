import { Prisma } from '../generated';

const getUser = async (req, res, next, db: Prisma) => {
  if (!req.user) return next();
  try {
    const user = await db.user({
      auth0id: req.user.sub.split(`|`)[1],
    });
    req.user = { token: req.user, ...user };
  } catch (e) {
    delete req.user;
  }
  next();
};

export default getUser;
