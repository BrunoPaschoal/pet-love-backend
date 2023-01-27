import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadFilesService {
  async uploadAvatarFile(userId: string, file: Express.Multer.File) {
    return userId;
  }
}
