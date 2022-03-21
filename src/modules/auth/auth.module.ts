import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '../config/configuration.service';
import { AuthResolver } from './auth.reolver';
import { AuthService } from './auth.service';
import { AtStrategy } from './strategies/accesst.strategy';

@Global()
@Module({
  imports: [JwtModule.register({})],
  providers: [AuthService, AuthResolver, AtStrategy, ConfigService],
  exports: [AuthService],
})
export class AuthModule {}
