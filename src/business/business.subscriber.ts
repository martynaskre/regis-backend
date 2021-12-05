import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { generateSlug } from '../utils';
import { Business } from './business.entity';

@EventSubscriber()
export class BusinessSubscriber implements EntitySubscriberInterface<Business> {
  listenTo() {
    return Business;
  }

  async afterInsert(event: InsertEvent<Business>) {
    const business = event.entity;

    await event.manager.getRepository(Business).save({
      id: business.id,
      slug: `${business.id}-${generateSlug(business.title)}`,
    });
  }
}
