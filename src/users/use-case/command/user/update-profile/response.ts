import { Gender } from '@users/domain/value-object/gender';

export class UpdateProfileResponse {
  public avatar: string;
  public gender: Gender;
  public firstName: string;
  public lastName: string;
  public stageName: string;

  constructor({
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
    this.avatar = avatar;
    this.gender = gender;
    this.firstName = firstName;
    this.lastName = lastName;
    this.stageName = stageName;
  }
}
