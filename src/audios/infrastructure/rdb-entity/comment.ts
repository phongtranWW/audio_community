import { RDBBase } from '@base/infrastucture/rdb-entity/base';
import { RDBUser } from '@users/infrastucture/rdb-entity/user';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { RDBAudio } from './audio';

@Entity()
export class RDBComment extends RDBBase {
  @Column()
  content: string;

  @Column()
  edited: boolean;

  @Column({ type: 'uuid' })
  audioId: string;

  @ManyToOne(() => RDBAudio, (audio) => audio.comments, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  audio: RDBAudio;

  @Column({ type: 'uuid' })
  userId: string;

  @ManyToOne(() => RDBUser)
  @JoinColumn({ name: 'userId' })
  user: RDBUser;
}
