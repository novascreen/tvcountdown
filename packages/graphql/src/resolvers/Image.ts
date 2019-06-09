import { Context } from '../utils';
import { ImageResolvers } from '../types';

const Image: ImageResolvers = {
  medium: image => image.medium.replace('http://', 'https://'),
  original: image => image.medium.replace('http://', 'https://'),
};

export default Image;
