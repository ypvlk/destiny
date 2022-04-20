import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Query,
  Req,
  ValidationPipe,
  UseGuards
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User, NoUserIdAccess, UserIDGuard } from '@destiny/jwt-verification';
import logger from '@destiny/logger';

import { LoginResponseDto, ErrorResponseDto, LoginCredentialsBodyDto } from '../Dto';
import { AuthCommandFactoryService } from './application/services/auth-command-factory.service';
import { AuthQueryFactoryService } from './application/services/auth-query-factory.service';

@ApiTags('Auth')
@ApiBearerAuth('AuthJWT')
@UseGuards(UserIDGuard)
// @Controller({ host: 'auth' })
@Controller()
export class AuthController {
  constructor(
    private readonly authQueryFactory: AuthQueryFactoryService,
    private readonly authCommandFactory: AuthCommandFactoryService
  ) {}

  @ApiOperation({ summary: 'Login user and response jwt token' })
  @ApiOkResponse({ type: LoginResponseDto })
  @ApiBadRequestResponse({ type: ErrorResponseDto })
  @NoUserIdAccess()
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: LoginCredentialsBodyDto): Promise<LoginResponseDto> {
    return this.authQueryFactory.login({ ...body });
  }

  @ApiOperation({ summary: 'Register user by email and password' })
  @ApiOkResponse({ type: LoginResponseDto })
  @ApiBadRequestResponse({ type: ErrorResponseDto })
  @NoUserIdAccess()
  @Post('/registration')
  @HttpCode(HttpStatus.OK)
  async registration(@Body() body: LoginCredentialsBodyDto): Promise<LoginResponseDto> {
    return this.authCommandFactory.registration({ ...body });
  }

  // @ApiOperation({ summary: 'Check access token and response new jwt token' })
  // @ApiOkResponse({ type: LoginResponseDto })
  // @ApiBadRequestResponse({ type: ErrorResponseDto })
  // @Post('/refresh')
  // @HttpCode(HttpStatus.OK)
  // async refresh(@Body() body: LoginCredentialsBodyDto): Promise<LoginResponseDto> {
  //   return this.authQueryFactory.login({ ...body });
  // }
}
