import { UserDto } from '@users/use-case/query/user/dto/user-dto';
import { UserInformationDto } from '@users/use-case/query/user/dto/user-information-dto';
import { EntityManager } from 'typeorm';
import { RDBUser } from '../rdb-entity/user';
import { UserMapper } from '@users/utils/mapper';
import { InjectEntityManager } from '@nestjs/typeorm';

export interface IUserQueryRepository {
  searchUsers(page: number, limit: number, key: string): Promise<UserDto[]>;
  getUserInformation(id: string): Promise<UserInformationDto>;
}

export class UserQueryRepository implements IUserQueryRepository {
  constructor(@InjectEntityManager() private entityManager: EntityManager) {}

  async searchUsers(
    page: number,
    limit: number,
    key: string,
  ): Promise<UserDto[]> {
    const user = await this.entityManager
      .createQueryBuilder(RDBUser, 'user')
      .leftJoin('user.profile', 'profile')
      .select(['user.id', 'user.email', 'profile.stageName', 'user.createdAt'])
      .where('LOWER(profile.stageName) LIKE :key', {
        key: `%${key.toLowerCase()}%`,
      })
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();
    return UserMapper.toUserDtos(user);
  }

  async getUserInformation(id: string): Promise<UserInformationDto> {
    const user = await this.entityManager
      .createQueryBuilder(RDBUser, 'user')
      .leftJoin('user.profile', 'profile')
      .select([
        'user.id',
        'user.email',
        'user.createdAt',
        'profile.isVerified',
        'profile.avatar',
        'profile.gender',
        'profile.stageName',
      ])
      .where('user.id = :id', { id })
      .getOne();

    return UserMapper.toUserInformationDto(user);
  }
}
