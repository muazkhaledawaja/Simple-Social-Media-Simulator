/* eslint-disable prettier/prettier */
import { PROVIDERS } from '../../common/constants';

import { Comments } from './comment.model';

export const commentProvider = [
  {
    provide: PROVIDERS.COMMENTS_PROVIDER,
    useValue: Comments,
  },
];
