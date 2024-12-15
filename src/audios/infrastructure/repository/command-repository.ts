import { Audio } from '@audio/domain/entity/audio';
import { IAudioRepository } from '@audio/domain/repository/audio';
import { EntityManager } from 'typeorm';
import { RDBAudio } from '../rdb-entity/audio';
import { AudioMapper } from '@audio/utils/mapper';
import { InjectEntityManager } from '@nestjs/typeorm';

export class AudioCommandRepository implements IAudioRepository {
  constructor(@InjectEntityManager() private entityManager: EntityManager) {}

  async deleteById(id: string): Promise<void> {
    await this.entityManager.delete(RDBAudio, { id });
  }

  async getOneById(id: string): Promise<Audio> {
    const rdbAudio = await this.entityManager.findOne(RDBAudio, {
      where: {
        id,
      },
      relations: {
        likes: true,
        comments: true,
      },
    });
    return rdbAudio ? AudioMapper.toAudio(rdbAudio) : null;
  }

  async save(entity: Audio): Promise<void> {
    const rdbAudio = AudioMapper.toRDBAudio(entity);
    await this.entityManager.save(RDBAudio, rdbAudio);
  }
}
