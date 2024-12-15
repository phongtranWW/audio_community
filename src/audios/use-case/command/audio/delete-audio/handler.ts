import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteAudioRequest } from './request';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';
import { IAudioRepository } from '@audio/domain/repository/audio';
import { ErrorMessage } from '@constants/exception';
import { AUDIO_REPOSITORY } from '@constants/repository-key';

@CommandHandler(DeleteAudioRequest)
export class DeleteAudioHandler implements ICommandHandler<DeleteAudioRequest> {
  constructor(
    private minioService: MinioService,
    @Inject(AUDIO_REPOSITORY)
    private repository: IAudioRepository,
  ) {}

  async execute(command: DeleteAudioRequest): Promise<void> {
    const { audioId, userId } = command;

    const audio = await this.repository.getOneById(audioId);

    if (!audio) {
      throw new HttpException(
        ErrorMessage.NOT_FOUND_AUDIO,
        HttpStatus.NOT_FOUND,
      );
    }

    if (!audio.isCreatedBy(userId)) {
      throw new HttpException(
        ErrorMessage.UNAUTHORIZED_TO_DO,
        HttpStatus.UNAUTHORIZED,
      );
    }

    try {
      await this.minioService.client.removeObject('main', audio.image);
      await this.minioService.client.removeObject('main', audio.sound);
      await this.repository.deleteById(audio.id);
    } catch (error) {
      throw new HttpException(
        ErrorMessage.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
