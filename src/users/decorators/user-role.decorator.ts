import { SetMetadata } from '@nestjs/common/decorators';
import { UserType } from '../../utils/enums';

//Roles Method decorator
export const Roles = (...roles: UserType[]) => SetMetadata('roles', roles);
