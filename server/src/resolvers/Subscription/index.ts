import { isLoggedIn, Context } from '../../utils';

export default {
  me: {
    subscribe(parent: any, args: any, ctx: Context, info: any) {
      const { auth0id } = isLoggedIn(ctx);
      console.log(args, info);
      return ctx.db.subscription.user(
        { where: { mutation_in: ['UPDATED'], node: { auth0id } } },
        info,
      );
    },
  },
};
