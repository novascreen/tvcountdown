import { isLoggedIn } from '../../utils';

export default {
  createFavoriteShow: async (
    parent: any,
    { tvmaze }: any,
    ctx: any,
    info: any,
  ) => {
    const { id } = isLoggedIn(ctx);
    return ctx.db.mutation.updateUser(
      { where: { id }, data: { favoriteShows: { create: [{ tvmaze }] } } },
      info,
    );
  },
  deleteFavoriteShow: async (parent: any, data: any, ctx: any, info: any) => {
    const { id } = isLoggedIn(ctx);
    return ctx.db.mutation.updateUser(
      {
        where: { id },
        data: { favoriteShows: { delete: [{ id: data.id }] } },
      },
      info,
    );
  },
};
