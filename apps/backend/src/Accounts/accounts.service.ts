import { Injectable } from '@nestjs/common';

export interface AccountsServiceInterface {}

@Injectable()
export class AccountsService implements AccountsServiceInterface {
  constructor() {}
}
