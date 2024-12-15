import { Gender } from '@users/domain/value-object/gender';

export class UserInformationDto {
  id: string;
  email: string;
  profile: ProfileDto;
  createdAt: Date;
}

export class ProfileDto {
  isVerified: boolean;
  avatar: string;
  gender: Gender;
  stageName: string;
}
