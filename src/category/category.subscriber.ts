import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { CategoryEntity } from './category.entity';
import { generateSlug } from '../utils';

@EventSubscriber()
export class CategorySubscriber
  implements EntitySubscriberInterface<CategoryEntity>
{
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
