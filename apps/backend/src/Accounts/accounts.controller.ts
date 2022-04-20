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
  SetMetadata,
  ValidationPipe,
  UseGuards
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '@destiny/permissions-roles';
import { User, NoUserIdAccess, UserIDGuard } from '@destiny/jwt-verification';

import logger from '@destiny/logger';

import { UserDto, ErrorResponseDto, UserUpdateDto } from '../Dto';
import { AccountsQueryFactoryService } from './application/services/accounts-query-factory.service';
import { AccountsCommandFactoryService } from './application/services/accounts-command-factory.service';

@ApiTags('Accounts')
@ApiBearerAuth('AccountsJWT')
@UseGuards(UserIDGuard)
// @Controller({ host: 'accounts' })
@Controller()
export class AccountsController {
  constructor(
    private readonly accountsQueryFactoryService: AccountsQueryFactoryService,
    private readonly accountsCommandFactoryService: AccountsCommandFactoryService
  ) {}

  @ApiOperation({ summary: 'View me' })
  @ApiOkResponse({ type: UserDto })
  @ApiBadRequestResponse({ type: ErrorResponseDto })
  @Roles('user')
  @Get('/me')
  @HttpCode(HttpStatus.OK)
  async viewMe(@User('id') id: string): Promise<UserDto> {
    return this.accountsQueryFactoryService.view(id);
  }

  @ApiOperation({ summary: 'View user' })
  @ApiOkResponse({ type: UserDto })
  @ApiBadRequestResponse({ type: ErrorResponseDto })
  @Roles('user')
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async view(@Param('id', new ParseUUIDPipe()) id: string): Promise<UserDto> {
    return this.accountsQueryFactoryService.view(id);
  }

  @ApiOperation({ summary: 'Update me' })
  @ApiOkResponse({ type: UserDto })
  @ApiBadRequestResponse({ type: ErrorResponseDto })
  @Roles('user')
  @Patch('/me')
  @HttpCode(HttpStatus.OK)
  async updateMe(@User('id') id: string, @Body() body: UserUpdateDto): Promise<UserDto> {
    await this.accountsCommandFactoryService.update({ id, body });
    return this.accountsQueryFactoryService.view(id);
  }
}
