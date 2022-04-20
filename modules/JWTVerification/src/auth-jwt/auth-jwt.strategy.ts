import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtTokenPayloadInterface } from '@destiny/shared-interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('jwt.auth.secret')
    });
  }

  // Inside payload we see what shoul take from token and send into request
  async validate(payload: any): Promise<JwtTokenPayloadInterface> {
    return payload as JwtTokenPayloadInterface;
  }
}
