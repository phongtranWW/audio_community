export class DeletePlaylistRequest {
  constructor(
    public playlistId: string,
    public userId: string,
  ) {}
}
