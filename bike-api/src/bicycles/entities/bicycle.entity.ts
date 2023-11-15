import { Bicycle } from '@prisma/client';

export class BicycleEntity implements Bicycle {
  id: number;
  model: string;
  color: string;
  characteristics: string;
  customerId: number;
}
