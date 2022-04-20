import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getStatus(): { [key: string]: string } {
    return {
      message: `Backend service status is OK`
    };
  }
}
