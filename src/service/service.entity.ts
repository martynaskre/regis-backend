import { Business } from '../business/business.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Service')
export class Service {
    @ManyToOne(() => Business, (business) => business.services)
    business: Business ;
 
}
