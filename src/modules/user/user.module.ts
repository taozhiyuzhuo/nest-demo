import { Module } from '@nestjs/common';
import { user } from '@/modules/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from '@/modules/user/user.controller';
import { OperationLogModule } from '@/modules/operation-log/operation-log.module';
import { UserSubscriber } from '@/modules/user/entities/user.subscriber';

@Module({
  imports:[
   TypeOrmModule.forFeature([user]),
    OperationLogModule
  ],
  controllers:[UserController],
  providers:[UserSubscriber]
})
export class UserModule {}
