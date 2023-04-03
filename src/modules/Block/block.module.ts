/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { BlockController } from './block.controller';
import { BlockService } from './block.service';
import { blockProvider } from './block.providers';
import { UserService} from '../users/user.service';
import { UserModule } from './../users/user.module';

@Module({
   imports: [UserModule],
    controllers: [BlockController],
    providers: [BlockService , ...blockProvider],
    exports: [BlockService],
  
})
export class BlockModule { }
