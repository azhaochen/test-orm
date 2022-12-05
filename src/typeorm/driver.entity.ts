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

export interface Driver {
  id: number | string;
  realName?: string;
  realAge?: number;
  userID?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * User Entity, user info
 */
@Entity("drivers")
export class DriverEntity extends BaseEntity implements Driver {
  constructor(params?: Partial<Driver>) {
    super();
    Object.assign(this, params);
  }

  @PrimaryGeneratedColumn()
  id: number | string;

  @Column({ nullable: true })
  realName: string;

  @Column({ nullable: true })
  realAge: number;

  @Column({ nullable: true })
  userID: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
