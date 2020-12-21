import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OperationLogModule } from '@/modules/operation-log/operation-log.module';
import { UserModule } from '@/modules/user/user.module';
import { JwtGuard } from '@/guards/jwt.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      entities: ['test/**/*.entity{.ts,.js}', 'src/**/*.entity{.ts,.js}'],
      subscribers: ['src/**/*.subscriber{.ts,.js}'],
      url: process.env.DATABASE_URL || 'postgres://localhost:5432/nest-demo',
      synchronize: true,
      logging:true
    }),
    OperationLogModule,
    UserModule,
  ],
  providers: [{
    provide: APP_GUARD,
    useClass: JwtGuard,
  }],
})
export class AppModule {
}
