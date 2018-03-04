import { isLoggedIn } from '../../utils';

export default async function createFavoriteShow(
  parent: any,
  { tvmaze }: any,
  ctx: any,
  info: any,
) {
  const { id } = isLoggedIn(ctx);
  return ctx.db.mutation.updateUser(
    { where: { id }, data: { favoriteShows: { create: [{ tvmaze }] } } },
    info,
  );
}
