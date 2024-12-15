import { Gender } from '@users/domain/value-object/gender';
import { Role } from '@users/domain/value-object/role';
import * as path from 'path';
import * as bcrypt from 'bcrypt';
import { ROUNDS } from '@constants/index';
import { createUserAvatarKey } from '@seeds/utils';
import { filesDirectory } from '@seeds/constants';

export const sonTungMPT = {
  id: '6d7c0196-0992-4ce1-8885-0c6597583cdb',
  role: Role.User,
  email: 'sontungmtp123@gmail.com',
  password: bcrypt.hashSync('Sontungmpt_123', ROUNDS),
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const sonTungMPTProfile = {
  id: '6d7c0196-0992-4ce1-8885-0c6597583cdb',
  isVerified: true,
  avatar: createUserAvatarKey(
    '1de0612f-e03e-4cf8-b481-90b168046959',
    'ab92f22172165111f018adcaaeeb3a0e.jpg',
  ),
  gender: Gender.Male,
  firstName: 'Song',
  lastName: 'Tung',
  stageName: 'Son Tung MPT',
  userId: '6d7c0196-0992-4ce1-8885-0c6597583cdb',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const sonTungMPTAvatarPath = path.join(
  __dirname,
  filesDirectory,
  'users',
  'avatars',
  'son-tung-mtp.jpg',
);
