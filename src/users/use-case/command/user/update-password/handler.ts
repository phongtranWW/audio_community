import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdatePasswordRequest } from './request';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { IUserRepository } from '@users/domain/repository/user';
import * as bcrypt from 'bcrypt';
import { ROUNDS } from '@constants/index';
import { ErrorMessage } from '@constants/exception';
import { USER_REPOSITORY } from '@constants/repository-key';

@CommandHandler(UpdatePasswordRequest)
export class UpdatePasswordHandler
  implements ICommandHandler<UpdatePasswordRequest>
{
  constructor(
    @Inject(USER_REPOSITORY)
    private repository: IUserRepository,
  ) {}

  async execute(command: UpdatePasswordRequest): Promise<void> {
    const { data, userId } = command;

    const user = await this.repository.getOneById(userId);

    if (!user) {
      throw new HttpException(
        ErrorMessage.NOT_FOUND_USER,
        HttpStatus.NOT_FOUND,
      );
    }

    if (!bcrypt.compareSync(data.currentPassword, user.password)) {
      throw new HttpException(
        ErrorMessage.PASSWORD_DOES_NOT_MATCH,
        HttpStatus.BAD_REQUEST,
      );
    }

    user.password = await bcrypt.hash(data.newPassword, ROUNDS);

    try {
      await this.repository.save(user);
      return;
    } catch (error) {
      throw new HttpException(
        ErrorMessage.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
