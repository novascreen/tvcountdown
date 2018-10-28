const getUser = async (req, res, next, db) => {
  console.log('USER', req.user);
  if (!req.user) return next();
  try {
    const user = await db.query.user({
      where: { auth0id: req.user.sub.split(`|`)[1] },
    });
    req.user = { token: req.user, ...user };
    console.log('DB USER', req.user);
  } catch (e) {
    delete req.user;
    console.error(e);
  }
  next();
};

export default getUser;
