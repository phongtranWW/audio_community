import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreatePlaylistRequest } from './request';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { ErrorMessage } from '@constants/exception';
import { PLAYLIST_REPOSITORY } from '@constants/repository-key';
import { PlaylistFactory } from 'src/playlists/utils/factory';
import { IPlaylistRepository } from 'src/playlists/domain/repository/playlist';

@CommandHandler(CreatePlaylistRequest)
export class CreatePLaylistHandler
  implements ICommandHandler<CreatePlaylistRequest>
{
  constructor(
    @Inject(PLAYLIST_REPOSITORY)
    private repository: IPlaylistRepository,
  ) {}

  async execute(command: CreatePlaylistRequest): Promise<void> {
    const { data, userId } = command;

    const playlist = PlaylistFactory.create({ userId, ...data });

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
