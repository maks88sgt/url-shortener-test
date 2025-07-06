import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import type { Click } from './Click.js';

@Entity()
export class ShortUrl {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  originalUrl!: string;

  @Column({ unique: true, length: 20 })
  alias!: string;

  @Column({ nullable: true })
  expiresAt!: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @Column({ default: 0 })
  clickCount!: number;

  @OneToMany('Click', (click: Click) => click.shortUrl)
  clicks!: Click[];
}
