import { Context } from '../utils';
import { UserNode } from '../generated';

export default {
  favoriteShows: (parent: UserNode, args, ctx: Context) =>
    ctx.db.user({ id: parent.id }).favoriteShows(),
};
