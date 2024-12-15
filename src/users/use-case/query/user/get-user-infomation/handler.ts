import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserInfomationRequest } from './request';
import { IUserQueryRepository } from '@users/infrastucture/repository/query-repository';
import { USER_QUERY_REPOSITORY } from '@constants/repository-key';
import { Inject } from '@nestjs/common';
import { UserInformationDto } from '../dto/user-information-dto';

@QueryHandler(GetUserInfomationRequest)
export class GetUserInformatioHandler
  implements IQueryHandler<GetUserInfomationRequest>
{
  constructor(
    @Inject(USER_QUERY_REPOSITORY) private repository: IUserQueryRepository,
  ) {}

  async execute(query: GetUserInfomationRequest): Promise<UserInformationDto> {
    return await this.repository.getUserInformation(query.id);
  }
}
