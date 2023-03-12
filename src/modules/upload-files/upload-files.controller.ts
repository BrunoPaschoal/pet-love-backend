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
import { UserId } from '../auth/decorators/userId.decorator';

@Controller('upload-files')
@UseGuards(AuthGuard('jwt'))
export class UploadFilesController {
  constructor(private readonly uploadFileService: UploadFilesService) {}

  //AVATAR FILE
  //===================================
  @Post('avatar')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatarFile(
    @UploadedFile() file: Express.Multer.File,
    @UserId() currentUserId: string,
  ) {
    return await this.uploadFileService.uploadAvatarFile(currentUserId, file);
  }

  @Delete('avatar')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAvatarFile(@UserId() currentUserId: string) {
    return await this.uploadFileService.deleteAvatarFile(currentUserId);
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
