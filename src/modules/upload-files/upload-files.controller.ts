import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
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

  @Delete('avatar/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAvatarFile(@Param('id') id: string) {
    return await this.uploadFileService.deleteAvatarFile(id);
  }
}
