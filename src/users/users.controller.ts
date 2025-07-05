import { Controller, Get } from '@nestjs/common';
@Controller()
export class UsersController {
  //GET: ~/api/users
  @Get('/api/users')
  public getAllusers() {
    return [{ id: 1, email: 'sanayali@gmail.com' }];
  }
}
