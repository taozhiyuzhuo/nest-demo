import { Body, Controller, Get, Param, Patch, Post, Put, UseInterceptors } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { user } from '@/modules/user/entities/user.entity';
import { OperationLog } from '@/decorators/operation-log.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OperationLogInterceptor } from '@/interceptors/operation-log.interceptor';
import { Cacheable } from 'type-cacheable';
import { UserService } from '@/modules/user/user.service';

@Crud({
  model: {
    type: user,
  },
})
@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
@UseInterceptors(OperationLogInterceptor)
export class UserController {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(user) private repo: Repository<user>,
  ) {
  }

  @Post('/')
  @OperationLog('创建用户')
  async create(@Body() dto) {
    return await this.repo.save(dto);

  }

  @Patch(':id')
  @OperationLog('修改用户')
  async update(@Param('id') id: string, @Body() dto) {
    return this.userService.updateOne(id, dto);
  }

  @Get('')
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }
}
