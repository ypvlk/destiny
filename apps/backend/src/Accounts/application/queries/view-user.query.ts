import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { InfoError } from '@destiny/exception-handling';

import { AuthMessages } from '../../../Errors'; // TODO send into module
import { UserDto } from '../../../Dto';

import { AccountsService } from '../../accounts.service';
import { UsersRepository } from '../../../Repositories';

export class ViewUserQuery {
  constructor(public readonly id: string) {}
}

@QueryHandler(ViewUserQuery)
export class ViewUserHandler implements IQueryHandler<ViewUserQuery> {
  constructor(private readonly accountsService: AccountsService, private readonly usersRepository: UsersRepository) {}

  async execute({ id }: ViewUserQuery): Promise<UserDto> {
    const user = await this.usersRepository.findOne(id);
    if (!user) throw new InfoError(AuthMessages.UserNotFoundInDB);

    return new UserDto(user);
  }
}
