import { RDBBase } from '@base/infrastucture/rdb-entity/base';
import { Role } from '@users/domain/value-object/role';
import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { RDBProfile } from './profile';
import { RDBPlaylist } from '../../../playlists/infrastructure/rdb-entity/playlist';

@Entity()
export class RDBUser extends RDBBase {
  @Column({ type: 'enum', enum: Role })
  role: Role;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToOne(() => RDBProfile, (profile) => profile.user, {
    cascade: true,
  })
  profile: RDBProfile;

  @OneToMany(() => RDBPlaylist, (playlist) => playlist.user)
  playlists: RDBPlaylist[];
}
