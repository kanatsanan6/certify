import { Company } from '../../companies/entities/company.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  encryptedPassword: string;

  @ManyToOne(() => Company, (company) => company.users)
  company: Company;
}
