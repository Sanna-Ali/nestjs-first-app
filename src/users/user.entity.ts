import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Product } from '../products/product.entity';
import { Review } from 'src/reviews/review.entity';
import { UserType } from '../utils/enums';
import { Exclude } from 'class-transformer';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: '100', nullable: true })
  username: string;
  @Column({ type: 'varchar', length: '200', unique: true })
  email: string;
  @Column({})
  @Exclude()
  password: string;
  @Column({ type: 'enum', enum: UserType, default: UserType.NORMAL_USER })
  userType: UserType;
  @Column({ default: false })
  isAccountVerified: boolean;

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
  @OneToMany(
    () => Product,
    (product) => {
      product.user;
    },
  )
  products: Product[];
  @OneToMany(
    () => Review,
    (review) => {
      review.user;
    },
  )
  reviews: Review[];
}
