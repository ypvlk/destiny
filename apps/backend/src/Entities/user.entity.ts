import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToOne,
  PrimaryColumn
} from 'typeorm';

import { TestEntity } from './test.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  // @CreateDateColumn({
  //   type: 'timestamp without time zone',
  //   default: () => `timezone('UTC'::text, now())`,
  // })
  // createdAt: Date;

  // @UpdateDateColumn({
  //   type: 'timestamp without time zone',
  //   default: () => `timezone('UTC'::text, now())`,
  // })
  // updatedAt: Date;

  @OneToOne(() => TestEntity, (options) => options.user, { cascade: true })
  extendedOptions: TestEntity;

  constructor(id: string, email: string, password: string) {
    this.id = id;
    this.email = email;
    this.password = password;
  }
}
