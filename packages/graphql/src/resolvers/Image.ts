import { Context } from '../utils';

export default {
  medium: image => image.medium.replace('http://', 'https://'),
  original: image => image.medium.replace('http://', 'https://'),
};
