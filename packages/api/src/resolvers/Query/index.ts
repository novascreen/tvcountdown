import { getUserId, isLoggedIn, Context } from '../../utils';
import {
  getShowById,
  getEpisodeById,
  search,
  getShowEpisodes,
} from '../../tvmaze/api';
import shows from './shows';
import scheduleAll from './scheduleAll';
import scheduleByDate from './scheduleByDate';
import scheduleFavorites from './scheduleFavorites';

export default {
  me(parent: any, args: any, ctx: Context, info: any) {
    const { auth0id } = isLoggedIn(ctx);
    return ctx.db.user({ auth0id });
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
  episodes(parent: any, { showId }: { showId: string }) {
    return getShowEpisodes(showId);
  },
};
