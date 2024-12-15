import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeletePlaylistRequest } from './request';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { ErrorMessage } from '@constants/exception';
import { PLAYLIST_REPOSITORY } from '@constants/repository-key';
import { IPlaylistRepository } from 'src/playlists/domain/repository/playlist';

@CommandHandler(DeletePlaylistRequest)
export class DeletePlaylistHandler
  implements ICommandHandler<DeletePlaylistRequest>
{
  constructor(
    @Inject(PLAYLIST_REPOSITORY)
    private repository: IPlaylistRepository,
  ) {}

  async execute(command: DeletePlaylistRequest): Promise<void> {
    const { playlistId, userId } = command;
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

    try {
      await this.repository.deleteById(playlistId);
    } catch (error) {
      throw new HttpException(
        ErrorMessage.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
