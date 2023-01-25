import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { RoleModule } from './modules/role/role.module';
import { UsersModule } from './modules/users/users.module';
import { AddressModule } from './modules/address/address.module';

@Module({
  imports: [UsersModule, DatabaseModule, AuthModule, RoleModule, AddressModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
