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
      FIREBASE_API_KEY: Joi.string().required(),
      FIREBASE_AUTH_DOMAIN: Joi.string().required(),
      FIREBASE_PROJECT_ID: Joi.string().required(),
      FIREBASE_STORAGE_BUCKET: Joi.string().required(),
      FIREBASE_MESSAGING_SENDER: Joi.string().required(),
      FIREBASE_APP_ID: Joi.string().required(),
      FIREBASE_STORAGE_URL: Joi.string().required(),
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
  get firebaseApiKey(): string {
    return this.envConfig.FIREBASE_API_KEY;
  }
  get firebaseAuthDomain(): string {
    return this.envConfig.FIREBASE_AUTH_DOMAIN;
  }
  get firebaseProjectId(): string {
    return this.envConfig.FIREBASE_PROJECT_ID;
  }
  get firebaseStorageBucket(): string {
    return this.envConfig.FIREBASE_STORAGE_BUCKET;
  }
  get firebaseMessaginSender(): string {
    return this.envConfig.FIREBASE_MESSAGING_SENDER;
  }
  get firebaseAppId(): string {
    return this.envConfig.FIREBASE_APP_ID;
  }
  get firebaseStorageUrl(): string {
    return this.envConfig.FIREBASE_STORAGE_URL;
  }
}
