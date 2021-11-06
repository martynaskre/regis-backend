import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity('businesses')
  export class Business {

    
  
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
  