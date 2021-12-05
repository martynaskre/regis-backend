import { ProviderEntity } from '../provider/provider.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Service } from '../service/service.entity';
import { ProviderBooking } from 'src/booking/providerBooking.entity';
import { CategoryEntity } from '../category/category.entity';

@Entity('businesses')
export class Business {
  @OneToOne(() => ProviderEntity, (provider) => provider.business)
  @JoinColumn()
  provider: ProviderEntity;

  @OneToMany(() => Service, (service) => service.business)
  services: Service[];

  @OneToMany(
    () => ProviderBooking,
    (providerBooking) => providerBooking.business,
  )
  providerBookings: ProviderBooking[];

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({
    unique: true,
    nullable: true,
  })
  slug: string;

  @Column()
  addressCountry: string;

  @Column()
  addressCity: string;

  @Column()
  addressStreet: string;

  @Column()
  addressHouseNumber: string;

  @Column()
  addressPostCode: string;

  @Column()
  shortDescription: string;

  @Column()
  longDescription: string;

  @ManyToOne(() => CategoryEntity)
  @JoinColumn()
  category: CategoryEntity;

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
