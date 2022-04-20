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

import { UserEntity } from './user.entity';

@Entity('test')
export class TestEntity {
  //   @PrimaryGeneratedColumn('uuid')
  //   id: string;

  @PrimaryColumn('uuid')
  user_id: string;

  @Column()
  options: string;

  @OneToOne((type) => UserEntity, (user) => user.extendedOptions)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id' // это в UserEntity должна быть колонка
  })
  user: UserEntity;
}
