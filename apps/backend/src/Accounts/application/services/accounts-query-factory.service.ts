import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { UserDto } from '../../../Dto';
import { ViewUserQuery } from '../queries/view-user.query';

@Injectable()
export class AccountsQueryFactoryService {
  constructor(private readonly queryBus: QueryBus) {}

  public async view(id: string): Promise<UserDto> {
    return this.queryBus.execute(new ViewUserQuery(id));
  }
}
