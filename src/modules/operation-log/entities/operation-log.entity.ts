import { Column, Entity } from 'typeorm';
import { BasicEntity } from '@/common/BasicEntity';

@Entity('operationLog')
export class OperationLog extends BasicEntity {
  @Column('varchar', { comment: '操作人' })
  operator: string;

  @Column('varchar', { comment: '调用的方法' })
  method: string;

  @Column('varchar', { comment: '操作名称' })
  operation: string;

  @Column('varchar', { comment: '数据库表名' })
  entity: string;

  @Column('varchar')
  entityId: string;

  @Column('json', { nullable: true })
  oldEntity: Record<string, any>;

  @Column('json')
  newEntity: Record<string, any>;
}
