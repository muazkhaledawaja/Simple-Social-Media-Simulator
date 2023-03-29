/* eslint-disable prettier/prettier */
import { Posts } from './post.model';

import { PROVIDERS } from '../../common/constants';

export const postProvider = [
  {
    provide: PROVIDERS.POSTS_PROVIDER,
    useValue: Posts,
  },
];
