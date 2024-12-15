import { Audio } from '@audio/domain/entity/audio';

export class AudioFactory {
  static create({
    name,
    description,
    userId,
    categoryId,
  }: {
    name: string;
    description: string;
    userId: string;
    categoryId: string;
  }): Audio {
    const audio = new Audio();
    audio.listens = 0;
    audio.name = name;
    audio.description = description;
    audio.userId = userId;
    audio.categoryId = categoryId;
    return audio;
  }
}
