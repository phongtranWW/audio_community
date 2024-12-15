import { AudioQueryRepository } from '@audio/infrastructure/repository/query-repository';
import { CategoryQueryRepository } from '@categories/infrastructure/repository/query-repository';
import {
  AUDIO_QUERY_REPOSITORY,
  CATEGORY_QUERY_REPOSITORY,
  PLAYLIST_QUERY_REPOSITORY,
  USER_QUERY_REPOSITORY,
} from '@constants/repository-key';
import { Module, Provider } from '@nestjs/common';
import { PlaylistQueryRepository } from 'src/playlists/infrastructure/repository/query-repository';
import { UserQueryRepository } from '@users/infrastucture/repository/query-repository';

const QueryProviders: Provider[] = [
  {
    provide: AUDIO_QUERY_REPOSITORY,
    useClass: AudioQueryRepository,
  },
  {
    provide: CATEGORY_QUERY_REPOSITORY,
    useClass: CategoryQueryRepository,
  },
  {
    provide: PLAYLIST_QUERY_REPOSITORY,
    useClass: PlaylistQueryRepository,
  },
  {
    provide: USER_QUERY_REPOSITORY,
    useClass: UserQueryRepository,
  },
];

@Module({
  providers: [...QueryProviders],
  exports: [...QueryProviders],
})
export class QueryModule {}
