import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { UploadFilesService } from './upload-files.service';
import { PetDonationImageEntity } from './entities/pet-donation-images.entity';

@Controller('upload-files')
@UseGuards(AuthGuard('jwt'))
export class UploadFilesController {
  constructor(private readonly uploadFileService: UploadFilesService) {}

  //AVATAR FILE
  //===================================
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

  //PET DONATION IMAGES FILES
  //===================================

  @Get('pet-images/:id')
  async findPetDonationImages(
    @Param('id') petDonationId: string,
  ): Promise<PetDonationImageEntity[]> {
    return await this.uploadFileService.findPetDonationImages(petDonationId);
  }

  @Post('pet-images/:id')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadPetDonationFiles(
    @UploadedFiles() files: Express.Multer.File[],
    @Param('id') petDonationId: string,
  ) {
    return await this.uploadFileService.uploadMultipleFiles(
      petDonationId,
      files,
    );
  }

  @Delete('pet-images/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteImageByKey(@Param('id') id: string) {
    return await this.uploadFileService.deletePetImageByKey(id);
  }
}
