import { Business } from '../business/business.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('providers')
export class ProviderEntity {

  @OneToOne(() => Business)
  @JoinColumn()
  business: Business;

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column({
    unique: true,
  })
  phoneNumber: string;

  @Column()
  isLegalEntity: boolean;

  @Column({
    nullable: true,
  })
  companyName!: string;

  @Column()
  code: string;

  @Column({
    nullable: true,
  })
  vatCode!: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'NOW()',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'NOW()',
    onUpdate: 'NOW()',
  })
  public updatedAt: Date;
}
