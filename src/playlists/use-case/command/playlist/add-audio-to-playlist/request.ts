export class AddAudioToPlaylistRequest {
  constructor(
    public audioId: string,
    public playlistId: string,
    public userId: string,
  ) {}
}
