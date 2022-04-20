import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { UpdateUserCommand } from '../commands/update-user.command';
import { IUserUpdateParams } from '../../../Interfaces';

@Injectable()
export class AccountsCommandFactoryService {
  constructor(private readonly commandBus: CommandBus) {}

  public async update(params: IUserUpdateParams): Promise<void> {
    await this.commandBus.execute(new UpdateUserCommand(params));
  }
}
