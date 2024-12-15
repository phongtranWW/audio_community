import { RDBBase } from '@base/infrastucture/rdb-entity/base';
import { RDBUser } from '@users/infrastucture/rdb-entity/user';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class RDBCategory extends RDBBase {
  @Column()
  name: string;

  @Column({ type: 'uuid' })
  userId: string;

  @ManyToOne(() => RDBUser)
  @JoinColumn({ name: 'userId' })
  user: RDBUser;
}
