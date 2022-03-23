import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '../config/configuration.service';
import { jwtPayload } from './types';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  /**
   * function for creating acces/refresh tokens
   * @params {(jwtPayload , expiresIn:string,key:string)} takes a payload that includes the userID and a list of the user permissions and the expiration time and the secretKey
   * @returns {(Promise<Token>)} returns an access token
   * @memberof AuthService
   */
  async createToken(
    userId: string,
    permissions: string[],
    expiresIn: string,
    key: string,
  ): Promise<string> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const tokenSecret = (key = 'access'
      ? this.configService.accessToken
      : this.configService.refreshToken);

    const jwtPayload: jwtPayload = {
      userId,
      permissions,
    };

    const token = await this.jwtService.signAsync(jwtPayload, {
      secret: tokenSecret,
      expiresIn,
    });

    return token;
  }
}
