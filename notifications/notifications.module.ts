import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { notifications } from './notifications.entity';
import { notificationsController } from './notifications.controller';
import { notificationsService } from './notifications.servis';
@Module({
  imports: [TypeOrmModule.forFeature([notifications])],
  controllers: [notificationsController],
  providers: [notificationsService],
})
export class notificationsModule {}