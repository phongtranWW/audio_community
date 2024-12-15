import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { RDBAudio } from './audio';
import { RDBUser } from '@users/infrastucture/rdb-entity/user';

@Entity()
export class RDBLike {
  @PrimaryColumn({ type: 'uuid' })
  audioId: string;

  @ManyToOne(() => RDBAudio, (audio) => audio.likes, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'audioId' })
  audio: RDBAudio;

  @PrimaryColumn({ type: 'uuid' })
  userId: string;

  @ManyToOne(() => RDBUser)
  @JoinColumn({ name: 'userId' })
  user: RDBUser;
}
