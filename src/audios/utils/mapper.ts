import { Audio } from '@audio/domain/entity/audio';
import { Comment } from '@audio/domain/entity/comment';
import { RDBAudio } from '@audio/infrastructure/rdb-entity/audio';
import { RDBComment } from '@audio/infrastructure/rdb-entity/comment';
import { RDBLike } from '@audio/infrastructure/rdb-entity/like';
import {
  AudioDetailCategoryDto,
  AudioDetailDto,
  AudioDetailUserDto,
} from '@audio/use-case/query/dto/audio-detail-dto';
import {
  AudioCategoryDto,
  AudioDto,
  AudioUserDto,
} from '@audio/use-case/query/dto/audio-dto';
import {
  CommentDto,
  CommentUserDto,
} from '@audio/use-case/query/dto/comment-dto';

export class AudioMapper {
  static toRDBAudio(audio: Audio): RDBAudio {
    const rdbAudio = new RDBAudio();
    rdbAudio.id = audio.id;
    rdbAudio.createdAt = audio.createdAt;
    rdbAudio.updatedAt = audio.updatedAt;
    rdbAudio.image = audio.image;
    rdbAudio.sound = audio.sound;
    rdbAudio.name = audio.name;
    rdbAudio.description = audio.description;
    rdbAudio.listens = audio.listens;
    rdbAudio.likes =
      audio.likes?.map((userId) => {
        const rdbLike = new RDBLike();
        rdbLike.audioId = audio.id;
        rdbLike.userId = userId;
        return rdbLike;
      }) ?? [];
    rdbAudio.userId = audio.userId;
    rdbAudio.categoryId = audio.categoryId;
    rdbAudio.comments =
      audio.comments?.map((comment) => {
        const rdbComment = new RDBComment();
        rdbComment.id = comment.id;
        rdbComment.createdAt = comment.createdAt;
        rdbComment.updatedAt = comment.updatedAt;
        rdbComment.content = comment.content;
        rdbComment.edited = comment.edited;
        rdbComment.audioId = audio.id;
        rdbComment.userId = comment.userId;
        return rdbComment;
      }) ?? [];
    return rdbAudio;
  }

  static toAudio(rdbAudio: RDBAudio): Audio {
    const audio = new Audio();
    audio.id = rdbAudio.id;
    audio.createdAt = rdbAudio.createdAt;
    audio.updatedAt = rdbAudio.updatedAt;
    audio.image = rdbAudio.image;
    audio.sound = rdbAudio.sound;
    audio.name = rdbAudio.name;
    audio.description = rdbAudio.description;
    audio.listens = rdbAudio.listens;
    audio.userId = rdbAudio.userId;
    audio.categoryId = rdbAudio.categoryId;
    audio.likes = rdbAudio.likes?.map((like) => like.userId) ?? [];
    audio.comments =
      rdbAudio.comments?.map((rdbComment) => {
        const comment = new Comment();
        comment.id = rdbComment.id;
        comment.createdAt = rdbComment.createdAt;
        comment.updatedAt = rdbComment.updatedAt;
        comment.content = rdbComment.content;
        comment.edited = rdbComment.edited;
        comment.userId = rdbComment.userId;
        return comment;
      }) ?? [];
    return audio;
  }

  static toAudioDtos(rdbAudios: RDBAudio[]): AudioDto[] {
    return rdbAudios.map((rdbAudio) => {
      const audioDto = new AudioDto();
      audioDto.id = rdbAudio.id;
      audioDto.image = rdbAudio.image;
      audioDto.name = rdbAudio.name;

      audioDto.user = new AudioUserDto();
      audioDto.user.id = rdbAudio.user.id;
      audioDto.user.stageName = rdbAudio.user.profile?.stageName ?? null;

      const audioCategoryDto = new AudioCategoryDto();
      audioCategoryDto.id = rdbAudio.category.id;
      audioCategoryDto.name = rdbAudio.category.name;
      audioDto.category = audioCategoryDto;

      return audioDto;
    });
  }

  static toAudioDetailDto(rdbAudio: RDBAudio): AudioDetailDto {
    const audioDetailDto = new AudioDetailDto();
    audioDetailDto.id = rdbAudio.id;
    audioDetailDto.image = rdbAudio.image;
    audioDetailDto.sound = rdbAudio.sound;
    audioDetailDto.name = rdbAudio.name;
    audioDetailDto.likes = rdbAudio.likes.length;
    audioDetailDto.description = rdbAudio.description;
    audioDetailDto.listens = rdbAudio.listens;
    audioDetailDto.createdAt = rdbAudio.createdAt;

    const audioDetailCategoryDto = new AudioDetailCategoryDto();
    audioDetailCategoryDto.id = rdbAudio.category.id;
    audioDetailCategoryDto.name = rdbAudio.category.name;
    audioDetailDto.category = audioDetailCategoryDto;

    audioDetailDto.user = new AudioDetailUserDto();
    audioDetailDto.user.id = rdbAudio.user.id;
    audioDetailDto.user.stageName = rdbAudio.user.profile?.stageName ?? null;
    audioDetailDto.user.avatar = rdbAudio.user.profile?.avatar ?? null;
    return audioDetailDto;
  }
}

export class CommentMapper {
  static toCommentDtos(rdbComments: RDBComment[]): CommentDto[] {
    return rdbComments.map((rdbComment) => {
      const commentDto = new CommentDto();
      commentDto.id = rdbComment.id;
      commentDto.edited = rdbComment.edited;
      commentDto.audioId = rdbComment.audioId;
      commentDto.content = rdbComment.content;
      commentDto.createdAt = rdbComment.createdAt;

      let commentUserDto = null;
      if (rdbComment.user) {
        commentUserDto = new CommentUserDto();
        commentUserDto.id = rdbComment.user.id;
        commentUserDto.stageName = rdbComment.user.profile?.stageName ?? null;
      }

      commentDto.user = commentUserDto;
      return commentDto;
    });
  }
}
