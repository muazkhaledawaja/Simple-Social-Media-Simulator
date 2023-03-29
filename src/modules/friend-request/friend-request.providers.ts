/* eslint-disable prettier/prettier */
import { FriendRequest } from './friend-request.model';
import { PROVIDERS } from '../../common/constants';



export const friendRequestProvider = [
    {
        provide: PROVIDERS.FRIEND_REQUEST_PROVIDER,
        useValue: FriendRequest,
    },
];


