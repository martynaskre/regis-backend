import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('password_resets')
export class PasswordResetEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  public email: string;

  @Column()
  public type: string;

  @Column()
  public token: string;

  @CreateDateColumn({
    type: 'timestamp',
  })
  public expiresAt: Date;
}
