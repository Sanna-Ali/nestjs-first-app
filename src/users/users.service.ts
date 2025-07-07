import { Injectable } from '@nestjs/common';
@Injectable()
export class UsersService {
  public getAll() {
    return [{ id: 1, email: 'sanayali@gmail.com' }];
  }
}
