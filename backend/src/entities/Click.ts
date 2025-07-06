import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { ShortUrl } from './ShortUrl';

@Entity()
export class Click {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  ipAddress!: string;

  @CreateDateColumn()
  clickedAt!: Date;

  @ManyToOne(() => ShortUrl, (shortUrl) => shortUrl.clicks, { onDelete: 'CASCADE' })
  shortUrl!: ShortUrl;
}
