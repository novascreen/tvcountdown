import { Context } from '../utils';
import { UserNode } from '../generated';

export default {
  medium: image => image.medium.replace('http://', 'https://'),
  original: image => image.medium.replace('http://', 'https://'),
};
