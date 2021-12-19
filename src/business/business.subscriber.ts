import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { generateSlug } from '../utils';
import { Business } from './business.entity';
import { StorageService } from '../storage/storage.service';
import { Injectable } from '@nestjs/common';

@EventSubscriber()
@Injectable()
export class BusinessSubscriber implements EntitySubscriberInterface<Business> {
  constructor(
    private readonly connection: Connection,
    private readonly storageService: StorageService,
  ) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Business;
  }

  afterLoad(business: Business) {
    business.logo = this.storageService
      .disk('public')
      .url(`${Business.STORAGE_PATH}/${business.logo}`);

    business.cover = this.storageService
      .disk('public')
      .url(`${Business.STORAGE_PATH}/${business.cover}`);
  }

  async afterInsert(event: InsertEvent<Business>) {
    const business = event.entity;

    await event.manager.getRepository(Business).save({
      id: business.id,
      slug: `${business.id}-${generateSlug(business.title)}`,
    });
  }
}
