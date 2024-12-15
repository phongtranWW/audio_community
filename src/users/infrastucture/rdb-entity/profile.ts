import { RDBBase } from '@base/infrastucture/rdb-entity/base';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { RDBUser } from './user';
import { Gender } from '@users/domain/value-object/gender';

@Entity()
export class RDBProfile extends RDBBase {
  @Column()
  isVerified: boolean;

  @Column()
  avatar: string;

  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  stageName: string;

  @Column({ type: 'uuid' })
  userId: string;

  @OneToOne(() => RDBUser, (user) => user.profile, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'userId' })
  user: RDBUser;
}
