import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { LoginResponseDto, LoginCredentialsBodyDto } from '../../../Dto';
import { GetLoginAccessQuery } from '../queries/get-login-access.query';

@Injectable()
export class AuthQueryFactoryService {
  constructor(private readonly queryBus: QueryBus) {}

  public async login(params: LoginCredentialsBodyDto): Promise<LoginResponseDto> {
    return this.queryBus.execute(new GetLoginAccessQuery(params));
  }
}
