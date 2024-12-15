import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCategoryRequest } from './request';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { ICategoryRepository } from '@categories/domain/repository/category';
import { CategoryFactory } from '@categories/utils/factory';
import { ErrorMessage } from '@constants/exception';
import { CATEGORY_REPOSITORY } from '@constants/repository-key';

@CommandHandler(CreateCategoryRequest)
export class CreateCategoryHandler
  implements ICommandHandler<CreateCategoryRequest>
{
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private repository: ICategoryRepository,
  ) {}

  async execute(command: CreateCategoryRequest): Promise<void> {
    const { data, userId } = command;

    const category = CategoryFactory.create({ name: data.name, userId });

    try {
      await this.repository.save(category);
    } catch (error) {
      throw new HttpException(
        ErrorMessage.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
