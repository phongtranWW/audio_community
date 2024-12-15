import { Profile } from '@users/domain/entity/profile';
import { User } from '@users/domain/entity/user';
import { RDBProfile } from '@users/infrastucture/rdb-entity/profile';
import { RDBUser } from '@users/infrastucture/rdb-entity/user';
import { UserDto } from '@users/use-case/query/user/dto/user-dto';
import {
  ProfileDto,
  UserInformationDto,
} from '@users/use-case/query/user/dto/user-information-dto';

export class UserMapper {
  static toRDBUser(user: User): RDBUser {
    const rdbUser = new RDBUser();
    rdbUser.id = user.id;
    rdbUser.createdAt = user.createdAt;
    rdbUser.updatedAt = user.updatedAt;
    rdbUser.role = user.role;
    rdbUser.email = user.email;
    rdbUser.password = user.password;

    let rdbProfile = null;
    if (user.profile) {
      rdbProfile = new RDBProfile();
      rdbProfile.id = user.profile.id;
      rdbProfile.createdAt = user.profile.createdAt;
      rdbProfile.updatedAt = user.profile.updatedAt;
      rdbProfile.isVerified = user.profile.isVerified;
      rdbProfile.avatar = user.profile.avatar;
      rdbProfile.gender = user.profile.gender;
      rdbProfile.firstName = user.profile.firstName;
      rdbProfile.lastName = user.profile.lastName;
      rdbProfile.stageName = user.profile.stageName;
      rdbProfile.userId = user.id;
    }
    rdbUser.profile = rdbProfile;
    return rdbUser;
  }

  static toUser(rdbUser: RDBUser): User {
    const user = new User();
    user.id = rdbUser.id;
    user.createdAt = rdbUser.createdAt;
    user.updatedAt = rdbUser.updatedAt;
    user.role = rdbUser.role;
    user.email = rdbUser.email;
    user.password = rdbUser.password;
    let profile = null;
    if (rdbUser.profile) {
      profile = new Profile();
      profile.id = rdbUser.profile.id;
      profile.createdAt = rdbUser.profile.createdAt;
      profile.updatedAt = rdbUser.profile.updatedAt;
      profile.isVerified = rdbUser.profile.isVerified;
      profile.avatar = rdbUser.profile.avatar;
      profile.gender = rdbUser.profile.gender;
      profile.firstName = rdbUser.profile.firstName;
      profile.lastName = rdbUser.profile.lastName;
      profile.stageName = rdbUser.profile.stageName;
    }
    user.profile = profile;
    return user;
  }

  static toUserDtos(rdbUsers: RDBUser[]): UserDto[] {
    return rdbUsers.map((rdbUser) => {
      const userDto = new UserDto();
      userDto.id = rdbUser.id;
      userDto.email = rdbUser.email;
      userDto.stageName = rdbUser.profile?.stageName ?? null;
      userDto.createdAt = rdbUser.createdAt;
      return userDto;
    });
  }

  static toUserInformationDto(rdbUser: RDBUser): UserInformationDto {
    const userInformationDto = new UserInformationDto();
    userInformationDto.id = rdbUser.id;
    userInformationDto.email = rdbUser.email;
    userInformationDto.createdAt = rdbUser.createdAt;

    let profileDto = null;
    if (rdbUser.profile) {
      profileDto = new ProfileDto();
      profileDto.isVerified = rdbUser.profile.isVerified;
      profileDto.avatar = rdbUser.profile.avatar;
      profileDto.gender = rdbUser.profile.gender;
      profileDto.stageName = rdbUser.profile.stageName;
    }
    userInformationDto.profile = profileDto;

    return userInformationDto;
  }
}
