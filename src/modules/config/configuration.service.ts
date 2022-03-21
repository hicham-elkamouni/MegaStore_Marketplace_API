import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as Joi from 'joi';

export interface EnvConfig {
  [key: string]: string;
}

@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor() {
    const file: Buffer | undefined = fs.readFileSync('.env');
    const config = dotenv.parse(file);
    this.envConfig = this.validateInput(config);
  }

  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      DATABASE_URI: Joi.string().required(),
      ACCESS_TOKEN: Joi.string().required(),
      REFRESH_TOKEN: Joi.string().required(),
    });

    const { error, value: validatedEnvConfig } =
      envVarsSchema.validate(envConfig);
    if (error) {
      throw new Error(
        `Config validation error in your env file: ${error.message}`,
      );
    }
    return validatedEnvConfig;
  }

  get mongoUri(): string {
    return this.envConfig.DATABASE_URI;
  }
  get accessToken(): string {
    return this.envConfig.ACCESS_TOKEN;
  }
  get refreshToken(): string {
    return this.envConfig.REFRESH_TOKEN;
  }
}
