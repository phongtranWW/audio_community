import { PlaylistDto } from 'src/playlists/use-case/query/dto/playlist-dto';
import { EntityManager } from 'typeorm';
import { RDBPlaylist } from '../rdb-entity/playlist';
import { PlaylistMapper } from 'src/playlists/utils/mapper';
import { PlaylistDetailDto } from 'src/playlists/use-case/query/dto/playlist-detail-dto';
import { InjectEntityManager } from '@nestjs/typeorm';

export interface IPlaylistQueryRepository {
  getPlaylists(userId: string): Promise<PlaylistDto[]>;
  getPlaylistDetail(
    playlistId: string,
    userId: string,
  ): Promise<PlaylistDetailDto>;
}

export class PlaylistQueryRepository implements IPlaylistQueryRepository {
  constructor(@InjectEntityManager() private entityManager: EntityManager) {}

  async getPlaylistDetail(
    playlistId: string,
    userId: string,
  ): Promise<PlaylistDetailDto> {
    const playlist = await this.entityManager
      .createQueryBuilder(RDBPlaylist, 'playlist')
      .leftJoin('playlist.audios', 'playlistAudio')
      .leftJoin('playlistAudio.audio', 'audio')
      .leftJoin('audio.user', 'user')
      .leftJoin('user.profile', 'profile')
      .select([
        'playlist.id',
        'playlist.userId',
        'playlist.name',
        'playlistAudio.audioId',
        'audio.name',
        'audio.image',
        'user.id',
        'profile.stageName',
      ])
      .where('playlist.id = :playlistId AND playlist.userId = :userId', {
        playlistId,
        userId,
      })
      .getOne();
    return PlaylistMapper.toPlaylistDetailDto(playlist);
  }

  async getPlaylists(userId: string): Promise<PlaylistDto[]> {
    const playlists = await this.entityManager
      .createQueryBuilder(RDBPlaylist, 'playlist')
      .select(['playlist.id', 'playlist.name', 'playlist.userId'])
      .where('playlist.userId = :userId', { userId })
      .getMany();
    return PlaylistMapper.toPlaylistDtos(playlists);
  }
}
