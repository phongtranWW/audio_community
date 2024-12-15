import { Module } from '@nestjs/common';
import { SeedService } from './service';
import { MinioModule } from 'nestjs-minio-client';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RDBUser } from '@users/infrastucture/rdb-entity/user';
import { RDBProfile } from '@users/infrastucture/rdb-entity/profile';
import { RDBCategory } from '@categories/infrastructure/rdb-entity/category';
import { RDBPlaylist } from '@playlists/infrastructure/rdb-entity/playlist';
import { RDBPlaylistAudio } from '@playlists/infrastructure/rdb-entity/playlist-audio';
import { RDBLike } from '@audio/infrastructure/rdb-entity/like';
import { RDBAudio } from '@audio/infrastructure/rdb-entity/audio';
import { RDBComment } from '@audio/infrastructure/rdb-entity/comment';

@Module({
  imports: [
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
  ],
  providers: [SeedService],
})
export class SeedModule {}
