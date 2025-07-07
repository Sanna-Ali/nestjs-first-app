import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  //GET: ~/api/users
  @Get('/api/users')
  public getAllusers() {
    return this.usersService.getAll();
  }
}
