import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class User extends Model<any> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    fullName: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    userName: string;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string;
}