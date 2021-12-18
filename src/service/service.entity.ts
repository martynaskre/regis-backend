import { Business } from '../business/business.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ClientBooking } from 'src/booking/clientBooking.entity';

@Entity('services')
export class Service {
  @ManyToOne(() => Business, (business) => business.services)
  business: Business;

  @OneToMany(() => ClientBooking, (clientBooking) => clientBooking.service)
  clientBookings: ClientBooking[];

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

  @Column()
  public duration: number;

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
