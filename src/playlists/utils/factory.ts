import { Playlist } from 'src/playlists/domain/entity/playlist';

export class PlaylistFactory {
  static create({ name, userId }: { name: string; userId: string }): Playlist {
    const playlist = new Playlist();
    playlist.name = name;
    playlist.userId = userId;
    playlist.audios = [];
    return playlist;
  }
}
