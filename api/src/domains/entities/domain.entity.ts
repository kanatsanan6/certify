import { Company } from '../../companies/entities/company.entity';
import { User } from '../../users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum DomainStatus {
  VALID = 'valid',
  INVALID = 'invalid',
}

@Entity()
export class Domain {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  url: string;

  @Column({ type: 'enum', enum: DomainStatus, default: DomainStatus.INVALID })
  status: DomainStatus;

  @Column({ type: 'timestamp', nullable: true })
  lastCheckedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  expiresAt: Date;

  @Column({ type: 'varchar', nullable: true })
  issurer: string;

  @Column({ type: 'text', nullable: true })
  errorMessage: string;

  @ManyToOne(() => Company, (company) => company.domains)
  company: Company;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
