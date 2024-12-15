import { ROUNDS } from '@constants/index';
import { Role } from '@users/domain/value-object/role';
import * as bcrypt from 'bcrypt';
import * as path from 'path';
import { Gender } from '@users/domain/value-object/gender';
import { filesDirectory } from '@seeds/constants';
import { createUserAvatarKey } from '@seeds/utils';

export const adminOne = {
  id: '5ba9265c-3e86-409e-8645-c6ec540c0601',
  role: Role.Admin,
  email: 'adminone123@gmail.com',
  password: bcrypt.hashSync('Adminone_123', ROUNDS),
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const adminOneProfile = {
  id: 'cec5537a-c178-4dbe-bf95-0c0b1911cab7',
  isVerified: true,
  avatar: createUserAvatarKey(
    '5ba9265c-3e86-409e-8645-c6ec540c0601',
    '4ac43479852515bdfdc583b03db98275.png',
  ),
  gender: Gender.Male,
  firstName: 'AdminOne',
  lastName: 'AdminOne',
  stageName: null,
  userId: adminOne.id,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const adminOneAvatarPath = path.join(
  __dirname,
  filesDirectory,
  'users',
  'avatars',
  'admin-one.png',
);
