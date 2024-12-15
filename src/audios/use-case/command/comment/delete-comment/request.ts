export class DeleteCommentRequest {
  constructor(
    public commentId: string,
    public audioId: string,
    public userId: string,
  ) {}
}
