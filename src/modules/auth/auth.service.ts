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
   * function for creating acces tokens
   * @params {(jwtPayload , expiresIn:string)} takes a payload that includes the userID and a list of the user permissions and the expiration time
   * @returns {(Promise<Token>)} returns an access token
   * @memberof UsersService
   */
  async createToken(
    userId: string,
    permissions: [string],
    expiresIn: string,
  ): Promise<string> {
    const jwtPayload: jwtPayload = {
      userId,
      permissions,
    };

    const token = await this.jwtService.signAsync(jwtPayload, {
      secret: this.configService.refreshToken,
      expiresIn,
    });

    return token;
  }
}
