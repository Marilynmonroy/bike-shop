import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private _customer: any;
  public get customer(): any {
    return this._customer;
  }
  public set customer(value: any) {
    this._customer = value;
  }

  private _bicycle: any;
  public get bicycle(): any {
    return this._bicycle;
  }
  public set bicycle(value: any) {
    this._bicycle = value;
  }

  private _order: any;
  public get order(): any {
    return this._order;
  }
  public set order(value: any) {
    this._order = value;
  }

  private _user: any;
  public get user(): any {
    return this._user;
  }
  public set user(value: any) {
    this._user = value;
  }
  async onModuleInit() {
    await this.$connect();
  }
}
