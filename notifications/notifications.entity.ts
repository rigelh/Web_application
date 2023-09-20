import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'notifications' })
export class notifications {
  //  primary key is number
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  source: string;

  @Column()
  message: string;
}