import { Business } from '../business/business.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Service')
export class Service {
  @ManyToOne(() => Business, (business) => business.services)
  business: Business;

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  minPrice: number;

  @Column({
    nullable: true,
  })
  maxPrice: number;

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
