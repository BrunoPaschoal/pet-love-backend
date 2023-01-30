import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as AWS from 'aws-sdk';
import { Repository } from 'typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class UploadFilesService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private readonly usersService: UsersService,
  ) {}

  private readonly s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });

  private readonly bucketName = process.env.AWS_BUCKET_NAME;
  private readonly awsBaseUrl = process.env.AWS_ACCESS_FILE_URL;

  async uploadAvatarFile(userId: string, file: Express.Multer.File) {
    const user = await this.usersService.findUserByIdOrFail(userId);
    const urlImage = await this.uploadFile(userId, file);
    user.avatar = urlImage;
    await this.userRepository.save(user);
    return urlImage;
  }

  async deleteAvatarFile(userIdAsAKey: string): Promise<void> {
    const user = await this.usersService.findUserByIdOrFail(userIdAsAKey);
    await this.deleteFile(userIdAsAKey);
    user.avatar = null;
    await this.userRepository.save(user);
  }

  async uploadFile(key: string, file: Express.Multer.File) {
    const params = {
      Bucket: this.bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read',
    };
    await this.s3.upload(params).promise();
    return `${this.awsBaseUrl}${key}`;
  }

  async uploadMultipleFiles(key: string, files: Express.Multer.File[]) {
    console.log(files);
    return key;
  }

  async deleteFile(key: string): Promise<void> {
    const params = {
      Bucket: this.bucketName,
      Key: key,
    };

    try {
      await this.s3.deleteObject(params).promise();
    } catch (error) {
      console.log(`Error deleting file: ${error}`);
      throw error;
    }
  }
}
