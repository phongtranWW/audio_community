import { IBaseRepository } from '@base/domain/repository/base';
import { Playlist } from '../entity/playlist';

export interface IPlaylistRepository extends IBaseRepository<Playlist> {
  deleteById(id: string): Promise<void>;
}
