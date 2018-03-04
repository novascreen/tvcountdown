import { isLoggedIn, Context } from '../../utils';
import {
  getShowById,
  getEpisodeById,
  getScheduleByDate,
  search,
  getEpisodes,
} from '../../tvmaze/api';
import scheduleFavorites from './scheduleFavorites';
import scheduleByDate from './scheduleByDate';

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
  scheduleByDate,
  scheduleFavorites,
  episode(parent: any, { id }: { id: string }) {
    return getEpisodeById(id);
  },
};
