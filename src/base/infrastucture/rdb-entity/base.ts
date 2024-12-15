import { Column, PrimaryColumn } from 'typeorm';

export class RDBBase {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column()
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt: Date;
}
