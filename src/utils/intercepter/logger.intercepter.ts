import {
  Injectable,
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap, map } from 'rxjs';
@Injectable()
export class LoggerIntercepter implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    console.log('befor');
    return next.handle().pipe(
      map((data) => {
        const { password, ...otherData } = data;
        return { ...otherData };
      }),
    ); //tap(() => console.log('After'))
  }
}

// export class LoggerIntercepter implements NestInterceptor {
//     intercepter(
//       context: ExecutionContext,
//       next: CallHandler<any>,
//     ): Observable<any> | Promise<Observable<any>> {
//       console.log('befor');
//       return next.handle().pipe(tap(() => console.log('After')));
//     }
//   }
