import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Show service status' })
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string'
        }
      }
    }
  })
  @ApiBadRequestResponse()
  @Get('/status')
  @HttpCode(HttpStatus.OK)
  getStatus(): { [key: string]: string } {
    return this.appService.getStatus();
  }
}
