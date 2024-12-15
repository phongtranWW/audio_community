import { Playlist } from 'src/playlists/domain/entity/playlist';
import { IPlaylistRepository } from 'src/playlists/domain/repository/playlist';
import { EntityManager } from 'typeorm';
import { RDBPlaylist } from '../rdb-entity/playlist';
import { PlaylistMapper } from 'src/playlists/utils/mapper';
import { InjectEntityManager } from '@nestjs/typeorm';

export class PlaylistCommandRepository implements IPlaylistRepository {
  constructor(@InjectEntityManager() private entityManager: EntityManager) {}

  async deleteById(id: string): Promise<void> {
    await this.entityManager.delete(RDBPlaylist, { id });
  }

  async getOneById(id: string): Promise<Playlist> {
    const rdbPlaylist = await this.entityManager.findOne(RDBPlaylist, {
      where: { id },
      relations: {
        audios: true,
      },
    });
    return PlaylistMapper.toPlaylist(rdbPlaylist);
  }

  async save(entity: Playlist): Promise<void> {
    const rdbPlaylist = PlaylistMapper.toRDBPlaylist(entity);
    await this.entityManager.save(RDBPlaylist, rdbPlaylist);
  }
}
