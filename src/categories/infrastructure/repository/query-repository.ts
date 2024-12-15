import { CategoryDto } from '@categories/use-case/query/dto/category-dto';
import { EntityManager } from 'typeorm';
import { RDBCategory } from '../rdb-entity/category';
import { CategoryMapper } from '@categories/utils/mapper';
import { InjectEntityManager } from '@nestjs/typeorm';

export interface ICategoryQueryRepository {
  getCategories(): Promise<CategoryDto[]>;
}

export class CategoryQueryRepository implements ICategoryQueryRepository {
  constructor(@InjectEntityManager() private entityManager: EntityManager) {}

  async getCategories(): Promise<CategoryDto[]> {
    const categories = await this.entityManager
      .createQueryBuilder(RDBCategory, 'category')
      .select(['category.id', 'category.name'])
      .getMany();
    return CategoryMapper.toCategoryDtos(categories);
  }
}
