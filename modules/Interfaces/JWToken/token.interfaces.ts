export type TokenType = 'auth' | 'test';

export interface PayloadBody {
  [key: string]: any;
}

export interface JwtTokenPayloadInterface {
  type: TokenType;
  id: string;
  role: string;
  body: PayloadBody;
}

export interface RawJwtTokenPayloadInterface {
  tokenType: TokenType;
  userID: string;
  userRole: string;
  body?: PayloadBody;
}
