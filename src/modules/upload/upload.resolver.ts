import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { UploadService } from './upload.service';

@Resolver()
export class UploadResolver {
  constructor(private uploadService: UploadService) {}
  // @Mutation(() => Boolean)
  // async uploadFile(
  //   @Args({ name: 'file', type: () => [GraphQLUpload] })
  //   files: FileUpload,
  // ): Promise<boolean> {
  //   return await this.uploadService.uploadFiles(files);
  // }
}
