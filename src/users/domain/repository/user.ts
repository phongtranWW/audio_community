import { IBaseRepository } from '@base/domain/repository/base';
import { User } from '../entity/user';

export interface IUserRepository extends IBaseRepository<User> {
  getOneByEmail(email: string): Promise<User>;
}
