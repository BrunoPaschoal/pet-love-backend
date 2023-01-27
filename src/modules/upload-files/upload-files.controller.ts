import {
  Controller,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadFilesService } from './upload-files.service';

@Controller('upload-files')
export class UploadFilesController {
  constructor(private readonly uploadFileService: UploadFilesService) {}

  @Post('avatar/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatarFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') userId: string,
  ) {
    return await this.uploadFileService.uploadAvatarFile(userId, file);
  }
}
