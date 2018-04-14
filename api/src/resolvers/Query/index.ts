import { getUserId, isLoggedIn, Context } from '../../utils';
import { getShowById, getEpisodeById, search } from '../../tvmaze/api';
import shows from './shows';
import scheduleAll from './scheduleAll';
import scheduleByDate from './scheduleByDate';
import scheduleFavorites from './scheduleFavorites';

export default {
  me(parent: any, args: any, ctx: Context, info: any) {
    const { auth0id } = isLoggedIn(ctx);
    console.log(args, info);
    return ctx.db.query.user({ where: { auth0id } }, info);
  },
  search(parent: any, { query }: { query: string }) {
    return search(query);
  },
  show(parent: any, { id }: { id: string }) {
    return getShowById(id);
  },
  shows,
  scheduleAll,
  scheduleByDate,
  scheduleFavorites,
  episode(parent: any, { id }: { id: string }) {
    return getEpisodeById(id);
  },
};
