import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ApolloError } from 'apollo-server-express';
import { createWriteStream } from 'fs';
import { FileUpload } from 'graphql-upload';
@Injectable()
export class UploadService {
  private allowedMimetypes = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'application/pdf',
    'application/msword',
  ];

  async uploadFiles(files: FileUpload) {
    const x = await Promise.all(
      files.map(async (file) => {
        const valide = await this.IsvalideMimeType(file);
        if (!valide) return false;
        else return true;
      }),
    );

    return x.every((e) => e == true);
  }

  IsvalideMimeType = async (file) => {
    const { mimetype } = await file;
    return this.allowedMimetypes.includes(mimetype);
  };

  async uploadsingleFile(file) {
    const { createReadStream, filename } = await file;
    return new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(`./uploads/${filename}`))
        .on('finish', () => resolve(true))
        .on('error', () => reject(false)),
    );
  }
}
