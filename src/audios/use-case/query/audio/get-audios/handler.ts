import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAudiosRequest } from './request';
import { Inject } from '@nestjs/common';
import { AUDIO_QUERY_REPOSITORY } from '@constants/repository-key';
import { IAudioQueryRepository } from '@audio/infrastructure/repository/query-repository';
import { AudioDto } from '../../dto/audio-dto';

@QueryHandler(GetAudiosRequest)
export class GetAudiosHandler implements IQueryHandler<GetAudiosRequest> {
  constructor(
    @Inject(AUDIO_QUERY_REPOSITORY) private repository: IAudioQueryRepository,
  ) {}

  async execute(query: GetAudiosRequest): Promise<AudioDto[]> {
    const { page, limit, categoryId, userId, key } = query;
    return await this.repository.getAudios(page, limit, {
      categoryId,
      userId,
      key,
    });
  }
}
