const getUser = async (req, res, next, db) => {
  console.log('USER', req.user);
  if (!req.user) return next();
  const user = await db.query.user({
    where: { auth0id: req.user.sub.split(`|`)[1] },
  });
  req.user = { token: req.user, ...user };
  next();
};

export default getUser;
