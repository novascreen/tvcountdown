import { Context } from '../utils';
import { User } from '../generated/prisma-client';

export default {
  favoriteShows: (parent: User, args, ctx: Context) =>
    ctx.db.user({ id: parent.id }).favoriteShows(),
};
