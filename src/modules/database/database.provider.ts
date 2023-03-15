/* eslint-disable prettier/prettier */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { PROVIDERS, CONFIG } from "src/common/constants";
import { Sequelize } from "sequelize-typescript";
import { ConfigService } from "@nestjs/config";
import { Users } from "src/modules/users/user.model";
import { Posts } from "src/modules/posts/post.model";
import { Comments } from "src/modules/comments/comment.model";



export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize({
        ...configService.get('database'),
      });
      sequelize.addModels([Users, Posts, Comments]);
      console.log(sequelize.models);
      return sequelize;
    },
  },
];