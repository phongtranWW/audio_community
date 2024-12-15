export class DeleteAudioFromPlaylistRequest {
  constructor(
    public audioId: string,
    public playlistId: string,
    public userId: string,
  ) {}
}
