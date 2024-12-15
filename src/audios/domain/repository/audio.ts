import { IBaseRepository } from '@base/domain/repository/base';
import { Audio } from '../entity/audio';

export interface IAudioRepository extends IBaseRepository<Audio> {
  deleteById(id: string): Promise<void>;
}
