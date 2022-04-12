import { Module } from '@nestjs/common';
import { FirebaseModule } from '../firebase/firebase.module';
import { FirebaseService } from '../firebase/firebase.service';
import { UploadResolver } from './upload.resolver';
import { UploadService } from './upload.service';

@Module({
  imports:[FirebaseModule],
  providers: [UploadResolver, UploadService],
  exports:[UploadService]
})
export class UploadModule {}
