import { Profile } from './profile';
import { Role } from '../value-object/role';
import { Gender } from '../value-object/gender';
import { Base } from '@base/domain/entity/base';

export class User extends Base {
  role: Role;
  email: string;
  password: string;
  profile: Profile;

  public updateProfile({
    avatar,
    gender,
    firstName,
    lastName,
    stageName,
  }: {
    avatar: string;
    gender: Gender;
    firstName: string;
    lastName: string;
    stageName: string;
  }) {
    if (!this.profile) {
      this.profile = new Profile();
      this.profile.isVerified = false;
    }
    this.profile.avatar = avatar;
    this.profile.gender = gender;
    this.profile.firstName = firstName;
    this.profile.lastName = lastName;
    this.profile.stageName = stageName;
  }

  constructor() {
    super();
  }
}
