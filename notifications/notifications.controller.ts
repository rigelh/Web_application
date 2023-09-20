import { Observable, from, map } from 'rxjs';
import { notifications } from './notifications.entity';
import { notificationsService } from './notifications.servis';
import { Body, Controller, Post, Res, Sse } from '@nestjs/common';
import { Createnotifications } from './dto/ceate-notifications.dto';

@Controller('notifications')
export class notificationsController {
  constructor(private readonly notificationsService: notificationsService) {}

  @Post()
  async create(@Body() dto: Createnotifications): Promise<notifications> {
    const generator = this.notificationsService.createWithGenerator(dto);
    for await (const notifications of generator) {
      return notifications;
    }
  }

  @Sse() 
  sse(): Observable<MessageEvent> {
   
    const generator = this.notificationsService.getWithGenerator();

    return from(generator).pipe(
      map(function (notification) {
        return new MessageEvent('message', {
          data: JSON.stringify(notification),
        });
      }),
    );
  }
}