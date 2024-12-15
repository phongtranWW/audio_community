import { Category } from '@categories/domain/entity/category';
import { RDBCategory } from '@categories/infrastructure/rdb-entity/category';
import { CategoryDto } from '@categories/use-case/query/dto/category-dto';

export class CategoryMapper {
  static toRDBCategory(category: Category): RDBCategory {
    const rdbCategory = new RDBCategory();
    rdbCategory.id = category.id;
    rdbCategory.createdAt = category.createdAt;
    rdbCategory.updatedAt = category.updatedAt;
    rdbCategory.name = category.name;
    rdbCategory.userId = category.userId;
    return rdbCategory;
  }

  static toCategory(rdbCategory: RDBCategory): Category {
    const category = new Category();
    category.id = rdbCategory.id;
    category.createdAt = rdbCategory.createdAt;
    category.updatedAt = rdbCategory.updatedAt;
    category.name = rdbCategory.name;
    category.userId = rdbCategory.userId;
    return category;
  }

  static toCategoryDtos(rdbCategories: RDBCategory[]): CategoryDto[] {
    return rdbCategories.map((rdbCategory) => {
      const categoryDto = new CategoryDto();
      categoryDto.id = rdbCategory.id;
      categoryDto.name = rdbCategory.name;
      return rdbCategory;
    });
  }
}
