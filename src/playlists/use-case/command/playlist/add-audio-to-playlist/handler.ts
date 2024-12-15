import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AddAudioToPlaylistRequest } from './request';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { ErrorMessage } from '@constants/exception';
import { PLAYLIST_REPOSITORY } from '@constants/repository-key';
import { IPlaylistRepository } from 'src/playlists/domain/repository/playlist';

@CommandHandler(AddAudioToPlaylistRequest)
export class AddAudioToPlaylistHandler
  implements ICommandHandler<AddAudioToPlaylistRequest>
{
  constructor(
    @Inject(PLAYLIST_REPOSITORY)
    private repository: IPlaylistRepository,
  ) {}

  async execute(command: AddAudioToPlaylistRequest): Promise<void> {
    const { audioId, playlistId, userId } = command;

    const playlist = await this.repository.getOneById(playlistId);

    if (!playlist) {
      throw new HttpException(
        ErrorMessage.NOT_FOUND_PLAYLIST,
        HttpStatus.NOT_FOUND,
      );
    }

    if (!playlist.isCreatedBy(userId)) {
      throw new HttpException(
        ErrorMessage.UNAUTHORIZED_TO_DO,
        HttpStatus.UNAUTHORIZED,
      );
    }

    console.log(playlist);

    playlist.addAudio(audioId);
    playlist.updatedAt = new Date();

    try {
      await this.repository.save(playlist);
    } catch (error) {
      throw new HttpException(
        ErrorMessage.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
