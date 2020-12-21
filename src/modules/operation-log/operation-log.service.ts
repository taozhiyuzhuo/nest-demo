import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { OperationLog } from './entities/operation-log.entity';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InsertEvent, RemoveEvent, UpdateEvent } from 'typeorm';

@Injectable()
export class OperationLogService extends TypeOrmCrudService<OperationLog> {
  public operator: string;
  public context: ExecutionContext;

  constructor(private readonly reflector: Reflector, @InjectRepository(OperationLog) repo) {
    super(repo);
  }

  async save<T extends { id: string | number }>(event: UpdateEvent<T> | RemoveEvent<T> | InsertEvent<T>) {
    const handler = this.context.getHandler();
    const operation = this.reflector.get('operation-log', handler);
    //TODO 重构
    if ('databaseEntity' in event && 'updatedColumns' in event) {
      const { entity, databaseEntity } = event;
      const data = {
        operator: this.operator,
        oldEntity: databaseEntity,
        newEntity: entity,
        method: handler.name,
        operation: operation,
        entityId: String(entity.id),
        entity: event.metadata.tableName,
      };
      if (event.updatedColumns.length > 0) {
        return await this.repo.save(data);
      }
    }

    const { entity } = event;
    const data = {
      operator: this.operator,
      newEntity: entity,
      method: handler.name,
      operation: operation,
      entity: event.metadata.tableName,
      entityId: String(entity.id),
    };
    await this.repo.save(data);
  }
}
