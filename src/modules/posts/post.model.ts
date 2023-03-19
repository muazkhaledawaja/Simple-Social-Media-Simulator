/* eslint-disable prettier/prettier */
import {
    Model,
    Table,
    Column,
    DataType,
    PrimaryKey,
    AutoIncrement,
    ForeignKey,
    Scopes,
 
} from 'sequelize-typescript';
import * as moment from 'moment';
 


import { Users } from '../users/user.model';

 
@Table({
    tableName: 'posts',
    timestamps: true,
    paranoid: true,
    underscored: true,
 
})

@Scopes(() => {
    return {
      basic: {
        attributes: {
          exclude: [
            'updatedAt',
            'createdAt',
            'updatedBy',
            'deletedAt',
            'deletedBy',
          ],
        },
      },
    };
  })
export class Posts extends Model<Posts> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;

    @ForeignKey(() => Users)
    @Column({ field: 'userId', type: DataType.INTEGER })
    userId: number;

    @Column({ field: 'postContent', type: DataType.STRING })
    postContent: string;

    
    @Column({ field: 'createdBy', type: DataType.STRING })
    createdBy: string;

    @Column({ field: 'updatedBy', type: DataType.STRING })
    updatedBy: string;

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
 

    @Column({
        field: 'deletedBy',
        type: DataType.STRING,
    })
    deletedBy: string;

    
 

}