import { Module, Provider } from '@nestjs/common';
import { CommandModule } from './command';
import { QueryModule } from './query';
import { CqrsModule } from '@nestjs/cqrs';
import { AudioController } from '@audio/presentation/controller/audio';
import { PlaylistController } from 'src/playlists/presentation/controller/playlist';
import { CategoryController } from '@categories/presentation/controller/category';
import { UserController } from '@users/presentation/controller/user';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '@users/presentation/strategy/jwt';
import { SignUpHandler } from '@users/use-case/command/user/sign-up/handler';
import { SignInHandler } from '@users/use-case/command/user/sign-in/handler';
import { UpdatePasswordHandler } from '@users/use-case/command/user/update-password/handler';
import { UpdateProfileHandler } from '@users/use-case/command/user/update-profile/handler';
import { MinioModule } from 'nestjs-minio-client';
import { GetUserInformatioHandler } from '@users/use-case/query/user/get-user-infomation/handler';
import { SearchUsersHandler } from '@users/use-case/query/user/search-users/handler';
import { GetAudioDetailHandler } from '@audio/use-case/query/audio/get-audio-detail/handler';
import { GetAudiosHandler } from '@audio/use-case/query/audio/get-audios/handler';
import { GetAudioCommentsHandler } from '@audio/use-case/query/comment/get-audio-comments/handler';
import { CreateAudioHandler } from '@audio/use-case/command/audio/create-audio/handler';
import { DeleteAudioHandler } from '@audio/use-case/command/audio/delete-audio/handler';
import { LikeAudioHandler } from '@audio/use-case/command/audio/like-audio/handler';
import { ListenAudioHandler } from '@audio/use-case/command/audio/listen-audio/handler';
import { UnlikeAudioHandler } from '@audio/use-case/command/audio/unlike-audio/handler';
import { CreateCommentHandler } from '@audio/use-case/command/comment/create-comment/handler';
import { DeleteCommentHandler } from '@audio/use-case/command/comment/delete-comment/handler';
import { UpdateCommentHandler } from '@audio/use-case/command/comment/update-comment/handler';
import { CreateCategoryHandler } from '@categories/use-case/command/category/create-category/handler';
import { GetCategoriesHandler } from '@categories/use-case/query/category/get-categories/handler';
import { AddAudioToPlaylistHandler } from 'src/playlists/use-case/command/playlist/add-audio-to-playlist/handler';
import { CreatePLaylistHandler } from 'src/playlists/use-case/command/playlist/create-playlist/handler';
import { DeleteAudioFromPlaylistHandler } from 'src/playlists/use-case/command/playlist/delete-audio-from-playlist/handler';
import { DeletePlaylistHandler } from 'src/playlists/use-case/command/playlist/delete-playlist/handler';
import { RenamePlaylistHandler } from 'src/playlists/use-case/command/playlist/rename-playlist/handler';
import { RenameCategoryHandler } from '@categories/use-case/command/category/rename-category/handler';
import { GetPlaylistsHandler } from 'src/playlists/use-case/query/playlist/get-playlists/handler';
import { GetPlaylistDetailHandler } from '@playlists/use-case/query/playlist/get-playlist-detail/handler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RDBUser } from '@users/infrastucture/rdb-entity/user';
import { RDBProfile } from '@users/infrastucture/rdb-entity/profile';
import { RDBCategory } from '@categories/infrastructure/rdb-entity/category';
import { RDBPlaylist } from '@playlists/infrastructure/rdb-entity/playlist';
import { RDBPlaylistAudio } from '@playlists/infrastructure/rdb-entity/playlist-audio';
import { RDBLike } from '@audio/infrastructure/rdb-entity/like';
import { RDBAudio } from '@audio/infrastructure/rdb-entity/audio';
import { RDBComment } from '@audio/infrastructure/rdb-entity/comment';

const AudioHandlerProviders: Provider[] = [
  GetAudioDetailHandler,
  GetAudiosHandler,
  GetAudioCommentsHandler,
  CreateAudioHandler,
  DeleteAudioHandler,
  LikeAudioHandler,
  ListenAudioHandler,
  UnlikeAudioHandler,
  CreateCommentHandler,
  DeleteCommentHandler,
  UpdateCommentHandler,
];

const CategoryHandlerProviders: Provider[] = [
  CreateCategoryHandler,
  GetCategoriesHandler,
  RenameCategoryHandler,
];

const UserHandlerProviders: Provider[] = [
  SignUpHandler,
  SignInHandler,
  UpdatePasswordHandler,
  UpdateProfileHandler,
  GetUserInformatioHandler,
  SearchUsersHandler,
];

const PlaylistHandlerProviders: Provider[] = [
  AddAudioToPlaylistHandler,
  CreatePLaylistHandler,
  DeleteAudioFromPlaylistHandler,
  DeletePlaylistHandler,
  RenamePlaylistHandler,
  GetPlaylistsHandler,
  GetPlaylistDetailHandler,
];

@Module({
  imports: [
    CommandModule,
    QueryModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'audio-community-postgres',
      port: 5432,
      username: 'phong',
      password: 'phong123',
      database: 'audio-community',
      entities: [
        RDBUser,
        RDBProfile,
        RDBCategory,
        RDBPlaylist,
        RDBPlaylistAudio,
        RDBLike,
        RDBAudio,
        RDBComment,
      ],
      synchronize: true,
    }),
    MinioModule.register({
      endPoint: 'audio-community-minio',
      port: 9000,
      useSSL: false,
      accessKey: 'phong',
      secretKey: 'phong123',
    }),
    CqrsModule,
    JwtModule.register({
      global: true,
      secret: 'secret',
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [
    JwtStrategy,
    ...UserHandlerProviders,
    ...AudioHandlerProviders,
    ...PlaylistHandlerProviders,
    ...CategoryHandlerProviders,
  ],
  controllers: [
    AudioController,
    PlaylistController,
    CategoryController,
    UserController,
  ],
})
export class MainModule {}
