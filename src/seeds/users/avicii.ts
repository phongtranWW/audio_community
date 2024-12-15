import { Gender } from '@users/domain/value-object/gender';
import { Role } from '@users/domain/value-object/role';
import * as path from 'path';
import * as bcrypt from 'bcrypt';
import { ROUNDS } from '@constants/index';
import { createUserAvatarKey } from '@seeds/utils';
import { filesDirectory } from '@seeds/constants';

export const avicii = {
  id: 'e81be6d0-c675-47fb-aa4c-aa3aedbf24c5',
  role: Role.User,
  email: 'avicii123@gmail.com',
  password: bcrypt.hashSync('Avicii_123', ROUNDS),
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const aviciiProfile = {
  id: 'd2470798-6499-4a88-80bd-ff7ba78201d2',
  isVerified: true,
  avatar: createUserAvatarKey(
    'e81be6d0-c675-47fb-aa4c-aa3aedbf24c5',
    'ce451d4e849cdb2799d3ef8b20647d9f.jpg',
  ),
  gender: Gender.Male,
  firstName: 'Avicii',
  lastName: 'Avicii',
  stageName: 'Avicii',
  userId: avicii.id,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const aviciiAvatarPath = path.join(
  __dirname,
  filesDirectory,
  'users',
  'avatars',
  'avicii.jpg',
);
