import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPlaylistsRequest } from './request';
import { Inject } from '@nestjs/common';
import { PLAYLIST_QUERY_REPOSITORY } from '@constants/repository-key';
import { IPlaylistQueryRepository } from 'src/playlists/infrastructure/repository/query-repository';
import { PlaylistDto } from '../../dto/playlist-dto';

@QueryHandler(GetPlaylistsRequest)
export class GetPlaylistsHandler implements IQueryHandler<GetPlaylistsRequest> {
  constructor(
    @Inject(PLAYLIST_QUERY_REPOSITORY)
    private repository: IPlaylistQueryRepository,
  ) {}

  async execute(query: GetPlaylistsRequest): Promise<PlaylistDto[]> {
    return await this.repository.getPlaylists(query.userId);
  }
}
