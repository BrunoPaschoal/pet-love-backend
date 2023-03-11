import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { RoleModule } from './modules/role/role.module';
import { UsersModule } from './modules/users/users.module';
import { AddressModule } from './modules/address/address.module';
import { UploadFilesModule } from './modules/upload-files/upload-files.module';
import { PetsModule } from './modules/pets/pets.module';
import { FavoritePetsModule } from './modules/favorite-pets/favorite-pets.module';
import { AnimalBreedsModule } from './modules/animal-breeds/animal-breeds.module';
import { PersonalityModule } from './modules/personality/personality.module';
import { CitiesModule } from './modules/cities/cities.module';
import { StatesModule } from './modules/states/states.module';

@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    AuthModule,
    RoleModule,
    AddressModule,
    UploadFilesModule,
    PetsModule,
    FavoritePetsModule,
    AnimalBreedsModule,
    PersonalityModule,
    CitiesModule,
    StatesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
