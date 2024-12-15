export class CommentDto {
  id: string;
  edited: boolean;
  audioId: string;
  content: string;
  user: CommentUserDto;
  createdAt: Date;
}

export class CommentUserDto {
  id: string;
  stageName: string;
}
