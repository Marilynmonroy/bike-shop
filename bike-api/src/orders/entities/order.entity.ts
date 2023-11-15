import { Order, Status } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export class OrderEntity implements Order {
  id: number;
  description: string;
  status: Status;
  createdAt: Date;
  updateAt: Date;
  customerId: number;
  bicycleId: number;
  value: Decimal;
}
