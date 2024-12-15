import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IUserRepository } from '@users/domain/repository/user';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { UserFactory } from '@users/utils/factory';
import { JwtService } from '@nestjs/jwt';
import { SignUpRequest } from './request';
import { SignUpResponse } from './response';
import { ErrorMessage } from '@constants/exception';
import { USER_REPOSITORY } from '@constants/repository-key';

@CommandHandler(SignUpRequest)
export class SignUpHandler implements ICommandHandler<SignUpRequest> {
  constructor(
    private jwtService: JwtService,
    @Inject(USER_REPOSITORY)
    private repository: IUserRepository,
  ) {}

  async execute(command: SignUpRequest): Promise<SignUpResponse> {
    const { email, password } = command.data;

    const user = await this.repository.getOneByEmail(command.data.email);

    if (user) {
      throw new HttpException(
        ErrorMessage.EMAIL_IS_BEING_USED,
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const newUser = UserFactory.create({ email, password });
      await this.repository.save(newUser);

      return new SignUpResponse(
        this.jwtService.sign({
          id: newUser.id,
          role: newUser.role,
        }),
      );
    } catch (error) {
      throw new HttpException(
        ErrorMessage.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
