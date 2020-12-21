import { Connection, EntitySubscriberInterface, InsertEvent, UpdateEvent } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { OperationLogService } from '@/modules/operation-log/operation-log.service';
import { user } from '@/modules/user/entities/user.entity';

@Injectable()
export class UserSubscriber implements EntitySubscriberInterface<user> {
  constructor(connection: Connection, @Inject(OperationLogService) private service: OperationLogService) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return user;
  }

  async afterUpdate(event: UpdateEvent<user>) {
    if (event.entity) {
      await this.service.save<user>(event);
    }
  }


  async afterInsert(event: InsertEvent<user>) {
    await this.service.save<user>(event);
  }
}
