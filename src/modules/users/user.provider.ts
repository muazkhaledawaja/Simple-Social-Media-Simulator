/* eslint-disable prettier/prettier */
import { Users } from './user.model';

import { PROVIDERS } from '../../common/constants';

export const userProvider = [
  {
    provide: PROVIDERS.USERS_PROVIDER,
    useValue: Users,
  },
];
