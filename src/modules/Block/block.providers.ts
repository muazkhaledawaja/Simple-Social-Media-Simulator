/* eslint-disable prettier/prettier */
import { Block } from './block.model';
import { PROVIDERS } from '../../common/constants';


export const blockProvider = [
    {
        provide: PROVIDERS.BLOCK_PROVIDER,
        useValue: Block,
    },
 
];


