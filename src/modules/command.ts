import { AudioCommandRepository } from '@audio/infrastructure/repository/command-repository';
import { CategoryCommandRepository } from '@categories/infrastructure/repository/command-repository';
import {
  AUDIO_REPOSITORY,
  CATEGORY_REPOSITORY,
  PLAYLIST_REPOSITORY,
  USER_REPOSITORY,
} from '@constants/repository-key';
import { Module, Provider } from '@nestjs/common';
import { PlaylistCommandRepository } from 'src/playlists/infrastructure/repository/command-repository';
import { UserCommandRepository } from '@users/infrastucture/repository/command-repository';

const CommandProviders: Provider[] = [
  {
    provide: AUDIO_REPOSITORY,
    useClass: AudioCommandRepository,
  },
  {
    provide: CATEGORY_REPOSITORY,
    useClass: CategoryCommandRepository,
  },
  {
    provide: PLAYLIST_REPOSITORY,
    useClass: PlaylistCommandRepository,
  },
  {
    provide: USER_REPOSITORY,
    useClass: UserCommandRepository,
  },
];

@Module({
  providers: [...CommandProviders],
  exports: [...CommandProviders],
})
export class CommandModule {}
