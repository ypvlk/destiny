import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TokenHandlerService } from '@destiny/jwt-verification';

import logger from '@destiny/logger';
import { CustomError, InfoError } from '@destiny/exception-handling';
import { RawJwtTokenPayloadInterface } from '@destiny/shared-interfaces';

import { AuthMessages, GeneralMessages } from '../../../Errors';
import { LoginCredentialsBodyDto, LoginResponseDto } from '../../../Dto';

import { AuthService } from '../../auth.service';
import { UsersRepository } from '../../../Repositories';

export class RegisterUserCommand {
  constructor(public readonly body: LoginCredentialsBodyDto) {}
}

@CommandHandler(RegisterUserCommand)
export class RegisterUserCommandHandler implements ICommandHandler<RegisterUserCommand> {
  constructor(
    private readonly tokenService: TokenHandlerService,
    private readonly authService: AuthService,
    private readonly usersRepository: UsersRepository
  ) {}

  async execute({ body }: RegisterUserCommand): Promise<LoginResponseDto> {
    const { email, password } = body;

    const user = await this.usersRepository.findFullByEmail(email);
    if (user) throw new InfoError(AuthMessages.UserNotFoundInDB);

    try {
      const newPassword = await this.authService.makePasswordHash(password);
      const newUser = await this.usersRepository.save({ ...body, password: newPassword });

      const payload: RawJwtTokenPayloadInterface = {
        userID: newUser.id,
        tokenType: 'auth',
        userRole: 'user'
      };

      return {
        accessToken: this.tokenService.generateToken(payload)
      };
    } catch (error) {
      logger.error(error.message);
      throw new CustomError({ message: GeneralMessages.SomeError.message });
    }
  }
}
