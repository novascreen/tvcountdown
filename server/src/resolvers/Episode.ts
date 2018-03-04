import * as _get from 'lodash/get';

export default {
  show: episode => episode.show || _get(episode, '_embedded.show', null),
};
