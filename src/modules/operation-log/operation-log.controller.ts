import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OperationLogService } from './operation-log.service';
import { OperationLog } from './entities/operation-log.entity';
@Crud({
  model: {
    type: OperationLog,
  },
  routes: {
    only: ['getManyBase', 'getOneBase'],
  },
})
@ApiBearerAuth()
@ApiTags('operation-log')
@Controller('operation-log')
export class OperationLogController {
  constructor(private readonly service: OperationLogService) {}
}
