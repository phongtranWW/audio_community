import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SearchUsersRequest } from './request';
import { Inject } from '@nestjs/common';
import { USER_QUERY_REPOSITORY } from '@constants/repository-key';
import { IUserQueryRepository } from '@users/infrastucture/repository/query-repository';
import { UserDto } from '../dto/user-dto';

@QueryHandler(SearchUsersRequest)
export class SearchUsersHandler implements IQueryHandler<SearchUsersRequest> {
  constructor(
    @Inject(USER_QUERY_REPOSITORY) private repository: IUserQueryRepository,
  ) {}

  async execute(query: SearchUsersRequest): Promise<UserDto[]> {
    const { page, limit, key } = query;
    return await this.repository.searchUsers(page, limit, key);
  }
}
