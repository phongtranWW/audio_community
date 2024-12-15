import { AudioDetailDto } from '@audio/use-case/query/dto/audio-detail-dto';
import { AudioDto } from '@audio/use-case/query/dto/audio-dto';
import { CommentDto } from '@audio/use-case/query/dto/comment-dto';
import { EntityManager, SelectQueryBuilder } from 'typeorm';
import { RDBAudio } from '../rdb-entity/audio';
import { AudioMapper, CommentMapper } from '@audio/utils/mapper';
import { RDBComment } from '../rdb-entity/comment';
import { InjectEntityManager } from '@nestjs/typeorm';

export interface IAudioQueryRepository {
  getAudios(
    page: number,
    limit: number,
    condition: { userId?: string; categoryId?: string; key?: string },
  ): Promise<AudioDto[]>;
  getAudioDetail(audioId: string): Promise<AudioDetailDto>;
  getAudioComments(
    page: number,
    limit: number,
    audioId: string,
  ): Promise<CommentDto[]>;
}

export class AudioQueryRepository implements IAudioQueryRepository {
  constructor(@InjectEntityManager() private entityManager: EntityManager) {}

  async getAudios(
    page: number,
    limit: number,
    condition: { userId?: string; categoryId?: string; key?: string },
  ): Promise<AudioDto[]> {
    let query = this.audioDtoQuery(this.entityManager);

    if (condition.userId) {
      query = query.andWhere('audio.userId = :userId', {
        userId: condition.userId,
      });
    }

    if (condition.categoryId) {
      query = query.andWhere('category.id = :categoryId', {
        categoryId: condition.categoryId,
      });
    }

    if (condition.key) {
      query = query.andWhere('audio.name LIKE :key', {
        key: `%${condition.key.toLowerCase()}%`,
      });
    }
    const audios = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();
    return AudioMapper.toAudioDtos(audios);
  }

  private audioDtoQuery(
    entityManager: EntityManager,
  ): SelectQueryBuilder<RDBAudio> {
    return entityManager
      .createQueryBuilder(RDBAudio, 'audio')
      .leftJoin('audio.user', 'user')
      .leftJoin('audio.category', 'category')
      .leftJoin('user.profile', 'profile')
      .select([
        'audio.id',
        'audio.name',
        'audio.image',
        'user.id',
        'profile.stageName',
        'category.id',
        'category.name',
      ]);
  }

  async getAudioDetail(audioId: string): Promise<AudioDetailDto> {
    const audio = await this.entityManager
      .createQueryBuilder(RDBAudio, 'audio')
      .leftJoin('audio.user', 'user')
      .leftJoin('audio.category', 'category')
      .leftJoin('audio.likes', 'like')
      .leftJoin('user.profile', 'profile')
      .select([
        'audio.id',
        'audio.name',
        'audio.image',
        'audio.sound',
        'audio.description',
        'audio.createdAt',
        'audio.listens',
        'like.userId',
        'user.id',
        'profile.stageName',
        'profile.avatar',
        'category.id',
        'category.name',
      ])
      .where('audio.id = :audioId', { audioId })
      .getOne();

    return AudioMapper.toAudioDetailDto(audio);
  }

  async getAudioComments(
    page: number,
    limit: number,
    audioId: string,
  ): Promise<CommentDto[]> {
    const comments = await this.entityManager
      .createQueryBuilder(RDBComment, 'comment')
      .leftJoin('comment.user', 'user')
      .leftJoin('user.profile', 'profile')
      .select([
        'comment.id',
        'comment.edited',
        'comment.audioId',
        'comment.content',
        'comment.createdAt',
        'user.id',
        'profile.stageName',
      ])
      .where('comment.audioId = :audioId', { audioId })
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();
    return CommentMapper.toCommentDtos(comments);
  }
}
