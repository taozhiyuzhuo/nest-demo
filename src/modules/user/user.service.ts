import { InjectRepository } from '@nestjs/typeorm';
import { user } from '@/modules/user/entities/user.entity';
import { Repository } from 'typeorm';
import { Cacheable, CacheClear } from 'type-cacheable';
import { CacheTtlSeconds } from '@/common/redis-cache.service';

export class UserService {
  constructor(
    @InjectRepository(user)
    private readonly repo: Repository<user>) {
  }

  @Cacheable({ttlSeconds:CacheTtlSeconds.ONE_WEEK,cacheKey:'users'})
  async findAll(){
    return this.repo.find()
  }

  @Cacheable({ttlSeconds:CacheTtlSeconds.ONE_DAY,cacheKey:args => `user_${args[0]}`})
  async findOne(id){
    return this.repo.findOne(id)
  }

  @CacheClear({cacheKey:args => `user_${args[0]}`})
  async updateOne(id,dto){
    const user = await this.repo.findOne(id);
    user.username = dto.username;
    user.password = dto.password;
    return await user.save();
  }
}
