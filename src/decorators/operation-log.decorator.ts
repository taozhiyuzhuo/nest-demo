import { SetMetadata } from '@nestjs/common';

export const OperationLog = (operation:string) => SetMetadata('operation-log', operation);
