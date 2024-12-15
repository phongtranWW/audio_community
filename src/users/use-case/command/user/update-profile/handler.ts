import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateProfileRequest } from './request';
import { MinioService } from 'nestjs-minio-client';
import { IUserRepository } from '@users/domain/repository/user';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { UpdateProfileResponse } from './response';
import * as md5 from 'md5';
import { ErrorMessage } from '@constants/exception';
import { USER_REPOSITORY } from '@constants/repository-key';

@CommandHandler(UpdateProfileRequest)
export class UpdateProfileHandler
  implements ICommandHandler<UpdateProfileRequest>
{
  constructor(
    private minioService: MinioService,
    @Inject(USER_REPOSITORY)
    private repository: IUserRepository,
  ) {}

  async execute(command: UpdateProfileRequest): Promise<UpdateProfileResponse> {
    const { avatar, data, userId } = command;

    const user = await this.repository.getOneById(userId);

    if (!user) {
      throw new HttpException(
        ErrorMessage.NOT_FOUND_USER,
        HttpStatus.NOT_FOUND,
      );
    }

    let oldAvatar: string = null;

    if (user.profile) {
      oldAvatar = user.profile.avatar;
    }
    const newAvatar = this.generateKey(avatar, userId);

    user.updateProfile({
      avatar: newAvatar,
      ...data,
    });

    try {
      await this.minioService.client.putObject(
        'main',
        newAvatar,
        avatar.buffer,
      );

      if (oldAvatar) {
        await this.minioService.client.removeObject('main', oldAvatar);
      }

      await this.repository.save(user);

      return new UpdateProfileResponse({ avatar: newAvatar, ...data });
    } catch (error) {
      throw new HttpException(
        ErrorMessage.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private generateKey(file: Express.Multer.File, ownerId: string): string {
    const currentTimeStamp = new Date().getTime();
    const source = `${file.filename + currentTimeStamp}`;
    const key = `users/${ownerId}/avatars/${md5(source)}.${file.originalname.split('.')[1]}`;
    return key;
  }
}
