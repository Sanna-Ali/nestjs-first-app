import { Injectable, BadRequestException } from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { JWTPayloadType, AccessTokenType } from 'src/utils/types';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepositor: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  /**
   *  Creatte new user
   * @param registerDto
   * @returns
   */
  public async register(registerDto: RegisterDto): Promise<AccessTokenType> {
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

    const accessToken = await this.generateJWT({
      id: newUser.id,
      userType: newUser.userType,
    });
    return { accessToken };
  }

  /**
   *  login
   * @param loginDto
   * @returns
   */
  public async login(loginDto: LoginDto): Promise<AccessTokenType> {
    const { email, password } = loginDto; /////////////////////////////////////////////////
    const user = await this.userRepositor.findOne({ where: { email } });
    if (!user) throw new BadRequestException('invalid email or password');
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch)
      throw new BadRequestException('invalid email or password');
    const accessToken = await this.generateJWT({
      id: user.id,
      userType: user.userType,
    });
    return { accessToken };
  }
  /**
   * Generate Json Web
   * @param payload
   * @returns token
   */
  private generateJWT(payload: JWTPayloadType): Promise<string> {
    return this.jwtService.signAsync(payload);
  }
}
