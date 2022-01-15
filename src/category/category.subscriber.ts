import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { CategoryEntity } from './category.entity';
import { generateSlug } from '../utils';
import { Injectable } from '@nestjs/common';

@EventSubscriber()
@Injectable()
export class CategorySubscriber
  implements EntitySubscriberInterface<CategoryEntity>
{
  constructor(private readonly connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return CategoryEntity;
  }

  async afterInsert(event: InsertEvent<CategoryEntity>) {
    const category = event.entity;

    await event.manager.getRepository(CategoryEntity).save({
      id: category.id,
      slug: `${category.id}-${generateSlug(category.title)}`,
    });
  }
}
