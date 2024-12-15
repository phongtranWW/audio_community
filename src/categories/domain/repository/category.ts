import { IBaseRepository } from '@base/domain/repository/base';
import { Category } from '../entity/category';

export interface ICategoryRepository extends IBaseRepository<Category> {}
