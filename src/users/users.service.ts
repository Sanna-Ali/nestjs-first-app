import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { JWTPayloadType, AccessTokenType } from 'src/utils/types';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepositor: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
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
   *  Get Current User (logged in user)
   * @param id
   * @returns
   */
  public async getCurrentUser(id: number) {
    //id: number //bearerToken: string
    // const [type, token] = bearerToken.split(' ');
    // const payload = await this.jwtService.verifyAsync(token, {
    //   secret: this.config.get<string>('JWT_SECRET'),
    // });
    const user = await this.userRepositor.findOne({
      //: payload.id
      where: { id },
    });
    if (!user) throw new NotFoundException('user not found');
    return user;
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
