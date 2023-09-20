import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { notifications } from './notifications.entity';
import { Repository } from 'typeorm';
import { Createnotifications } from './dto/ceate-notifications.dto';

@Injectable()
export class notificationsService {
  // ruan repositorin notification si private property ne notificationsRepository
  constructor(
    @InjectRepository(notifications)
    private readonly notificationsRepository: Repository<notifications>,
  ) {}
  // krijimi i gjeneratorit asinkron createwithgenerator me parameter objektin Createnotifications

  async *createWithGenerator(
    dto: Createnotifications,
  ): AsyncGenerator<notifications> {
    // krijimi i objektit notification brenda nfunksionit dhe i ben return(yield) objektet notifications ne cdo iteration
    const notification = this.notificationsRepository.create(dto);
    yield this.notificationsRepository.save(notification);
  }

  async *getWithGenerator(): AsyncGenerator<notifications> {
    // merr te gjitha notifications nga databaza
    const notifications = await this.notificationsRepository.find();
    for (const notification of notifications) {
      yield notification;
    }
    // await new Promise(resolve => setTimeout(resolve, 1000));
  }
}