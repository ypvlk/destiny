import * as jwt from 'jsonwebtoken';
import logger from '@destiny/logger';

import { JwtTokenPayloadInterface, RawJwtTokenPayloadInterface } from '@destiny/shared-interfaces';
import { TokenError, TokenVerifyError, TokenDecodeError } from './errors';

export class TokenService {
  public generateToken(rawPayload: RawJwtTokenPayloadInterface, jwtConfig: any): string {
    try {
      const payload: JwtTokenPayloadInterface = {
        id: rawPayload.userID,
        type: rawPayload.tokenType,
        role: rawPayload.userRole,
        body: rawPayload?.body
      };

      return jwt.sign(
        {
          ...payload
        },
        jwtConfig.secret,
        {
          algorithm: jwtConfig.algorithm,
          expiresIn: +jwtConfig.ttl
        }
      );
    } catch (error) {
      this.log().error(`Invalid jwt token, ${error.message}`);
      throw new TokenError(error);
    }
  }

  public verify(token: string, jwtConfig: any): JwtTokenPayloadInterface {
    const cleanToken = token.replace('Bearer ', '');
    try {
      return jwt.verify(cleanToken, jwtConfig.secret) as JwtTokenPayloadInterface;
    } catch (error) {
      this.log().error(`Invalid verify jwt token, ${error.message}`);
      throw new TokenVerifyError(error);
    }
  }

  public getRoleFromToken(token: string): string | null {
    const payload = this.decode(token);
    return payload?.role ?? null;
  }

  public getUserIdFromToken(token: string): string | null {
    const payload = this.decode(token);
    return payload?.id ?? null;
  }

  public decode(token: string): JwtTokenPayloadInterface {
    const cleanToken = token.replace('Bearer ', '');
    try {
      return jwt.decode(cleanToken) as JwtTokenPayloadInterface;
    } catch (error) {
      this.log().error(`Invalid decode jwt token, ${error.message}`);
      throw new TokenDecodeError(error);
    }
  }

  private log() {
    return logger.child('JWToken');
  }
}
