import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAudioCommentsRequest } from './request';
import { Inject } from '@nestjs/common';
import { AUDIO_QUERY_REPOSITORY } from '@constants/repository-key';
import { IAudioQueryRepository } from '@audio/infrastructure/repository/query-repository';
import { CommentDto } from '../../dto/comment-dto';

@QueryHandler(GetAudioCommentsRequest)
export class GetAudioCommentsHandler
  implements IQueryHandler<GetAudioCommentsRequest>
{
  constructor(
    @Inject(AUDIO_QUERY_REPOSITORY) private repository: IAudioQueryRepository,
  ) {}

  async execute(query: GetAudioCommentsRequest): Promise<CommentDto[]> {
    const { page, limit, audioId } = query;
    return await this.repository.getAudioComments(page, limit, audioId);
  }
}
