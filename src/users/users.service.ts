import { Injectable, BadRequestException } from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepositor: Repository<User>,
  ) {}
  /**
   *  Creatte new user
   * @param registerDto
   * @returns
   */
  public async register(registerDto: RegisterDto) {
    const { email, password, username } = registerDto; /////////////////////////////////////////////////
    const userFromDb = await this.userRepositor.findOne({ where: { email } });
    if (userFromDb) throw new BadRequestException('user already exist');
    const salt = await bcrypt.genSalt(10);
    const hashedPasssword = await bcrypt.hash(password, salt);
    let newUser = this.userRepositor.create({
      email,
      username,
      password: hashedPasssword,
    });

    newUser = await this.userRepositor.save(newUser);
    return newUser;
  }
}
