import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import logger from '@destiny/logger';
import { CustomError, InfoError } from '@destiny/exception-handling';

import { GeneralMessages } from '../../../Errors';
import { IUserUpdateParams } from '../../../Interfaces';

import { AccountsService } from '../../accounts.service';
import { UsersRepository } from '../../../Repositories';

export class UpdateUserCommand {
  constructor(public readonly params: IUserUpdateParams) {}
}

@CommandHandler(UpdateUserCommand)
export class UpdateUserCommandHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(private readonly accountsService: AccountsService, private readonly usersRepository: UsersRepository) {}

  async execute({ params }: UpdateUserCommand): Promise<void> {
    const { id, body } = params;

    const user = await this.usersRepository.findOne(id);
    if (!user) throw new InfoError(GeneralMessages.UserNotFound);

    try {
      await this.usersRepository.update({ id }, { ...user, ...body });
    } catch (error) {
      logger.error(error.message);
      throw new CustomError({ message: GeneralMessages.SomeError.message });
    }
  }
}
