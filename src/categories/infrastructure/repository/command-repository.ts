import { Category } from '@categories/domain/entity/category';
import { ICategoryRepository } from '@categories/domain/repository/category';
import { EntityManager } from 'typeorm';
import { RDBCategory } from '../rdb-entity/category';
import { CategoryMapper } from '@categories/utils/mapper';
import { InjectEntityManager } from '@nestjs/typeorm';

export class CategoryCommandRepository implements ICategoryRepository {
  constructor(@InjectEntityManager() private entityManager: EntityManager) {}

  async getOneById(id: string): Promise<Category> {
    const rdbCategory = await this.entityManager.findOneBy(RDBCategory, { id });
    return CategoryMapper.toCategory(rdbCategory);
  }

  async save(entity: Category): Promise<void> {
    const rdbCategory = CategoryMapper.toRDBCategory(entity);
    await this.entityManager.save(RDBCategory, rdbCategory);
  }
}
