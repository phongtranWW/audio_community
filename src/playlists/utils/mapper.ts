import { Playlist } from 'src/playlists/domain/entity/playlist';
import { RDBPlaylist } from 'src/playlists/infrastructure/rdb-entity/playlist';
import { RDBPlaylistAudio } from 'src/playlists/infrastructure/rdb-entity/playlist-audio';
import { PlaylistDetailDto } from 'src/playlists/use-case/query/dto/playlist-detail-dto';
import { PlaylistDto } from 'src/playlists/use-case/query/dto/playlist-dto';

export class PlaylistMapper {
  static toRDBPlaylist(playlist: Playlist): RDBPlaylist {
    const rdbPlaylist = new RDBPlaylist();
    rdbPlaylist.id = playlist.id;
    rdbPlaylist.createdAt = playlist.createdAt;
    rdbPlaylist.updatedAt = playlist.updatedAt;
    rdbPlaylist.name = playlist.name;
    rdbPlaylist.userId = playlist.userId;
    rdbPlaylist.audios =
      playlist.audios?.map((audioId) => {
        const rdbPlaylistAudio = new RDBPlaylistAudio();
        rdbPlaylistAudio.playlistId = playlist.id;
        rdbPlaylistAudio.audioId = audioId;
        return rdbPlaylistAudio;
      }) ?? [];
    return rdbPlaylist;
  }

  static toPlaylist(rdbPlaylist: RDBPlaylist): Playlist {
    const playlist = new Playlist();
    playlist.id = rdbPlaylist.id;
    playlist.createdAt = rdbPlaylist.createdAt;
    playlist.updatedAt = rdbPlaylist.updatedAt;
    playlist.name = rdbPlaylist.name;
    playlist.userId = rdbPlaylist.userId;
    playlist.audios =
      rdbPlaylist.audios?.map((playlistAudio) => playlistAudio.audioId) ?? [];
    return playlist;
  }

  static toPlaylistDtos(rdbPlaylists: RDBPlaylist[]): PlaylistDto[] {
    return rdbPlaylists.map((rdbPlaylist) => {
      const playlistDto = new PlaylistDto();
      playlistDto.id = rdbPlaylist.id;
      playlistDto.name = rdbPlaylist.name;
      return playlistDto;
    });
  }

  static toPlaylistDetailDto(rdbPlaylist: RDBPlaylist): PlaylistDetailDto {
    const playlistDetailDto = new PlaylistDetailDto();
    playlistDetailDto.id = rdbPlaylist.id;
    playlistDetailDto.name = rdbPlaylist.name;
    playlistDetailDto.audios =
      rdbPlaylist.audios?.map((playlistAudio) => ({
        id: playlistAudio.audioId,
        name: playlistAudio.audio.name,
        image: playlistAudio.audio.image,
        user: {
          id: playlistAudio.audio.user.id,
          stageName: playlistAudio.audio.user.profile?.stageName ?? null,
        },
      })) ?? [];
    return playlistDetailDto;
  }
}
