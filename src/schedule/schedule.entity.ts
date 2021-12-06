import { Business } from 'src/business/business.entity';
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

  //many to one with bussiness
  @ManyToOne(() => Business, (business) => business.schedules)
  business: Business;

  @Column()
  public weekDay: string;

  @Column()
  public startHours: string;

  @Column()
  public finishHours: string;
  
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
