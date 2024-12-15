import { RDBBase } from '@base/infrastucture/rdb-entity/base';
import { RDBCategory } from '@categories/infrastructure/rdb-entity/category';
import { RDBUser } from '@users/infrastucture/rdb-entity/user';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { RDBLike } from './like';
import { RDBComment } from './comment';

@Entity()
export class RDBAudio extends RDBBase {
  @Column()
  image: string;

  @Column()
  sound: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'integer' })
  listens: number;

  @OneToMany(() => RDBLike, (like) => like.audio, {
    cascade: true,
  })
  likes: RDBLike[];

  @Column({ type: 'uuid' })
  userId: string;

  @ManyToOne(() => RDBUser)
  @JoinColumn({ name: 'userId' })
  user: RDBUser;

  @Column({ type: 'uuid' })
  categoryId: string;

  @ManyToOne(() => RDBCategory)
  @JoinColumn({ name: 'categoryId' })
  category: RDBCategory;

  @OneToMany(() => RDBComment, (comment) => comment.audio, {
    cascade: true,
  })
  comments: RDBComment[];
}
