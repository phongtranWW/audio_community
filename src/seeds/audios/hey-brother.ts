import * as path from 'path';
import { filesDirectory } from '@seeds/constants';
import { createAudioKey } from '@seeds/utils';
import { avicii } from '@seeds/users/avicii';
import { music } from '@seeds/categories/music';

export const heyBrother = {
  id: '79fd5456-c978-48bb-9ee5-04a414019cb6',
  image: createAudioKey(
    '79fd5456-c978-48bb-9ee5-04a414019cb6',
    'a8bc7d6798a48f7172906f945cd0157c.jpg',
  ),
  sound: createAudioKey(
    '79fd5456-c978-48bb-9ee5-04a414019cb6',
    'a8bc7d6798a48f7172906f945cd0157c.mp3',
  ),
  name: 'Hey brother',
  description: null,
  listens: 289000000,
  userId: avicii.id,
  categoryId: music.id,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const heyBrotherImagePath = path.join(
  __dirname,
  filesDirectory,
  'audios',
  'images',
  'hey-brother.jpg',
);

export const heyBrotherSoundPath = path.join(
  __dirname,
  filesDirectory,
  'audios',
  'sounds',
  'hey-brother.mp3',
);
