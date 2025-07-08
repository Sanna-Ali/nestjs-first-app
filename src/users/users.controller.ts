import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { AuthGuard } from './guards/auth.guard';
import { request } from 'http';
import { CURRENT_USER_key } from 'src/utils/constants';
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // POST: ~/api/users/auth/register
  @Post('auth/register')
  public register(@Body() body: RegisterDto) {
    return this.usersService.register(body);
  }

  // POST: ~/api/users/auth/login
  @Post('auth/login')
  @HttpCode(HttpStatus.OK)
  public login(@Body() body: LoginDto) {
    return this.usersService.login(body);
  }

  //GET:~/api/user/current-user
  @Get('current-user')
  @UseGuards(AuthGuard)
  public getCurrentUser(@Req() request: any) {
    const payload = request[CURRENT_USER_key];
    return this.usersService.getCurrentUser(payload.id);
    //return 'ok';
  }
}
