/* eslint-disable prettier/prettier */
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