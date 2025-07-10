import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Review } from '../reviews/review.entity';

import { User } from '../users/user.entity';
@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar' })
  title: string;
  @Column()
  description: string;
  @Column({ type: 'float' })
  price: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
  @OneToMany(() => Review, (review) => review.product, { eager: true })
  reviews: Review[];
  @ManyToOne(() => User, (user) => user.products, { eager: true })
  user: User;
}

// @OneToMany(() => Review, (review) => review.product, { eager: true })
//     reviews: Review[];

//     @ManyToOne(() => User, (user) => user.products, { eager: true })
//     user: User;
