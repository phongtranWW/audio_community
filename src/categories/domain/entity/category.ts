import { Base } from '@base/domain/entity/base';

export class Category extends Base {
  name: string;
  userId: string;

  constructor() {
    super();
  }
}
