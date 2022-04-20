import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { TokenHandlerService } from '@destiny/jwt-verification';
import { RawJwtTokenPayloadInterface } from '@destiny/shared-interfaces';
import { InfoError } from '@destiny/exception-handling';

import { AuthMessages } from '../../../Errors'; // TODO send into module

import { LoginCredentialsBodyDto, LoginResponseDto } from '../../../Dto';

import { AuthService } from '../../auth.service';
import { UsersRepository } from '../../../Repositories';

export class GetLoginAccessQuery {
  constructor(public readonly body: LoginCredentialsBodyDto) {}
}

@QueryHandler(GetLoginAccessQuery)
export class GetLoginAccessHandler implements IQueryHandler<GetLoginAccessQuery> {
  constructor(
    private readonly tokenService: TokenHandlerService,
    private readonly authService: AuthService,
    private readonly usersRepository: UsersRepository
  ) {}

  async execute({ body }: GetLoginAccessQuery): Promise<LoginResponseDto> {
    const { email, password } = body;

    const user = await this.usersRepository.findFullByEmail(email);
    if (!user) throw new InfoError(AuthMessages.UserNotFoundInDB);

    const comparePassword = await this.authService.comparePasswordHash(password, user.password);
    if (!comparePassword) throw new InfoError(AuthMessages.UserNotFoundInDB);

    const payload: RawJwtTokenPayloadInterface = {
      userID: user.id,
      tokenType: 'auth',
      userRole: 'user'
    };

    return {
      accessToken: this.tokenService.generateToken(payload)
    };
  }
}
