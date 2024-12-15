export class GetAudioCommentsRequest {
  constructor(
    public page: number,
    public limit: number,
    public audioId: string,
  ) {}
}
