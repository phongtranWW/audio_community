import { Base } from '@base/domain/entity/base';

export class Comment extends Base {
  content: string;
  edited: boolean;
  userId: string;

  isCreatedBy(id: string) {
    return this.userId === id;
  }

  constructor() {
    super();
  }
}
