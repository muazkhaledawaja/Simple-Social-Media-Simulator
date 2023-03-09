/* eslint-disable prettier/prettier */
import {
    Model,
    Table,
    Column,
    DefaultScope,
    DataType,
    PrimaryKey,
    AutoIncrement,
    ForeignKey,
} from 'sequelize-typescript';

import { Users } from '../users/user.model';

@DefaultScope({
    attributes: {
        exclude: ['deletedAt'],
    }
})
@Table({
    tableName: 'posts',
    timestamps: true,
    paranoid: true,
    underscored: true,
})
export class Posts extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;

    @ForeignKey(() => Users)
    @Column(DataType.INTEGER)
    userId: number;

    @Column(DataType.STRING)
    postContent: string;

    @Column(DataType.BOOLEAN)
    isCommentedAt: boolean;

    @Column(DataType.STRING)
    createdBy: number;

    @Column(DataType.STRING)
    updatedBy: number;

    @Column(DataType.DATE)
    createdAt: Date;

    @Column(DataType.DATE)
    updatedAt: Date;

    @Column(DataType.DATE)
    deletedAt: Date;

    @Column(DataType.STRING)
    deletedBy: string;
}