import { RDBBase } from '@base/infrastucture/rdb-entity/base';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { RDBUser } from '../../../users/infrastucture/rdb-entity/user';
import { RDBPlaylistAudio } from './playlist-audio';

@Entity()
export class RDBPlaylist extends RDBBase {
  @Column()
  name: string;

  @OneToMany(() => RDBPlaylistAudio, (audio) => audio.playlist, {
    cascade: true,
  })
  audios: RDBPlaylistAudio[];

  @Column({ type: 'uuid' })
  userId: string;

  @ManyToOne(() => RDBUser, (user) => user.playlists, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: RDBUser;
}
