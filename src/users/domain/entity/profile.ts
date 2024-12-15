import { Base } from '@base/domain/entity/base';
import { Gender } from '../value-object/gender';

export class Profile extends Base {
  isVerified: boolean;
  avatar: string;
  gender: Gender;
  firstName: string;
  lastName: string;
  stageName: string;

  constructor() {
    super();
  }
}
