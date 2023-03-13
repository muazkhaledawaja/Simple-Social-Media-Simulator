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
    HasMany     
} from 'sequelize-typescript';
import { ROLES } from 'src/common/enum';
import { Posts } from '../posts/post.model';

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

    @HasMany(() => Posts)
    posts: Posts[];

}
