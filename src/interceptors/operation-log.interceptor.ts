import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OperationLogService } from '@/modules/operation-log/operation-log.service';

@Injectable()
export class OperationLogInterceptor implements NestInterceptor {
  constructor(@Inject(OperationLogService) private service: OperationLogService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    this.service.context = context;
    return next.handle().pipe(
      map(data => {
        return data;
      }),
    );
  }
}
