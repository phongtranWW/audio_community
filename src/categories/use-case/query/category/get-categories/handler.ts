import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCategoriesRequest } from './request';
import { Inject } from '@nestjs/common';
import { CATEGORY_QUERY_REPOSITORY } from '@constants/repository-key';
import { ICategoryQueryRepository } from '@categories/infrastructure/repository/query-repository';
import { CategoryDto } from '../../dto/category-dto';

@QueryHandler(GetCategoriesRequest)
export class GetCategoriesHandler
  implements IQueryHandler<GetCategoriesRequest>
{
  constructor(
    @Inject(CATEGORY_QUERY_REPOSITORY)
    private repository: ICategoryQueryRepository,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(query: GetCategoriesRequest): Promise<CategoryDto[]> {
    return await this.repository.getCategories();
  }
}
