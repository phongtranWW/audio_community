import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateCommentRequest } from './request';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { AUDIO_REPOSITORY } from '@constants/repository-key';
import { IAudioRepository } from '@audio/domain/repository/audio';
import { ErrorMessage } from '@constants/exception';

@CommandHandler(UpdateCommentRequest)
export class UpdateCommentHandler
  implements ICommandHandler<UpdateCommentRequest>
{
  constructor(
    @Inject(AUDIO_REPOSITORY)
    private repository: IAudioRepository,
  ) {}

  async execute(command: UpdateCommentRequest): Promise<void> {
    const { data, commentId, audioId, userId } = command;

    const audio = await this.repository.getOneById(audioId);

    if (!audio) {
      throw new HttpException(
        ErrorMessage.NOT_FOUND_AUDIO,
        HttpStatus.NOT_FOUND,
      );
    }

    if (!audio.getCommentById(commentId).isCreatedBy(userId)) {
      throw new HttpException(
        ErrorMessage.UNAUTHORIZED_TO_DO,
        HttpStatus.UNAUTHORIZED,
      );
    }

    audio.getCommentById(commentId).content = data.content;
    audio.getCommentById(commentId).updatedAt = new Date();

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
