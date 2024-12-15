import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteCommentRequest } from './request';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { IAudioRepository } from '@audio/domain/repository/audio';
import { AUDIO_REPOSITORY } from '@constants/repository-key';
import { ErrorMessage } from '@constants/exception';

@CommandHandler(DeleteCommentRequest)
export class DeleteCommentHandler
  implements ICommandHandler<DeleteCommentRequest>
{
  constructor(
    @Inject(AUDIO_REPOSITORY)
    private repository: IAudioRepository,
  ) {}

  async execute(command: DeleteCommentRequest): Promise<void> {
    const { commentId, audioId, userId } = command;

    const audio = await this.repository.getOneById(audioId);

    if (!audio) {
      throw new HttpException(
        ErrorMessage.NOT_FOUND_AUDIO,
        HttpStatus.NOT_FOUND,
      );
    }

    if (
      !audio.getCommentById(commentId).isCreatedBy(userId) &&
      !audio.isCreatedBy(userId)
    ) {
      throw new HttpException(
        ErrorMessage.UNAUTHORIZED_TO_DO,
        HttpStatus.UNAUTHORIZED,
      );
    }

    audio.deleteCommentById(commentId);

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
