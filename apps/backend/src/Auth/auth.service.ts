import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export interface AuthServiceInterface {
  makePasswordHash(password: string): Promise<any>;
  comparePasswordHash(password: string, hash: string): Promise<any>;
}

@Injectable()
export class AuthService implements AuthServiceInterface {
  constructor() {}

  public async makePasswordHash(password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(5, (error, salt) => {
        if (error) return reject(new Error(error.message));

        bcrypt.hash(password, salt, (err, hash) => {
          if (err) return reject(new Error(err.message));
          return resolve(hash);
        });
      });
    });
  }

  public async comparePasswordHash(password: string, hash: string): Promise<any> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, hash, (error, result) => {
        if (error) return reject(new Error(error.message));
        if (!result) return resolve(false);
        return resolve(true);
      });
    });
  }
}
