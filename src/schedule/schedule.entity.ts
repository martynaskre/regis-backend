import { Business } from 'src/business/business.entity';
import { Days } from '../types';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('schedule')
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Business, (business) => business.schedules, {
    eager: true,
  })
  business: Business;

  @Column({
    type: 'smallint',
  })
  public weekDay: Days;

  @Column()
  public startHours: number;

  @Column()
  public finishHours: number;

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
