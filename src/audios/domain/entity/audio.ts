import { Comment } from './comment';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorMessage } from '@constants/exception';
import { Base } from '@base/domain/entity/base';

export class Audio extends Base {
  image: string;
  sound: string;
  name: string;
  description: string;
  listens: number;
  userId: string;
  categoryId: string;
  comments: Comment[];
  likes: string[];

  isCreatedBy(id: string) {
    return this.userId === id;
  }

  public addComment({ content, userId }: { content: string; userId: string }) {
    const comment = new Comment();
    comment.content = content;
    comment.edited = false;
    comment.userId = userId;
    this.comments.push(comment);
  }

  public deleteCommentById(id: string) {
    const index = this.comments.findIndex((comment) => comment.id === id);
    if (index < 0) {
      throw new HttpException(
        ErrorMessage.NOT_FOUND_COMMENT,
        HttpStatus.NOT_FOUND,
      );
    }
    this.comments.splice(index, 1);
  }

  public getCommentById(id: string): Comment {
    const index = this.comments.findIndex((comment) => comment.id === id);
    if (index < 0) {
      throw new HttpException(
        ErrorMessage.NOT_FOUND_COMMENT,
        HttpStatus.NOT_FOUND,
      );
    }
    return this.comments[index];
  }

  public like(userId: string) {
    const index = this.likes.indexOf(userId);
    if (index >= 0) {
      throw new HttpException(
        ErrorMessage.USER_HAVE_LIKED_SONG,
        HttpStatus.BAD_REQUEST,
      );
    }

    this.likes.push(userId);
  }

  public unlike(userId: string) {
    const index = this.likes.indexOf(userId);
    if (index < 0) {
      throw new HttpException(
        ErrorMessage.USER_HAVE_NOT_LIKED_SONG,
        HttpStatus.BAD_REQUEST,
      );
    }

    this.likes.splice(index, 1);
  }

  constructor() {
    super();
  }
}
