import { Base } from '@base/domain/entity/base';
import { ErrorMessage } from '@constants/exception';
import { HttpException, HttpStatus } from '@nestjs/common';

export class Playlist extends Base {
  name: string;
  userId: string;
  audios: string[];

  public isCreatedBy(userId: string): boolean {
    return this.userId === userId;
  }

  public addAudio(id: string) {
    const index = this.audios.indexOf(id);
    console.log(index);
    if (index >= 0) {
      throw new HttpException(
        ErrorMessage.AUDIO_HAVE_EXISTED_IN_PLAYLIST,
        HttpStatus.BAD_REQUEST,
      );
    }
    this.audios.push(id);
  }

  public deleteAudio(id: string) {
    const index = this.audios.indexOf(id);
    if (index < 0) {
      throw new HttpException(
        ErrorMessage.AUDIO_HAVE_NOT_EXISTED_IN_PLAYLIST,
        HttpStatus.NOT_FOUND,
      );
    }
    this.audios.splice(index, 1);
  }

  constructor() {
    super();
  }
}
