import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RawJwtTokenPayloadInterface, JwtTokenPayloadInterface } from '@destiny/shared-interfaces';
import { TokenService } from './token.service';

@Injectable()
export class TokenHandlerService extends TokenService {
  constructor(private config: ConfigService) {
    super();
  }

  generateToken(payload: RawJwtTokenPayloadInterface, key: string = 'auth'): string {
    const jwtConfig = this.config.get(`jwt.${key}`);

    return super.generateToken(payload, jwtConfig);
  }

  verify(token: string, key: string = 'auth'): JwtTokenPayloadInterface {
    const jwtConfig = this.config.get(`jwt.${key}`);

    return super.verify(token, jwtConfig);
  }
}
