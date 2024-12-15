import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RenameCategoryRequest } from './request';
import { ICategoryRepository } from '@categories/domain/repository/category';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { ErrorMessage } from '@constants/exception';
import { CATEGORY_REPOSITORY } from '@constants/repository-key';

@CommandHandler(RenameCategoryRequest)
export class RenameCategoryHandler
  implements ICommandHandler<RenameCategoryRequest>
{
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private repository: ICategoryRepository,
  ) {}

  async execute(command: RenameCategoryRequest): Promise<void> {
    const { data, categoryId, userId } = command;

    const category = await this.repository.getOneById(categoryId);

    category.name = data.name;
    category.userId = userId;

    try {
      await this.repository.save(category);
      return;
    } catch (error) {
      throw new HttpException(
        ErrorMessage.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
