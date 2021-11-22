import { Client } from 'src/client/client.entity';
import { Service } from 'src/service/service.entity';
import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('client_bookings')
export class ClientBooking {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Client, (client) => client.clientBookings)
  client: Client;

  @ManyToOne(() => Service, (service) => service.clientBookings)
  service: Service;

  @CreateDateColumn({
    type: 'timestamp',
  })
  public reservedTime: Date;

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
