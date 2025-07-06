import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  Column
} from 'typeorm';
import type { ShortUrl } from './ShortUrl.js';

@Entity()
export class Click {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  ipAddress!: string;

  @CreateDateColumn()
  clickedAt!: Date;

  @ManyToOne('ShortUrl', (shortUrl: ShortUrl) => shortUrl.clicks)
  shortUrl!: ShortUrl;
}
