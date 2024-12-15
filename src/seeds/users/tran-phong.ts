import { Gender } from '@users/domain/value-object/gender';
import { Role } from '@users/domain/value-object/role';
import * as path from 'path';
import * as bcrypt from 'bcrypt';
import { ROUNDS } from '@constants/index';
import { createUserAvatarKey } from '@seeds/utils';
import { filesDirectory } from '@seeds/constants';

export const tranPhong = {
  id: '1ac69a8e-977f-46a9-aa23-6d1e8f119567',
  role: Role.User,
  email: 'tranphong123@gmail.com',
  password: bcrypt.hashSync('Tranphong_123', ROUNDS),
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const tranPhongProfile = {
  id: 'e36faba3-a430-47f0-a761-ead03788efa4',
  isVerified: false,
  avatar: createUserAvatarKey(
    '1ac69a8e-977f-46a9-aa23-6d1e8f119567',
    'e91e90791434f6b68e3146dcc3998033.jpg',
  ),
  gender: Gender.Male,
  firstName: 'Tran',
  lastName: 'Phong',
  stageName: 'Wind',
  userId: tranPhong.id,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const tranPhongAvatarPath = path.join(
  __dirname,
  filesDirectory,
  'users',
  'avatars',
  'tran-phong.png',
);
