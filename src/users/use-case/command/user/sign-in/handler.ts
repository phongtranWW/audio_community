import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SignInRequest } from './request';
import { IUserRepository } from '@users/domain/repository/user';
import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { SignInResponse } from './response';
import * as bcrypt from 'bcrypt';
import { ErrorMessage } from '@constants/exception';
import { USER_REPOSITORY } from '@constants/repository-key';

@CommandHandler(SignInRequest)
export class SignInHandler implements ICommandHandler<SignInRequest> {
  constructor(
    private jwtService: JwtService,
    @Inject(USER_REPOSITORY)
    private repository: IUserRepository,
  ) {}

  async execute(command: SignInRequest): Promise<SignInResponse> {
    const { email, password } = command.data;
    const user = await this.repository.getOneByEmail(email);

    if (!user) {
      throw new HttpException(
        ErrorMessage.EMAIL_DOES_NOT_EXIST,
        HttpStatus.NOT_FOUND,
      );
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new HttpException(
        ErrorMessage.PASSWORD_DOES_NOT_MATCH,
        HttpStatus.BAD_REQUEST,
      );
    }

    return new SignInResponse(
      this.jwtService.sign({
        id: user.id,
        role: user.role,
      }),
    );
  }
}
