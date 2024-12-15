import { ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPlaylistDetailRequest } from './request';
import { Inject } from '@nestjs/common';
import { PLAYLIST_QUERY_REPOSITORY } from '@constants/repository-key';
import { IPlaylistQueryRepository } from 'src/playlists/infrastructure/repository/query-repository';
import { PlaylistDetailDto } from '../../dto/playlist-detail-dto';

@QueryHandler(GetPlaylistDetailRequest)
export class GetPlaylistDetailHandler
  implements ICommandHandler<GetPlaylistDetailRequest>
{
  constructor(
    @Inject(PLAYLIST_QUERY_REPOSITORY)
    private repository: IPlaylistQueryRepository,
  ) {}

  async execute(command: GetPlaylistDetailRequest): Promise<PlaylistDetailDto> {
    const { userId, playlistId } = command;
    return await this.repository.getPlaylistDetail(playlistId, userId);
  }
}
