import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { RDBPlaylist } from './playlist';
import { RDBAudio } from '@audio/infrastructure/rdb-entity/audio';

@Entity()
export class RDBPlaylistAudio {
  @PrimaryColumn({ type: 'uuid' })
  playlistId: string;

  @ManyToOne(() => RDBPlaylist, (playlist) => playlist.audios, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'playlistId' })
  playlist: RDBPlaylist;

  @PrimaryColumn({ type: 'uuid' })
  audioId: string;

  @ManyToOne(() => RDBAudio, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'audioId' })
  audio: RDBAudio;
}
