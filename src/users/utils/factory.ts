import { ROUNDS } from '@constants/index';
import { User } from '../domain/entity/user';
import { Role } from '../domain/value-object/role';
import * as bcrypt from 'bcrypt';

export class UserFactory {
  static create({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): User {
    const user = new User();
    user.role = Role.User;
    user.email = email;
    user.password = bcrypt.hashSync(password, ROUNDS);
    user.profile = null;
    return user;
  }
}
