import { User } from '../../users/entities/user.entity';
import {
  AfterInsert,
  Column,
  CreateDateColumn,
  Entity,
  InsertEvent,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Setting } from './setting.entity';
import { Domain } from '../../domains/entities/domain.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @OneToMany(() => User, (user) => user.company)
  users: User[];

  @OneToOne(() => Setting)
  setting: Setting;

  @OneToMany(() => Domain, (domain) => domain.company)
  domains: Domain[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updatedAt: Date;
}
