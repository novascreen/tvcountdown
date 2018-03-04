import { isLoggedIn } from '../../utils';

export default async function deleteFavoriteShow(
  parent: any,
  data: any,
  ctx: any,
  info: any,
) {
  const { id } = isLoggedIn(ctx);
  return ctx.db.mutation.updateUser(
    {
      where: { id },
      data: { favoriteShows: { delete: [{ id: data.id }] } },
    },
    info,
  );
}
