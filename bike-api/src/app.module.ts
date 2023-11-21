import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CustomersModule } from './customers/customers.module';
import { OrdersModule } from './orders/orders.module';
import { BicyclesModule } from './bicycles/bicycles.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CustomersModule,
    OrdersModule,
    BicyclesModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}
