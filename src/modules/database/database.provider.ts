/* eslint-disable prettier/prettier */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { PROVIDERS, CONFIG } from "src/common/constants";
import { Sequelize } from "sequelize-typescript";
import { ConfigService } from "@nestjs/config";
import { Users } from "../../modules/users/user.model";
import { Posts } from "../../modules/posts/post.model";
import { Comments } from "../../modules/comments/comment.model";
import { FriendRequest } from "../../modules/friend-request/friend-request.model";
import { Block } from "modules/Block/block.model";



export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize({
        ...configService.get('database'),
      });
      sequelize.addModels([Users, Posts, Comments,FriendRequest,Block]);
    },
  },
];