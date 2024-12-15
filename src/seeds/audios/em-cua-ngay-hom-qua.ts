import * as path from 'path';
import { sonTungMPT } from '@seeds/users/son-tung-mtp';
import { createAudioKey } from '@seeds/utils';
import { filesDirectory } from '@seeds/constants';
import { music } from '@seeds/categories/music';

export const emCuaNgayHomQua = {
  id: '3597253b-d41a-4769-a251-35935c6f9b50',
  image: createAudioKey(
    '3597253b-d41a-4769-a251-35935c6f9b50',
    '63a552f2f7b0afa6fb9524316c4aa653.jpg',
  ),
  sound: createAudioKey(
    '3597253b-d41a-4769-a251-35935c6f9b50',
    '63a552f2f7b0afa6fb9524316c4aa653.mp3',
  ),
  name: 'Em của ngày hôm qua',
  description: null,
  listens: 123000000,
  userId: sonTungMPT.id,
  categoryId: music.id,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const emCuaNgayHomQuaImagePath = path.join(
  __dirname,
  filesDirectory,
  'audios',
  'images',
  'em-cua-ngay-hom-qua.jpg',
);

export const emCuaNgayHomQuaSoundPath = path.join(
  __dirname,
  filesDirectory,
  'audios',
  'sounds',
  'em-cua-ngay-hom-qua.mp3',
);
