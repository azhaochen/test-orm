import {
  Column,
  DataType,
  Model,
  Table,
  CreatedAt,
  UpdatedAt,
} from "sequelize-typescript";

import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Table({ tableName: "users", timestamps: true })
export class User extends Model<User> {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    field: "real_name", // Need to specify the filed name !!!
  })
  realName: string;

  @Column({
    type: DataType.INTEGER,
    field: "real_age",
  })
  realAge: number;

  @Column({
    type: DataType.BIGINT,
    field: "driver_id",
  })
  driverID: string;

  @Field()
  @CreatedAt
  @Column({ field: "created_at" })
  createdAt: Date;

  @Field()
  @UpdatedAt
  @Column({ field: "updated_at" })
  updatedAt: Date;
}
