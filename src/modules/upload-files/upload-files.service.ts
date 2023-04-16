import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as AWS from 'aws-sdk';
import { Repository } from 'typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { UploadMultipleFilesResponse } from './interfaces/UploadMultipleFilesResponse';
import { v4 as uuidv4 } from 'uuid';
import { PetDonationImageEntity } from 'src/modules/upload-files/entities/pet-donation-images.entity';
import { PetsEntity } from './../pets/entities/pets.entity';

@Injectable()
export class UploadFilesService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(PetsEntity)
    private petsRepository: Repository<PetsEntity>,
    @InjectRepository(PetDonationImageEntity)
    private petDonationImageRepository: Repository<PetDonationImageEntity>,
  ) {}

  private readonly s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });

  private readonly bucketName = process.env.AWS_BUCKET_NAME;
  private readonly awsBaseUrl = process.env.AWS_ACCESS_FILE_URL;

  async findUserByIdOrFail(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async uploadAvatarFile(userId: string, file: Express.Multer.File) {
    const user = await this.findUserByIdOrFail(userId);

    const urlImage = await this.uploadFile(userId, file);
    user.avatar = urlImage;
    await this.userRepository.save(user);
    return urlImage;
  }

  async deleteAvatarFile(userIdAsAKey: string): Promise<void> {
    const user = await this.findUserByIdOrFail(userIdAsAKey);
    await this.deleteFile(userIdAsAKey);
    user.avatar = null;
    await this.userRepository.save(user);
  }

  async deletePetImageByKey(key: string): Promise<void> {
    const imageRegister = await this.petDonationImageRepository.findOne({
      where: { imageKey: key },
    });

    if (!imageRegister) {
      throw new HttpException('Imagem não encontrada!', HttpStatus.NOT_FOUND);
    }

    try {
      await this.petDonationImageRepository.remove(imageRegister);
      await this.deleteFile(key);
    } catch (error) {
      throw new HttpException(
        'Ocorreu um erro inesperado',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findPetDonationImages(
    petDonationId: string,
  ): Promise<PetDonationImageEntity[]> {
    const petDonationImages = await this.petDonationImageRepository.find({
      where: { pet: { id: petDonationId } },
    });

    return petDonationImages;
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

  async uploadMultipleFiles(
    petDonationId: string,
    files: Express.Multer.File[],
  ): Promise<UploadMultipleFilesResponse[]> {
    const UploadedFilesData: UploadMultipleFilesResponse[] = [];

    const petDonation = await this.petsRepository.findOne({
      where: { id: petDonationId },
    });

    if (!petDonation) {
      throw new HttpException(
        'Doação de pet não encontrada.',
        HttpStatus.NOT_FOUND,
      );
    }

    for (let i = 0; i < files.length; i++) {
      const petGaleryKey = `pet-image-${uuidv4()}`;

      await this.uploadFile(petGaleryKey, files[i]);

      const petImages = this.petDonationImageRepository.create({
        url: `${this.awsBaseUrl}${petGaleryKey}`,
        imageKey: petGaleryKey,
        pet: petDonation,
      });

      await this.petDonationImageRepository.save(petImages);

      UploadedFilesData.push({
        id: petImages.id,
        url: petImages.url,
        imageKey: petImages.imageKey,
      });
    }

    return UploadedFilesData;
  }

  async deletePetImagesAndRelationship(petId: string) {
    const petDonationImages = await this.findPetDonationImages(petId);

    for (let i = 0; i < petDonationImages.length; i++) {
      const donationImage = petDonationImages[i];
      await this.deleteFile(donationImage.imageKey);
      await this.petDonationImageRepository.remove(donationImage);
    }
  }

  async deleteFile(key: string): Promise<void> {
    const params = {
      Bucket: this.bucketName,
      Key: key,
    };

    try {
      await this.s3.deleteObject(params).promise();
    } catch (error) {
      throw error;
    }
  }
}
