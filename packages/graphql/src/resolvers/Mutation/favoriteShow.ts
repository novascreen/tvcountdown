import { isLoggedIn, Context } from '../../utils';

export default {
  createFavoriteShow: async (
    parent: any,
    { tvmaze }: any,
    ctx: Context,
    info: any,
  ) => {
    const { id } = isLoggedIn(ctx);
    return ctx.db.updateUser({
      where: { id },
      data: { favoriteShows: { create: [{ tvmaze }] } },
    });
  },
  deleteFavoriteShow: async (
    parent: any,
    data: any,
    ctx: Context,
    info: any,
  ) => {
    const { id } = isLoggedIn(ctx);
    return ctx.db.updateUser({
      where: { id },
      data: { favoriteShows: { delete: [{ id: data.id }] } },
    });
  },
};
