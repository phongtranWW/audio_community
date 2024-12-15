import { User } from '@users/domain/entity/user';
import { IUserRepository } from '@users/domain/repository/user';
import { UserMapper } from '@users/utils/mapper';
import { RDBUser } from '../rdb-entity/user';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

export class UserCommandRepository implements IUserRepository {
  constructor(@InjectEntityManager() private entityManager: EntityManager) {}

  async getOneByEmail(email: string): Promise<User> {
    const user = await this.entityManager.findOneBy(RDBUser, { email });
    return user ? UserMapper.toUser(user) : null;
  }

  async getOneById(id: string): Promise<User> {
    const user = await this.entityManager.findOneBy(RDBUser, { id });
    return user ? UserMapper.toUser(user) : null;
  }

  async save(entity: User): Promise<void> {
    const rdbUser = UserMapper.toRDBUser(entity);
    await this.entityManager.save(RDBUser, rdbUser);
  }
}
