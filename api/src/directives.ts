import { isLoggedIn } from './utils';

const isRequestingUserAlsoOwner = ({ ctx, userId, type, typeId }) =>
  ctx.db.exists[type]({ id: typeId, user: { id: userId } });

const directiveResolvers = {
  isAuthenticated: (next, source, args, ctx) => {
    isLoggedIn(ctx);
    return next();
  },
  isOwner: async (next, source, { type }, ctx) => {
    const { id: typeId } = ctx.request.body.variables;
    const { id: userId } = isLoggedIn(ctx);
    console.log('------------------------\nisOwner', ctx.request.body);
    const isOwner = await isRequestingUserAlsoOwner({
      ctx,
      userId,
      type,
      typeId,
    });
    if (isOwner) {
      return next();
    }
    throw new Error(`Unauthorized, must be owner`);
  },
};

export default directiveResolvers;
