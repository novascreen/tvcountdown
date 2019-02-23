import { isLoggedIn, Context } from './utils';

const isRequestingUserAlsoOwner = ({
  ctx,
  userId,
  type,
  typeId,
}: {
  ctx: Context;
  userId: any;
  type: any;
  typeId: any;
}) => ctx.db.$exists[type]({ id: typeId, user: { id: userId } });

const directiveResolvers = {
  isAuthenticated: (next, source, args, ctx: Context) => {
    isLoggedIn(ctx);
    return next();
  },
  isOwner: async (next, source, { type }, ctx: Context) => {
    const { id: typeId } = ctx.req.body.variables;
    const { id: userId } = isLoggedIn(ctx);
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
