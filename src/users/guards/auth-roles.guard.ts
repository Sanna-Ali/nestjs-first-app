import {
  CanActivate,
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JWTPayloadType } from 'src/utils/types';
import { Reflector } from '@nestjs/core';
import { CURRENT_USER_key } from 'src/utils/constants';
import { UserType } from 'src/utils/enums';
import { UsersService } from '../users.service';

@Injectable()
export class AuthRolesGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly reflector: Reflector,
    private readonly usersService: UsersService,
  ) {}
  async canActivate(context: ExecutionContext) {
    this.reflector.getAll;
    const request: Request = context.switchToHttp().getRequest();
    const roles: UserType[] = this.reflector.getAllAndOverride('roles', [
      context.getHandler(), // can read metadeta
      context.getClass(),
    ]);
    if (!roles || roles.length === 0) {
      return false;
    }
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    if (token && type === 'Bearer') {
      try {
        const payload: JWTPayloadType = await this.jwtService.verifyAsync(
          token,
          {
            secret: this.configService.get<string>('JWT_SECRET'),
          },
        );
        const user = await this.usersService.getCurrentUser(payload.id);
        if (!user) {
          return false;
        }
        if (roles.includes(user.userType)) {
          request[CURRENT_USER_key] = payload;
          return true;
        }
        // request[CURRENT_USER_key] = payload;
      } catch (error) {
        throw new UnauthorizedException('access denied,invalid token');
      }
    } else {
      throw new UnauthorizedException('access denied,no token provided');
    }
    return false;
  }
  //     :boolean|Promise<boolean>|Observable<boolean>
  // throw new Error("Method not implemented");
}
