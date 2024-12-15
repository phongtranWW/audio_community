import { Category } from '@categories/domain/entity/category';

export class CategoryFactory {
  static create({ name, userId }: { name: string; userId: string }): Category {
    const category = new Category();
    category.name = name;
    category.userId = userId;
    return category;
  }
}
