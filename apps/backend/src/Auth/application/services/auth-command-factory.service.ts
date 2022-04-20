import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { LoginResponseDto, LoginCredentialsBodyDto } from '../../../Dto';
import { RegisterUserCommand } from '../commands/register-user.command';

@Injectable()
export class AuthCommandFactoryService {
  constructor(private readonly commandBus: CommandBus) {}

  public async registration(params: LoginCredentialsBodyDto): Promise<LoginResponseDto> {
    return this.commandBus.execute(new RegisterUserCommand(params));
  }
}
