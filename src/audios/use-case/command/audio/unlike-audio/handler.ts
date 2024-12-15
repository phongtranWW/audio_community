import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UnlikeAudioRequest } from './request';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { IAudioRepository } from '@audio/domain/repository/audio';
import { ErrorMessage } from '@constants/exception';
import { AUDIO_REPOSITORY } from '@constants/repository-key';

@CommandHandler(UnlikeAudioRequest)
export class UnlikeAudioHandler implements ICommandHandler<UnlikeAudioRequest> {
  constructor(
    @Inject(AUDIO_REPOSITORY)
    private repository: IAudioRepository,
  ) {}
  async execute(command: UnlikeAudioRequest): Promise<void> {
    const { audioId, userId } = command;

    const audio = await this.repository.getOneById(audioId);

    if (!audio) {
      throw new HttpException(
        ErrorMessage.NOT_FOUND_AUDIO,
        HttpStatus.NOT_FOUND,
      );
    }

    audio.unlike(userId);

    try {
      await this.repository.save(audio);
    } catch (error) {
      throw new HttpException(
        ErrorMessage.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
