import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAudioDetailRequest } from './request';
import { Inject } from '@nestjs/common';
import { AUDIO_QUERY_REPOSITORY } from '@constants/repository-key';
import { IAudioQueryRepository } from '@audio/infrastructure/repository/query-repository';
import { AudioDetailDto } from '../../dto/audio-detail-dto';

@QueryHandler(GetAudioDetailRequest)
export class GetAudioDetailHandler
  implements IQueryHandler<GetAudioDetailRequest>
{
  constructor(
    @Inject(AUDIO_QUERY_REPOSITORY) private repository: IAudioQueryRepository,
  ) {}

  async execute(query: GetAudioDetailRequest): Promise<AudioDetailDto> {
    return await this.repository.getAudioDetail(query.audioId);
  }
}
