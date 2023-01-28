import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class UploadFilesService {
  private readonly s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });

  private readonly bucketName = process.env.AWS_BUCKET_NAME;
  private readonly awsBaseUrl = process.env.AWS_ACCESS_FILE_URL;

  async uploadAvatarFile(userId: string, file: Express.Multer.File) {
    const params = {
      Bucket: this.bucketName,
      Key: userId,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read',
    };
    await this.s3.upload(params).promise();
    return `${this.awsBaseUrl}${userId}`;
  }

  async deleteAvatarFile(userIdAsAKey: string): Promise<void> {
    const params = {
      Bucket: this.bucketName,
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
