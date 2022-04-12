import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ApolloError } from 'apollo-server-express';
import { createWriteStream } from 'fs';
import { FileUpload } from 'graphql-upload';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from '../firebase/firebase';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class UploadService {
  constructor(private firebaseService: FirebaseService) { }
  private allowedMimetypes = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'application/pdf',
    'application/msword',
  ];

  async uploadFiles(files) {
    const x = files.map(async (file) => {
      const valide = await this.IsvalideMimeType(file);
      if (!valide) return false;
      else
        return true;
    })
    const validated = await Promise.all(x)

    if (validated.every((e) => e == true)) {
      return Promise.all(files.map((file) => this.firebaseService.uploadToFirebase(file)))
    } else {
      return false
    }

  }
  async IsvalideMimeType(file) {
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
