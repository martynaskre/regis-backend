import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLocaleLowerCase();
  }

  @Column({ select: false })
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
