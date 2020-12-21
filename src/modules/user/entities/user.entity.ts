import { BasicEntity } from '@/common/BasicEntity';
import { Column, Entity } from 'typeorm';

@Entity('user')
export class user extends BasicEntity {
  @Column('varchar')
  username: string;

  @Column('varchar')
  password: string;
}
