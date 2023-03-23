/* eslint-disable prettier/prettier */
import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { tap } from 'rxjs/operators';
  
  @Injectable()
  export class PaginationInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const request = context.switchToHttp().getRequest();
      const limit = request.headers['pagination-limit'];
      const offset = request.headers['pagination-offset'];
  
      if (limit && offset) {
        request.pagination = {
          limit: parseInt(limit, 10),
          offset: parseInt(offset, 10),
        };
      }
  
      return next.handle().pipe(
        tap(() => {
            const response = context.switchToHttp().getResponse();
            response.header('pagination-limit', limit);
            response.header('pagination-offset', offset);
        }),
      );
    }
  }
  