import { ProviderEntity } from '../provider/provider.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('businesses')
export class Business {
  @OneToOne(
    () => ProviderEntity,
    (provider: ProviderEntity) => provider.business,
  )
  provider: ProviderEntity;

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

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
