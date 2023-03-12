/* eslint-disable prettier/prettier */
import * as moment from 'moment';

import {
    Model,
    Table,
    Column,
    Scopes,
    DataType,
    PrimaryKey,
    AutoIncrement,
    Unique,
    DefaultScope,
} from 'sequelize-typescript';
import { ROLES } from 'src/common/enum';

@DefaultScope({
    attributes: {
        exclude: ['deletedAt'],
    },
})
@Scopes({
    basic: {
        attributes: {
            exclude: ['deletedAt', 'password'],
        },
    },
})
@Table({
    tableName: 'users',
    timestamps: true,
    paranoid: true,
    underscored: true,
})
export class Users extends Model<Users> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;

    @Unique
    @Column(DataType.STRING)
    username: string;

    @Column(DataType.STRING)
    password: string;

    @Column(DataType.ENUM(ROLES.ADMIN, ROLES.USER))
    role: ROLES;

    @Column(DataType.STRING)
    email: string;

    // make the column felid name as firstName
    @Column({ field: 'createdBy', type: DataType.STRING })
    createdBy: number;

    @Column({ field: 'updatedBy', type: DataType.STRING })
    updatedBy: number;

    @Column({ field: 'createdAt',
     type: DataType.STRING,
    defaultValue: moment().format('YYYY-MM-DD HH:mm:ss') })
    createdAt: Date;

    @Column({ field: 'updatedAt',
     type: DataType.STRING,
     defaultValue: moment().format('YYYY-MM-DD HH:mm:ss') })
    updatedAt: Date;

    @Column({
        field: 'deletedAt',
        type: DataType.STRING,
        defaultValue: moment().format('YYYY-MM-DD HH:mm:ss')
    })
    deletedAt: Date;
    // i want to put default value as new Date()  

    @Column({
        field: 'deletedBy',
        type: DataType.STRING,
        defaultValue: moment().format('YYYY-MM-DD HH:mm:ss'),
    })
    deletedBy: string;

}

/*npx sequelize-cli model:generate --name Posts --attributes commentContent:string,isCommentedAt:boolean,userId:integer,postId:integer,createdBy:integer,updatedBy:integer,commentTime:Date,createdAt:Date,updatedAt:Date,deletedAt:Date,deletedBy:string */