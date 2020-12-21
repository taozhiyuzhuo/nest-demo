import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, BaseEntity } from 'typeorm';

export class BasicEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt?: Date;
}
