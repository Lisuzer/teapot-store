import {Column, DataType, Model, Table} from "sequelize-typescript";
import { StatusName } from "./status-name.enum";

interface UserCreationAtrrs{
    email: string;
    password: string;
    status:string;
}

@Table({tableName:'users'})
export class User extends Model<User, UserCreationAtrrs>{
    @Column({type: DataType.UUIDV4, unique:true, autoIncrement: true, primaryKey: true})
    id:number;

    @Column({type: DataType.STRING, unique:false, allowNull: false})
    name: string;

    @Column({type: DataType.STRING, unique:false, allowNull: false})
    surname: string;

    @Column({type: DataType.STRING, unique:true, allowNull: false})
    email: string;

    @Column({type: DataType.STRING, unique:false, allowNull: false})
    password:string;

    @Column({type: DataType.DATEONLY, unique:false, allowNull: false})
    birthDate:string

    @Column({type:DataType.ENUM, unique:false, allowNull: false})
    status:StatusName;
}