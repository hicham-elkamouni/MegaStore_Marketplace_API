import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * Service dealing with app config based operations.
 *
 * @class
 */

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get db(): string {
    return this.configService.get<string>('app.DATABASE_URL');
  }
  get port(): number {
    return this.configService.get<number>('app.PORT');
  }
}
