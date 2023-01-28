import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UploadFilesController } from './upload-files.controller';
import { UploadFilesService } from './upload-files.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [UploadFilesController],
  providers: [UploadFilesService],
})
export class UploadFilesModule {}
