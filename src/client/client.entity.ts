import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  pasword: string;

  @Column()
  phoneNumber: number;

  @CreateDateColumn({
    default: new Date(),
  })
  public createdAt: Date;

  @UpdateDateColumn({
    default: new Date(),
    onUpdate: 'new Date()',
  })
  public updatedAt: Date;
}
