import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
  JoinColumn,
  getConnection,
  MoreThan,
} from "typeorm";

export interface User {
  id: number | string;
  realName?: string;
  realAge?: number;
  driverID?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * User Entity, user info
 */
@Entity("users")
export class UserEntity extends BaseEntity implements User {
  constructor(params?: Partial<User>) {
    super();
    Object.assign(this, params);
  }

  @PrimaryGeneratedColumn()
  id: number | string;

  @Column({ nullable: true })
  realName: string; // No need to specify the filed name, because of SnakeNamingStrategy

  @Column({ nullable: true })
  realAge: number;

  @Column({ nullable: true })
  driverID: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
