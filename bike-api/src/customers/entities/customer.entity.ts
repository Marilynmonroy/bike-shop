import { Customer } from '@prisma/client';

export class CustomerEntity implements Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
}
