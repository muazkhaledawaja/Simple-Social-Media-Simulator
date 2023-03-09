/* eslint-disable prettier/prettier */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { PROVIDERS, CONFIG } from "src/common/constants";
import { Sequelize } from "sequelize-typescript";
import { ConfigService } from "@nestjs/config";
import { Users } from "src/modules/users/user.model";
import { Posts } from "src/modules/posts/post.model";
import { Comments } from "src/modules/comments/comment.model";

export const databaseProviders = [
    {
        provide: PROVIDERS.DATABASE_PROVIDER,
        useFactory: (configService: ConfigService) => {
            const sequelize =  new Sequelize( {
                "username": "root",
              //this not thw password
                "password": "root",
                "database": "test",
                "host": "127.0.0.1",
                "dialect": "mysql"
              })
            sequelize.addModels([Users, Posts, Comments])
            return sequelize
        },
        imports: [ConfigService]
    }
]