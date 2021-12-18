import { Business } from 'src/business/business.entity';
import { Client } from 'src/client/client.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('provider_bookings')
export class ProviderBooking {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Client, (client) => client.clientBookings)
  provider: Client;

  @ManyToOne(() => Business, (business) => business.providerBookings)
  business: Business;

  @CreateDateColumn({
    type: 'timestamp',
  })
  public reservedTime: Date;

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
