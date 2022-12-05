import {
  Column,
  DataType,
  Model,
  Table,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
} from "sequelize-typescript";

import { Field, ObjectType } from "type-graphql";

import { User } from "./user";

@ObjectType()
@Table({ tableName: "drivers", timestamps: true })
export class Driver extends Model<Driver> {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    field: "real_name",
  })
  realName: string;

  @Column({
    type: DataType.INTEGER,
    field: "real_age",
  })
  realAge: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.BIGINT, allowNull: false, field: "user_id" })
  userID: string;

  @Field()
  @CreatedAt
  @Column({ field: "created_at" })
  createdAt: Date;

  @Field()
  @UpdatedAt
  @Column({ field: "updated_at" })
  updatedAt: Date;
}
