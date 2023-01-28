import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class UploadFilesService {
  private readonly s3 = new AWS.S3({
    accessKeyId: 'AKIAR4FXDBCOJVDF4JM5',
    secretAccessKey: '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',
    region: 'us-east-1',
  });

  async uploadAvatarFile(userId: string, file: Express.Multer.File) {
    const params = {
      Bucket: 'pet-love-storage',
      Key: userId,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read',
    };
    await this.s3.upload(params).promise();
    return `https://pet-love-storage.s3.us-east-1.amazonaws.com/${userId}`;
  }

  async deleteAvatarFile(userIdAsAKey: string): Promise<void> {
    const params = {
      Bucket: 'pet-love-storage',
      Key: userIdAsAKey,
    };

    try {
      await this.s3.deleteObject(params).promise();
    } catch (error) {
      console.log(`Error deleting file: ${error}`);
      throw error;
    }
  }
}
